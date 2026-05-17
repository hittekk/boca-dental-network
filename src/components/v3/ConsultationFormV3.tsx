import { FormEvent, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react'
import { useSiteData } from '../../lib/site-data'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { useTrack } from '../../lib/analytics'

type Status = 'idle' | 'submitting' | 'success' | 'error'

interface FormState {
  name: string
  email: string
  phone: string
  location: string
  service: string
  patient_type: 'new' | 'returning'
  message: string
  consent: boolean
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  location: '',
  service: '',
  patient_type: 'new',
  message: '',
  consent: false,
}

const monoLabel: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.55)',
  marginBottom: 10,
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
}

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8,
  padding: '13px 16px',
  fontSize: 14,
  fontFamily: 'inherit',
  color: 'white',
  outline: 'none',
  transition: 'border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease',
}

function focusOn(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#F3672A'
  e.currentTarget.style.background = 'rgba(243,103,42,0.06)'
  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(243,103,42,0.18)'
}
function focusOff(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
  e.currentTarget.style.boxShadow = 'none'
}

export function ConsultationFormV3() {
  const siteData = useSiteData()
  const track = useTrack()
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim()) e.phone = 'Required'
    else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Invalid phone'
    if (!form.consent) e.consent = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('submitting')

    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 900))
      setStatus('success')
      return
    }

    try {
      let preferredLocationId: string | null = null
      if (form.location) {
        const { data: loc } = await supabase
          .from('locations')
          .select('id')
          .eq('slug', form.location)
          .maybeSingle()
        preferredLocationId = loc?.id ?? null
      }

      const { error } = await supabase.from('leads').insert({
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        preferred_location_id: preferredLocationId,
        service_interest: form.service || null,
        message: form.message || null,
        source_page: typeof window !== 'undefined' ? window.location.pathname : null,
        source_form: 'consultation-v3',
        status: 'new',
      })

      if (error) {
        console.error('[ConsultationFormV3] Supabase insert failed:', error)
        setStatus('error')
        return
      }
      track('form_submit', {
        form_id: 'consultation-v3',
        service_interest: form.service || null,
        location: form.location || null,
        patient_type: form.patient_type,
      })
      setStatus('success')
    } catch (err) {
      console.error('[ConsultationFormV3] submission error:', err)
      setStatus('error')
    }
  }

  // Parallax: as the section scrolls through the viewport, the bg image
  // translates slower than the foreground (classic parallax depth cue).
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section
      ref={sectionRef}
      id="request-consultation"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax Vegas Strip background — drifts as the section scrolls */}
      <motion.img
        aria-hidden
        src="/vegas-strip.webp"
        alt=""
        onError={(e) => {
          // Fallback to the office image until a real strip photo is dropped in
          ;(e.currentTarget as HTMLImageElement).src =
            '/boca-modern-office.webp'
        }}
        style={{
          position: 'absolute',
          top: '-12%',
          left: 0,
          width: '100%',
          height: '124%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.22,
          filter: 'saturate(0.8) brightness(0.55)',
          y: bgY,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      />

      {/* Vignette / dark overlay so the form is readable */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.55) 35%, rgba(10,10,15,0.55) 65%, rgba(10,10,15,0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Soft orange glow accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          right: '-12%',
          width: 700,
          height: 700,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.14) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Centered form — no sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.4) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 22,
            padding: '44px 44px',
            backdropFilter: 'blur(20px) saturate(140%)',
            WebkitBackdropFilter: 'blur(20px) saturate(140%)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          }}
        >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 24,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              [ 11 ] · Request a Consultation
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-1.4px',
                color: 'white',
                margin: '0 0 16px',
                textTransform: 'uppercase',
              }}
            >
              Drop us a line.
              <br />
              <span style={{ color: '#F3672A' }}>We reply fast.</span>
            </h2>

            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.6,
                margin: '0 0 36px',
                maxWidth: 460,
              }}
            >
              Real human, &lt;1 business hour, no chatbots. Pick an office or
              let us route you to the closest one.
            </p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: 'rgba(243,103,42,0.08)',
                    border: '1px solid rgba(243,103,42,0.32)',
                    borderRadius: 16,
                    padding: '32px',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2
                    size={42}
                    style={{ color: '#F3672A', margin: '0 auto 16px' }}
                  />
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: 'white',
                      letterSpacing: '-0.3px',
                      marginBottom: 10,
                    }}
                  >
                    Got it, {form.name.split(' ')[0] || 'friend'}.
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.65)',
                      lineHeight: 1.6,
                    }}
                  >
                    We sent a confirmation to{' '}
                    <strong style={{ color: 'white' }}>{form.email}</strong>.
                    A real person from your office reaches out within one
                    business hour.
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    <FieldDark label="/ 01 · Full name" error={errors.name}>
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="Maria Garcia"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={inputBase}
                      />
                    </FieldDark>
                    <FieldDark label="/ 02 · Email" error={errors.email}>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="maria@email.com"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={inputBase}
                      />
                    </FieldDark>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    <FieldDark label="/ 03 · Phone" error={errors.phone}>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="(702) 555-0123"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={inputBase}
                      />
                    </FieldDark>
                    <FieldDark label="/ 04 · Patient type">
                      <select
                        value={form.patient_type}
                        onChange={(e) =>
                          set('patient_type', e.target.value as FormState['patient_type'])
                        }
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={{ ...inputBase, cursor: 'pointer' }}
                      >
                        <option value="new" style={{ background: '#0A0A0F' }}>
                          New patient
                        </option>
                        <option value="returning" style={{ background: '#0A0A0F' }}>
                          Returning
                        </option>
                      </select>
                    </FieldDark>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    <FieldDark label="/ 05 · Office">
                      <select
                        value={form.location}
                        onChange={(e) => set('location', e.target.value)}
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={{ ...inputBase, cursor: 'pointer' }}
                      >
                        <option value="" style={{ background: '#0A0A0F' }}>
                          Closest to me
                        </option>
                        {siteData.locations.map((loc) => (
                          <option
                            key={loc.id}
                            value={loc.slug}
                            style={{ background: '#0A0A0F' }}
                          >
                            {loc.label}
                          </option>
                        ))}
                      </select>
                    </FieldDark>
                    <FieldDark label="/ 06 · Service">
                      <select
                        value={form.service}
                        onChange={(e) => set('service', e.target.value)}
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={{ ...inputBase, cursor: 'pointer' }}
                      >
                        <option value="" style={{ background: '#0A0A0F' }}>
                          Recommend something
                        </option>
                        {siteData.services.map((svc) => (
                          <option
                            key={svc.slug}
                            value={svc.slug}
                            style={{ background: '#0A0A0F' }}
                          >
                            {svc.label}
                          </option>
                        ))}
                      </select>
                    </FieldDark>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <FieldDark label="/ 07 · Notes (optional)">
                      <textarea
                        rows={3}
                        placeholder="Insurance details, urgency, language preference, kids visiting too…"
                        value={form.message}
                        onChange={(e) => set('message', e.target.value)}
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={{ ...inputBase, resize: 'vertical' }}
                      />
                    </FieldDark>
                  </div>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      marginBottom: 26,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      style={{
                        marginTop: 3,
                        width: 16,
                        height: 16,
                        accentColor: '#F3672A',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        color: errors.consent ? '#fca5a5' : 'rgba(255,255,255,0.65)',
                        lineHeight: 1.55,
                      }}
                    >
                      I agree to be contacted about my appointment request.
                      Message and data rates may apply. We never share your
                      info. ·{' '}
                      <a
                        href="/privacy"
                        style={{ color: '#F3672A', textDecoration: 'underline' }}
                      >
                        Privacy
                      </a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      width: '100%',
                      background: status === 'submitting' ? '#d95a22' : '#F3672A',
                      color: 'white',
                      border: 'none',
                      borderRadius: 8,
                      padding: '18px 28px',
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: 0.6,
                      textTransform: 'uppercase',
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s ease',
                      fontFamily: 'inherit',
                      boxShadow: '0 12px 28px rgba(243,103,42,0.28)',
                    }}
                    onMouseEnter={(e) => {
                      if (status !== 'submitting')
                        ((e.currentTarget as HTMLElement).style.background = '#d95a22')
                    }}
                    onMouseLeave={(e) => {
                      if (status !== 'submitting')
                        ((e.currentTarget as HTMLElement).style.background = '#F3672A')
                    }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                          <Loader2
                            size={16}
                            style={{ animation: 'spin-v3 1s linear infinite' }}
                          />
                          Submitting…
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: 'rgba(255,255,255,0.6)',
                            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                          }}
                        >
                          [ awaiting response ]
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Send my request</span>
                        <ArrowUpRight size={18} />
                      </>
                    )}
                  </button>

                  <style>{`@keyframes spin-v3 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
      </div>
    </section>
  )
}

function FieldDark({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label style={monoLabel}>{label}</label>
      {children}
      {error && (
        <div
          style={{
            fontSize: 11,
            color: '#fca5a5',
            marginTop: 6,
            fontWeight: 600,
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          [ {error} ]
        </div>
      )}
    </div>
  )
}

// Console-table style form row — label on the left, input on the right.
// Each row is a hairline-divided line in a data-entry table.
function ConsoleRow({
  idx,
  label,
  error,
  isLast,
  children,
}: {
  idx: string
  label: string
  error?: string
  isLast?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '52px 140px 1fr',
        gap: 16,
        alignItems: 'center',
        padding: '14px 18px',
        borderBottom: isLast
          ? 'none'
          : '1px solid rgba(255,255,255,0.06)',
        transition: 'background 0.2s ease',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.background =
          'rgba(255,255,255,0.015)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = 'transparent'
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.5,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        }}
      >
        / {idx}
      </div>
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: 'white',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          }}
        >
          {label}
        </div>
        {error && (
          <div
            style={{
              fontSize: 10,
              color: '#fca5a5',
              marginTop: 3,
              fontWeight: 600,
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
            }}
          >
            [ {error} ]
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default ConsultationFormV3
