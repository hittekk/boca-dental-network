import { FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Shield, CheckCircle2, Loader2, ArrowUpRight, Sparkles } from 'lucide-react'
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

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'white',
  border: '1.5px solid rgba(10,10,15,0.1)',
  borderRadius: 12,
  padding: '14px 18px',
  fontSize: 14,
  fontFamily: 'inherit',
  color: '#0A0A0F',
  outline: 'none',
  transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
}

function focusOn(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#F3672A'
  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(243,103,42,0.16)'
}
function focusOff(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'rgba(10,10,15,0.1)'
  e.currentTarget.style.boxShadow = 'none'
}

export function ConsultationFormV4() {
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
    if (!form.consent) e.consent = 'Please consent'
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
        background: '#FAFAFA',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.16) 0%, transparent 60%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 40,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT — form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'white',
              borderRadius: 28,
              padding: '48px 48px',
              boxShadow:
                '0 24px 64px rgba(243,103,42,0.1), 0 8px 16px rgba(10,10,15,0.04)',
              border: '1px solid rgba(10,10,15,0.04)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background:
                  'linear-gradient(135deg, rgba(243,103,42,0.1) 0%, rgba(59,130,246,0.1) 100%)',
                border: '1px solid rgba(243,103,42,0.2)',
                borderRadius: 999,
                padding: '8px 16px',
                marginBottom: 24,
              }}
            >
              <Sparkles size={12} color="#F3672A" />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                }}
              >
                Request a Consultation
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-1.5px',
                color: '#0A0A0F',
                margin: '0 0 18px',
                textTransform: 'uppercase',
              }}
            >
              Tell us about
              <br />
              your{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                smile.
              </span>
            </h2>

            <p
              style={{
                fontSize: 15,
                color: 'rgba(10,10,15,0.6)',
                lineHeight: 1.65,
                margin: '0 0 36px',
                maxWidth: 460,
              }}
            >
              Real human, &lt;1 business hour reply, no chatbots. Pick an
              office or let us route you to the closest open one.
            </p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(243,103,42,0.08) 0%, rgba(59,130,246,0.08) 100%)',
                    border: '1px solid rgba(243,103,42,0.25)',
                    borderRadius: 20,
                    padding: '36px 32px',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2
                    size={48}
                    style={{ color: '#F3672A', margin: '0 auto 18px' }}
                  />
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: '#0A0A0F',
                      letterSpacing: '-0.4px',
                      marginBottom: 12,
                    }}
                  >
                    Got it, {form.name.split(' ')[0] || 'friend'}.
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: 'rgba(10,10,15,0.65)',
                      lineHeight: 1.6,
                      maxWidth: 420,
                      margin: '0 auto',
                    }}
                  >
                    Confirmation sent to{' '}
                    <strong style={{ color: '#0A0A0F' }}>{form.email}</strong>.
                    Someone from your office reaches out within one business hour.
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
                      marginBottom: 16,
                    }}
                  >
                    <FieldLight label="Full name" error={errors.name}>
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
                    </FieldLight>
                    <FieldLight label="Email" error={errors.email}>
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
                    </FieldLight>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    <FieldLight label="Phone" error={errors.phone}>
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
                    </FieldLight>
                    <FieldLight label="Patient type">
                      <select
                        value={form.patient_type}
                        onChange={(e) =>
                          set('patient_type', e.target.value as FormState['patient_type'])
                        }
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={{ ...inputBase, cursor: 'pointer' }}
                      >
                        <option value="new">New patient</option>
                        <option value="returning">Returning</option>
                      </select>
                    </FieldLight>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    <FieldLight label="Preferred office">
                      <select
                        value={form.location}
                        onChange={(e) => set('location', e.target.value)}
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={{ ...inputBase, cursor: 'pointer' }}
                      >
                        <option value="">Closest to me</option>
                        {INITIAL_DATA.locations.map((loc) => (
                          <option key={loc.id} value={loc.slug}>
                            {loc.label}
                          </option>
                        ))}
                      </select>
                    </FieldLight>
                    <FieldLight label="Service interest">
                      <select
                        value={form.service}
                        onChange={(e) => set('service', e.target.value)}
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={{ ...inputBase, cursor: 'pointer' }}
                      >
                        <option value="">Recommend something</option>
                        {INITIAL_DATA.services.map((svc) => (
                          <option key={svc.slug} value={svc.slug}>
                            {svc.label}
                          </option>
                        ))}
                      </select>
                    </FieldLight>
                  </div>

                  <div style={{ marginBottom: 22 }}>
                    <FieldLight label="Notes (optional)">
                      <textarea
                        rows={3}
                        placeholder="Insurance details, urgency, language preference, kids visiting too…"
                        value={form.message}
                        onChange={(e) => set('message', e.target.value)}
                        onFocus={focusOn}
                        onBlur={focusOff}
                        style={{
                          ...inputBase,
                          resize: 'vertical',
                          fontFamily: 'inherit',
                        }}
                      />
                    </FieldLight>
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
                        fontSize: 13,
                        color: errors.consent ? '#dc2626' : 'rgba(10,10,15,0.65)',
                        lineHeight: 1.55,
                      }}
                    >
                      I agree to be contacted by phone, email, or text. Standard
                      message and data rates may apply. ·{' '}
                      <a href="/privacy" style={{ color: '#F3672A' }}>
                        Privacy
                      </a>
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={status !== 'submitting' ? { scale: 1.02, y: -2 } : {}}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      width: '100%',
                      background:
                        status === 'submitting'
                          ? '#d95a22'
                          : 'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 14,
                      padding: '18px 28px',
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                      cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                      boxShadow: '0 16px 36px rgba(243,103,42,0.36)',
                    }}
                  >
                    {status === 'submitting' ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <Loader2
                          size={16}
                          style={{ animation: 'spin-v4 1s linear infinite' }}
                        />
                        Submitting…
                      </span>
                    ) : (
                      <>
                        <span>Send my request</span>
                        <ArrowUpRight size={18} />
                      </>
                    )}
                  </motion.button>

                  <style>{`@keyframes spin-v4 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
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
              position: 'sticky',
              top: 110,
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #3B82F6 130%)',
                color: 'white',
                borderRadius: 22,
                padding: '32px 32px',
                boxShadow: '0 16px 36px rgba(0,29,61,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -40,
                  right: -20,
                  fontSize: 200,
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.06)',
                  lineHeight: 0.85,
                  letterSpacing: '-10px',
                  pointerEvents: 'none',
                }}
              >
                ?
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: 8,
                  position: 'relative',
                }}
              >
                Or call directly
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
                  letterSpacing: '-0.6px',
                  textDecoration: 'none',
                  position: 'relative',
                }}
              >
                <Phone size={22} />
                (702) 456-0005
              </a>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.55)',
                  marginTop: 12,
                  lineHeight: 1.5,
                  position: 'relative',
                }}
              >
                24/7 line — routes to your nearest open office during business
                hours.
              </div>
            </div>

            <div
              style={{
                background: 'white',
                border: '1px solid rgba(10,10,15,0.06)',
                borderRadius: 22,
                padding: '24px 26px',
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Shield size={18} color="#3B82F6" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#0A0A0F',
                    marginBottom: 4,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  HIPAA-grade
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(10,10,15,0.6)',
                    lineHeight: 1.55,
                  }}
                >
                  Form data encrypted in transit and at rest. We never share
                  patient info with anyone.
                </div>
              </div>
            </div>

            <div
              style={{
                background:
                  'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                color: 'white',
                borderRadius: 22,
                padding: '24px 26px',
                boxShadow: '0 12px 28px rgba(243,103,42,0.32)',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: 8,
                }}
              >
                Se Habla Español
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'white',
                  lineHeight: 1.55,
                }}
              >
                Hablamos español en todas nuestras 9 oficinas. Pídelo al llamar
                — un miembro bilingüe del equipo te responderá.
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

function FieldLight({
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
      <label
        style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          color: '#0A0A0F',
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <div
          style={{
            fontSize: 11,
            color: '#dc2626',
            marginTop: 6,
            fontWeight: 700,
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}

export default ConsultationFormV4
