import { FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Shield, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'

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
    await new Promise((r) => setTimeout(r, 900))
    setStatus('success')
  }

  return (
    <section
      id="request-consultation"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          right: '-12%',
          width: 700,
          height: 700,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.16) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 48,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT — form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 22,
              padding: '44px 44px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
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
                        {INITIAL_DATA.locations.map((loc) => (
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
                        {INITIAL_DATA.services.map((svc) => (
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

          {/* RIGHT — info column */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: 8,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / Or call directly
              </div>
              <a
                href="tel:7024560005"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 28,
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.6px',
                  textDecoration: 'none',
                  marginBottom: 12,
                }}
              >
                <Phone size={22} color="#F3672A" />
                (702) 456-0005
              </a>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.5,
                }}
              >
                24/7 line · Routes to your nearest open office during business
                hours, voicemail otherwise.
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                padding: '24px 26px',
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(243,103,42,0.12)',
                  border: '1px solid rgba(243,103,42,0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Shield size={16} color="#F3672A" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 6,
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  / HIPAA-grade
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.55,
                  }}
                >
                  Form data encrypted in transit and at rest. We never share
                  patient info with anyone outside our network.
                </div>
              </div>
            </div>

            <div
              style={{
                background:
                  'linear-gradient(135deg, rgba(243,103,42,0.18) 0%, rgba(243,103,42,0.04) 100%)',
                border: '1px solid rgba(243,103,42,0.32)',
                borderRadius: 18,
                padding: '24px 26px',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                  marginBottom: 8,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / Se Habla Español
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'white',
                  lineHeight: 1.55,
                }}
              >
                Hablamos español en todas nuestras 9 oficinas. Pídelo al
                llamar — un miembro bilingüe del equipo te responderá.
              </div>
            </div>
          </motion.aside>
        </div>
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

export default ConsultationFormV3
