import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, ArrowUpRight, Star } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'

export function LocationsV4() {
  const [selected, setSelected] = useState(INITIAL_DATA.locations[0].id)
  const active = INITIAL_DATA.locations.find((l) => l.id === selected)!

  return (
    <section
      id="locations"
      style={{
        background: '#FFFFFF',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.14) 0%, transparent 60%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 56px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(243,103,42,0.08)',
              border: '1px solid rgba(243,103,42,0.18)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 24,
            }}
          >
            <MapPin size={11} color="#F3672A" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#F3672A',
              }}
            >
              The Network · {INITIAL_DATA.locations.length} Offices
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-2.2px',
              color: '#0A0A0F',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Find a Boca near
            <br />
            <span
              style={{
                background:
                  'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              wherever you are.
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 28,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT — clickable list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {INITIAL_DATA.locations.map((loc, i) => {
              const isActive = selected === loc.id
              return (
                <motion.button
                  key={loc.id}
                  onClick={() => setSelected(loc.id)}
                  onMouseEnter={() => setSelected(loc.id)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: isActive
                      ? 'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)'
                      : 'white',
                    border: isActive
                      ? 'none'
                      : '1px solid rgba(10,10,15,0.08)',
                    borderRadius: 18,
                    padding: '20px 22px',
                    cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: '36px 1fr auto',
                    gap: 14,
                    alignItems: 'center',
                    fontFamily: 'inherit',
                    boxShadow: isActive
                      ? '0 16px 36px rgba(243,103,42,0.32)'
                      : '0 2px 8px rgba(10,10,15,0.03)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: isActive
                        ? 'rgba(255,255,255,0.22)'
                        : 'rgba(243,103,42,0.1)',
                      color: isActive ? 'white' : '#F3672A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: 0.4,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: isActive ? 'white' : '#0A0A0F',
                          textTransform: 'uppercase',
                          letterSpacing: '-0.2px',
                          lineHeight: 1.1,
                        }}
                      >
                        {loc.label}
                      </div>
                      {loc.kids && (
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            background: isActive ? 'rgba(255,255,255,0.25)' : '#3B82F6',
                            color: 'white',
                            borderRadius: 999,
                            padding: '2px 8px',
                          }}
                        >
                          Kids
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,15,0.55)',
                        fontWeight: 600,
                      }}
                    >
                      {loc.neighborhood}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    color={isActive ? 'white' : 'rgba(10,10,15,0.4)'}
                  />
                </motion.button>
              )
            })}
          </div>

          {/* RIGHT — sticky detail card */}
          <div style={{ position: 'sticky', top: 110 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,10,15,0.06)',
                  borderRadius: 26,
                  padding: '40px 36px',
                  boxShadow:
                    '0 24px 64px rgba(10,10,15,0.06), 0 8px 16px rgba(10,10,15,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Map placeholder */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    borderRadius: 18,
                    background:
                      'linear-gradient(135deg, #FFF4ED 0%, #EFF6FF 100%)',
                    overflow: 'hidden',
                    marginBottom: 28,
                    border: '1px solid rgba(10,10,15,0.04)',
                  }}
                >
                  {/* Grid pattern */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage:
                        'linear-gradient(to right, rgba(10,10,15,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,15,0.05) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  {/* Map pin with pulse */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'rgba(243,103,42,0.4)',
                        top: -10,
                      }}
                    />
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background:
                          'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 20px rgba(243,103,42,0.45)',
                        zIndex: 1,
                      }}
                    >
                      <MapPin size={16} color="white" fill="white" />
                    </div>
                    <div
                      style={{
                        background: 'white',
                        borderRadius: 999,
                        padding: '4px 12px',
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#0A0A0F',
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 12px rgba(10,10,15,0.1)',
                        zIndex: 1,
                      }}
                    >
                      {active.label}
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 16,
                    marginBottom: 24,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        color: '#3B82F6',
                        marginBottom: 8,
                      }}
                    >
                      Office #{String(active.id).padStart(2, '0')}
                    </div>
                    <div
                      style={{
                        fontSize: 'clamp(24px, 2.6vw, 32px)',
                        fontWeight: 800,
                        color: '#0A0A0F',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.8px',
                        lineHeight: 1.05,
                      }}
                    >
                      {active.label}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'rgba(243,103,42,0.08)',
                      border: '1px solid rgba(243,103,42,0.18)',
                      borderRadius: 999,
                      padding: '6px 12px',
                      flexShrink: 0,
                    }}
                  >
                    <Star size={11} fill="#F3672A" style={{ color: '#F3672A' }} />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: '#F3672A',
                      }}
                    >
                      {active.rating.toFixed(1)}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: 'rgba(243,103,42,0.7)',
                        fontWeight: 600,
                      }}
                    >
                      · {active.review_count}
                    </span>
                  </div>
                </div>

                {/* Detail rows */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    marginBottom: 28,
                  }}
                >
                  {[
                    {
                      icon: <MapPin size={14} />,
                      label: 'Address',
                      value: `${active.address}, ${active.city} ${active.zip}`,
                    },
                    {
                      icon: <Phone size={14} />,
                      label: 'Phone',
                      value: active.phone,
                    },
                    {
                      icon: <Clock size={14} />,
                      label: 'Hours',
                      value: active.hours,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '36px 90px 1fr',
                        gap: 12,
                        alignItems: 'center',
                        background: '#FAFAFA',
                        borderRadius: 12,
                        padding: '14px 16px',
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: 'rgba(243,103,42,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#F3672A',
                        }}
                      >
                        {row.icon}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          letterSpacing: 1.2,
                          textTransform: 'uppercase',
                          color: 'rgba(10,10,15,0.45)',
                        }}
                      >
                        {row.label}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: '#0A0A0F',
                          lineHeight: 1.5,
                          fontWeight: 600,
                        }}
                      >
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.a
                  href={`/clinics/${active.slug}/`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background:
                      'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                    color: 'white',
                    borderRadius: 14,
                    padding: '16px 22px',
                    fontSize: 14,
                    fontWeight: 800,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: 0.6,
                    boxShadow: '0 12px 28px rgba(243,103,42,0.32)',
                  }}
                >
                  View this office
                  <ArrowUpRight size={16} />
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationsV4
