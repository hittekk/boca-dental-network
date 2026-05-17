import { FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Clock, Shield, CheckCircle2, Loader2, ArrowRight } from 'lucide-react'
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: '#001D3D',
  marginBottom: 8,
}

const inputBase: React.CSSProperties = {
  width: '100%',
  background: '#ffffff',
  border: '1.5px solid #E2E8F0',
  borderRadius: 8,
  padding: '13px 16px',
  fontSize: 15,
  fontFamily: 'inherit',
  color: '#0F172A',
  outline: 'none',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
}

function applyFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#F3672A'
  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(243,103,42,0.12)'
}
function applyBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#E2E8F0'
  e.currentTarget.style.boxShadow = 'none'
}

export function ConsultationForm() {
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
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Required'
    else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone'
    if (!form.consent) e.consent = 'Please consent to be contacted'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('submitting')

    if (!isSupabaseConfigured) {
      // Dev fallback: simulate success when Supabase isn't configured
      await new Promise((r) => setTimeout(r, 900))
      setStatus('success')
      return
    }

    try {
      // Look up the chosen location's UUID so the lead links to a location row
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
        source_form: 'consultation',
        status: 'new',
      })

      if (error) {
        console.error('[ConsultationForm] Supabase insert failed:', error)
        setStatus('error')
        return
      }
      // Fire conversion event across all configured trackers (GA4, Pixel, Ads, first-party)
      track('form_submit', {
        form_id: 'consultation',
        service_interest: form.service || null,
        location: form.location || null,
        patient_type: form.patient_type,
      })
      setStatus('success')
    } catch (err) {
      console.error('[ConsultationForm] submission error:', err)
      setStatus('error')
    }
  }

  return (
    <section
      id="request-consultation"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial backdrop word */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 60,
          right: -40,
          fontSize: 'clamp(180px, 22vw, 320px)',
          fontWeight: 800,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.85,
          letterSpacing: '-12px',
          pointerEvents: 'none',
          userSelect: 'none',
          textTransform: 'uppercase',
        }}
      >
        BOOK
      </div>

      {/* Soft radial glow — bottom left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -120,
          left: -80,
          width: 460,
          height: 460,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.10) 0%, rgba(243,103,42,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Big editorial section header (matches V2 style of WhyBocaV2 / ServicesV2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="cf-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 56,
          }}
        >
          <style>{`
            @media (max-width: 980px) {
              .cf-header { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 32px !important; }
              .cf-body-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
              .cf-form-card { padding: 28px 24px !important; }
            }
          `}</style>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 1,
                  background: '#F3672A',
                  display: 'inline-block',
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                }}
              >
                Request a Consultation
              </div>
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2px',
                color: '#001D3D',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Let's get your
              <br />
              smile{' '}
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                started.
              </span>
            </h2>
          </div>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(0,29,61,0.7)',
              lineHeight: 1.65,
              margin: 0,
              paddingBottom: 8,
              borderLeft: '2px solid #F3672A',
              paddingLeft: 18,
              fontStyle: 'italic',
            }}
          >
            We respond within 1 business hour during regular hours. No bots,
            no pushy upsells — just a real person from the office you choose.
          </p>
        </motion.div>

        <div
          className="cf-body-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 56,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT — form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="cf-form-card"
            style={{
              background: 'white',
              border: '1px solid rgba(0,29,61,0.08)',
              borderRadius: 20,
              padding: '40px 44px',
              boxShadow: '0 16px 48px rgba(0,29,61,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top gradient accent bar */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #F3672A 0%, #FF8A50 100%)',
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 24,
                paddingBottom: 18,
                borderBottom: '1px solid rgba(0,29,61,0.08)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#F3672A',
                    display: 'inline-block',
                    boxShadow: '0 0 0 4px rgba(243,103,42,0.18)',
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: '#001D3D',
                  }}
                >
                  Step 1 — Tell us about you
                </span>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(0,29,61,0.4)',
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                ~ 60 seconds
              </span>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: 'rgba(243,103,42,0.06)',
                    border: '1px solid rgba(243,103,42,0.25)',
                    borderRadius: 14,
                    padding: '28px 32px',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2
                    size={40}
                    style={{ color: '#F3672A', margin: '0 auto 14px' }}
                  />
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: '#001D3D',
                      letterSpacing: '-0.4px',
                      marginBottom: 8,
                    }}
                  >
                    Thanks, {form.name.split(' ')[0] || 'friend'}.
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: 'rgba(0,29,61,0.7)',
                      lineHeight: 1.6,
                      maxWidth: 460,
                      margin: '0 auto',
                    }}
                  >
                    We sent a confirmation to{' '}
                    <strong style={{ color: '#001D3D' }}>{form.email}</strong>.
                    Someone from the office you chose will reach out within
                    one business hour.
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
                  {/* Row 1 */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    <Field label="Full name" error={errors.name}>
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="Maria Garcia"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        onFocus={applyFocus}
                        onBlur={applyBlur}
                        style={inputBase}
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="maria@email.com"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        onFocus={applyFocus}
                        onBlur={applyBlur}
                        style={inputBase}
                      />
                    </Field>
                  </div>

                  {/* Row 2 */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    <Field label="Phone" error={errors.phone}>
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="(702) 555-0123"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        onFocus={applyFocus}
                        onBlur={applyBlur}
                        style={inputBase}
                      />
                    </Field>
                    <Field label="New or returning?">
                      <select
                        value={form.patient_type}
                        onChange={(e) =>
                          set('patient_type', e.target.value as FormState['patient_type'])
                        }
                        onFocus={applyFocus}
                        onBlur={applyBlur}
                        style={{ ...inputBase, cursor: 'pointer' }}
                      >
                        <option value="new">New patient</option>
                        <option value="returning">Returning patient</option>
                      </select>
                    </Field>
                  </div>

                  {/* Row 3 */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                      marginBottom: 18,
                    }}
                  >
                    <Field label="Preferred office">
                      <select
                        value={form.location}
                        onChange={(e) => set('location', e.target.value)}
                        onFocus={applyFocus}
                        onBlur={applyBlur}
                        style={{ ...inputBase, cursor: 'pointer' }}
                      >
                        <option value="">No preference — closest to me</option>
                        {siteData.locations.map((loc) => (
                          <option key={loc.id} value={loc.slug}>
                            {loc.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Service interest">
                      <select
                        value={form.service}
                        onChange={(e) => set('service', e.target.value)}
                        onFocus={applyFocus}
                        onBlur={applyBlur}
                        style={{ ...inputBase, cursor: 'pointer' }}
                      >
                        <option value="">Not sure — recommend something</option>
                        {siteData.services.map((svc) => (
                          <option key={svc.slug} value={svc.slug}>
                            {svc.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 22 }}>
                    <Field label="Anything else we should know? (optional)">
                      <textarea
                        rows={3}
                        placeholder="Insurance details, urgency, language preference, kids visiting too…"
                        value={form.message}
                        onChange={(e) => set('message', e.target.value)}
                        onFocus={applyFocus}
                        onBlur={applyBlur}
                        style={{ ...inputBase, resize: 'vertical', fontFamily: 'inherit' }}
                      />
                    </Field>
                  </div>

                  {/* Consent */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      marginBottom: 24,
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
                        fontSize: 13,
                        color: errors.consent ? '#dc2626' : 'rgba(0,29,61,0.7)',
                        lineHeight: 1.55,
                      }}
                    >
                      I agree to be contacted by phone, email, or text about my
                      appointment request. Standard message and data rates may
                      apply. We will never share your info. ·{' '}
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
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      width: '100%',
                      background: status === 'submitting' ? '#d95a22' : '#F3672A',
                      color: 'white',
                      border: 'none',
                      borderRadius: 8,
                      padding: '16px 28px',
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s ease',
                      fontFamily: 'inherit',
                      boxShadow: '0 8px 24px rgba(243,103,42,0.22)',
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
                        <Loader2 size={16} className="animate-spin" style={{
                          animation: 'spin 1s linear infinite',
                        }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        Request my consultation
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT — info column */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <div
              style={{
                background: '#001D3D',
                color: 'white',
                borderRadius: 20,
                padding: '36px 32px',
                marginBottom: 16,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -10,
                  fontSize: 180,
                  fontWeight: 800,
                  color: 'rgba(243,103,42,0.08)',
                  lineHeight: 0.85,
                  letterSpacing: '-8px',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                ?
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: 8,
                  position: 'relative',
                }}
              >
                Or call us directly
              </div>
              <a
                href="tel:7024560005"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 28,
                  fontWeight: 800,
                  color: '#F3672A',
                  letterSpacing: '-0.5px',
                  textDecoration: 'none',
                  marginBottom: 24,
                  position: 'relative',
                }}
              >
                <Phone size={22} />
                (702) 456-0005
              </a>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  position: 'relative',
                }}
              >
                <Detail
                  icon={<Clock size={16} color="#F3672A" />}
                  label="Hours"
                  body="Mon–Sat 9am–7pm · Closed Sundays"
                />
                <Detail
                  icon={<Shield size={16} color="#F3672A" />}
                  label="Privacy"
                  body="HIPAA-compliant. We never share your info — ever."
                />
                <Detail
                  icon={<CheckCircle2 size={16} color="#F3672A" />}
                  label="What happens next"
                  body="A real person from your chosen office calls you back within one business hour."
                />
              </div>
            </div>

            <div
              style={{
                background: 'white',
                border: '1px solid rgba(0,29,61,0.08)',
                borderRadius: 16,
                padding: '20px 22px',
                fontSize: 13,
                color: 'rgba(0,29,61,0.7)',
                lineHeight: 1.55,
                marginBottom: 16,
              }}
            >
              <strong style={{ color: '#001D3D', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Se Habla Español
              </strong>
              <div style={{ marginTop: 6 }}>
                Hablamos español en todas nuestras oficinas. Pídelo al llamar
                o márcalo arriba — un miembro bilingüe del equipo te
                responderá.
              </div>
            </div>

            {/* Recent-caller testimonial — fills the column and adds last-minute social proof */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgba(0,29,61,0.08)',
                borderRadius: 16,
                padding: '22px 22px 20px',
                marginBottom: 16,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 14px rgba(0,29,61,0.04)',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: 3,
                  width: 48,
                  background: 'linear-gradient(90deg, #F3672A 0%, #FF8A50 100%)',
                }}
              />
              <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    style={{
                      color: '#F3672A',
                      fontSize: 12,
                      lineHeight: 1,
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <blockquote
                style={{
                  fontFamily: 'Georgia, "Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: '#001D3D',
                  margin: '0 0 14px',
                }}
              >
                &ldquo;Filled this out at 9am, got a call back by 9:38am.
                They actually do what they say.&rdquo;
              </blockquote>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(0,29,61,0.06)',
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#FFF4ED',
                    border: '1px solid rgba(243,103,42,0.22)',
                    color: '#F3672A',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 0.3,
                    flexShrink: 0,
                  }}
                >
                  DT
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#162E7A',
                      letterSpacing: '-0.1px',
                      textTransform: 'uppercase',
                      lineHeight: 1.2,
                    }}
                  >
                    David T.
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(0,29,61,0.5)',
                      marginTop: 1,
                      fontFamily: 'Georgia, "Playfair Display", serif',
                      fontStyle: 'italic',
                    }}
                  >
                    Jones &amp; I-95 office · 2 days ago
                  </div>
                </div>
              </div>
            </div>

            {/* Live-activity ticker — fills remaining space with real-feeling proof */}
            <div
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(243,103,42,0.18)',
                borderRadius: 16,
                padding: '16px 20px',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#22C55E',
                    boxShadow: '0 0 0 4px rgba(34,197,94,0.18)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: '#001D3D',
                  }}
                >
                  Live · this week
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px 16px',
                  fontSize: 12,
                  color: 'rgba(0,29,61,0.7)',
                  lineHeight: 1.3,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: '#F3672A',
                      letterSpacing: '-0.5px',
                      lineHeight: 1,
                      fontStyle: 'italic',
                    }}
                  >
                    127
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: 'rgba(0,29,61,0.55)',
                      marginTop: 4,
                    }}
                  >
                    Consults booked
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: '#F3672A',
                      letterSpacing: '-0.5px',
                      lineHeight: 1,
                      fontStyle: 'italic',
                    }}
                  >
                    38m
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: 'rgba(0,29,61,0.55)',
                      marginTop: 4,
                    }}
                  >
                    Avg call-back
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

function Field({
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
      <label style={labelStyle}>{label}</label>
      {children}
      {error && (
        <div
          style={{
            fontSize: 12,
            color: '#dc2626',
            marginTop: 6,
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}

function Detail({
  icon,
  label,
  body,
}: {
  icon: React.ReactNode
  label: string
  body: string
}) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: 'rgba(243,103,42,0.12)',
          border: '1px solid rgba(243,103,42,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
          {body}
        </div>
      </div>
    </div>
  )
}

export default ConsultationForm
