import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ExternalLink, ArrowUpRight, Phone, Star } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string

const NEIGHBORHOODS = [
  'Downtown',
  'East LV',
  'Southeast',
  'West LV',
  'Northwest',
  'Spring Valley',
  'Henderson',
]

// Real lat/lng for the 9 LV offices — derived from intersection addresses
const PINS = [
  {
    id: 1,
    slug: 'russell-eastern',
    label: 'Russell & Eastern',
    neighborhood: 'Southeast LV',
    address: '5642 S Eastern Ave',
    phone: '(702) 984-3678',
    rating: 4.8,
    lng: -115.11847673558218,
    lat: 36.08721870953749,
    kids: false,
  },
  {
    id: 2,
    slug: 'boca-kids-dentistry',
    label: 'Boca Kids Dentistry',
    neighborhood: 'Southeast LV',
    address: '5642 S Eastern Ave, Ste F',
    phone: '(702) 389-1543',
    rating: 4.9,
    lng: -115.11795419749872,
    lat: 36.0872333967273,
    kids: true,
  },
  {
    id: 3,
    slug: 'bonanza-eastern',
    label: 'Bonanza & Eastern',
    neighborhood: 'Downtown LV',
    address: '556 N Eastern Ave',
    phone: '(702) 960-4484',
    rating: 4.6,
    lng: -115.114842653358,
    lat: 36.172317645466514,
    kids: false,
  },
  {
    id: 4,
    slug: 'sahara-decatur',
    label: 'Sahara & Decatur',
    neighborhood: 'West LV',
    address: '4750 W Sahara Ave',
    phone: '(702) 381-7059',
    rating: 4.6,
    lng: -115.20633570674653,
    lat: 36.14586957911895,
    kids: false,
  },
  {
    id: 5,
    slug: 'jones-i95',
    label: 'Jones & I-95',
    neighborhood: 'West LV',
    address: '240 N Jones Blvd',
    phone: '(702) 508-0755',
    rating: 4.7,
    lng: -115.22245962208913,
    lat: 36.17587475735733,
    kids: false,
  },
  {
    id: 6,
    slug: 'charleston-lamb',
    label: 'Charleston & Lamb',
    neighborhood: 'East LV',
    address: '4235 E Charleston Blvd',
    phone: '(702) 505-9180',
    rating: 4.8,
    lng: -115.08222899510304,
    lat: 36.15884017723794,
    kids: false,
  },
  {
    id: 7,
    slug: 'flamingo-torrey',
    label: 'Flamingo & Torrey Pines',
    neighborhood: 'Spring Valley',
    address: '6680 W Flamingo Rd',
    phone: '(702) 389-0430',
    rating: 4.7,
    lng: -115.23807223373261,
    lat: 36.11505221506447,
    kids: false,
  },
  {
    id: 8,
    slug: 'cheyenne-commons',
    label: 'Cheyenne Commons',
    neighborhood: 'Northwest LV',
    address: '3163 N Rainbow Blvd',
    phone: '(702) 805-1178',
    rating: 4.7,
    lng: -115.24488767791085,
    lat: 36.21774848792044,
    kids: false,
  },
  {
    id: 9,
    slug: 'beltway-marketplace',
    label: 'Beltway Marketplace',
    neighborhood: 'Southeast LV',
    address: '9210 S Eastern Ave, Ste 130',
    phone: '(702) 508-0848',
    rating: 4.7,
    lng: -115.11778832393867,
    lat: 36.02236022745326,
    kids: false,
  },
]

export function LocationsMapV3() {
  const [activePin, setActivePin] = useState<number | null>(null)
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null)
  const active = PINS.find((p) => p.id === activePin) ?? null

  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const closeTimer = useRef<number | null>(null)
  const markerEls = useRef<
    Map<number, { dot: HTMLDivElement; halo: HTMLDivElement }>
  >(new Map())

  const openPin = (id: number) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setActivePin(id)
  }
  const queueClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setActivePin(null), 280)
  }

  // Initialize Mapbox + markers once
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return
    if (!mapboxgl.accessToken) {
      // No token — bail gracefully (dev mode without .env, etc.)
      return
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      // Start zoomed out + flat — fly into the pitched view on load
      center: [-115.16, 36.13],
      zoom: 7.4,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      cooperativeGestures: false,
      dragRotate: true,
      pitchWithRotate: true,
      antialias: true,
    })
    mapRef.current = map

    map.on('load', () => {
      // Atmospheric fog — gives the pitched view real depth
      map.setFog({
        range: [0.5, 8],
        color: 'rgba(10, 10, 15, 0.8)',
        'horizon-blend': 0.18,
        'high-color': 'rgba(243, 103, 42, 0.08)',
        'space-color': '#06060B',
        'star-intensity': 0.05,
      })

      // 3D building extrusions — visible when users zoom in past 12
      const layers = map.getStyle()?.layers ?? []
      let labelLayerId: string | undefined
      for (const layer of layers) {
        const layout = (layer as { layout?: Record<string, unknown> }).layout
        if (layer.type === 'symbol' && layout && layout['text-field']) {
          labelLayerId = layer.id
          break
        }
      }
      map.addLayer(
        {
          id: 'boca-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 14,
          paint: {
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['get', 'height'],
              0,
              '#1a212d',
              50,
              '#262f3e',
              150,
              '#3a3f50',
            ],
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              14,
              0,
              15,
              ['get', 'height'],
            ],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId,
      )

      PINS.forEach((pin) => {
        // Wrapper holds both the pin and a halo ring so the halo doesn't
        // affect the pin's click hit-box
        const wrap = document.createElement('div')
        wrap.style.cssText = [
          'position: relative',
          'width: 26px',
          'height: 26px',
          'cursor: pointer',
        ].join(';')

        const halo = document.createElement('div')
        halo.style.cssText = [
          'position: absolute',
          'inset: -10px',
          'border-radius: 50%',
          'background: radial-gradient(circle, rgba(243,103,42,0.35) 0%, rgba(243,103,42,0) 70%)',
          'opacity: 0',
          'transition: opacity 0.22s ease',
          'pointer-events: none',
        ].join(';')
        wrap.appendChild(halo)

        const dot = document.createElement('div')
        dot.style.cssText = [
          'position: absolute',
          'inset: 0',
          'border-radius: 50%',
          'background: radial-gradient(circle at 30% 30%, #ff8a4a 0%, #F3672A 55%, #c44e1c 100%)',
          'border: 2px solid #ffffff',
          'box-shadow: 0 0 0 3px rgba(10,10,15,0.55), 0 6px 18px rgba(243,103,42,0.45), inset 0 1px 2px rgba(255,255,255,0.35)',
          'transition: transform 0.22s ease',
        ].join(';')

        const inner = document.createElement('div')
        inner.style.cssText = [
          'position: absolute',
          'top: 50%',
          'left: 50%',
          'transform: translate(-50%, -50%)',
          'width: 6px',
          'height: 6px',
          'border-radius: 50%',
          'background: #ffffff',
          'box-shadow: 0 0 6px rgba(255,255,255,0.6)',
        ].join(';')
        dot.appendChild(inner)
        wrap.appendChild(dot)

        if (pin.kids) {
          const badge = document.createElement('div')
          badge.textContent = 'K'
          badge.style.cssText = [
            'position: absolute',
            'top: -7px',
            'right: -7px',
            'width: 15px',
            'height: 15px',
            'background: #ffffff',
            'border: 1.5px solid #F3672A',
            'border-radius: 50%',
            'color: #F3672A',
            'font-size: 8px',
            'font-weight: 800',
            'display: flex',
            'align-items: center',
            'justify-content: center',
            'font-family: ui-monospace, monospace',
            'box-shadow: 0 4px 10px rgba(0,0,0,0.4)',
          ].join(';')
          wrap.appendChild(badge)
        }

        wrap.addEventListener('mouseenter', () => openPin(pin.id))
        wrap.addEventListener('mouseleave', () => queueClose())
        wrap.addEventListener('click', (e) => {
          e.stopPropagation()
          openPin(pin.id)
          map.flyTo({
            center: [pin.lng, pin.lat],
            zoom: 13.4,
            pitch: 42,
            bearing: -8,
            duration: 1600,
            curve: 1.3,
            essential: true,
          })
        })

        markerEls.current.set(pin.id, { dot, halo })

        new mapboxgl.Marker({ element: wrap, anchor: 'center' })
          .setLngLat([pin.lng, pin.lat])
          .addTo(map)
      })

      // Subtle "Valley" coverage circle drawn on the map
      map.addSource('boca-valley', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [-115.16, 36.13],
          },
        },
      })
      map.addLayer({
        id: 'boca-valley-fill',
        type: 'circle',
        source: 'boca-valley',
        paint: {
          'circle-radius': {
            stops: [
              [8, 60],
              [10, 220],
              [12, 800],
            ],
          },
          'circle-color': '#F3672A',
          'circle-opacity': 0.05,
          'circle-stroke-color': '#F3672A',
          'circle-stroke-width': 1.4,
          'circle-stroke-opacity': 0.35,
        },
      })

      // Cinematic intro — fly from the zoomed-out flat view into a
      // gently pitched Vegas overview. Runs once after style loads.
      setTimeout(() => {
        map.flyTo({
          center: [-115.16, 36.13],
          zoom: 10.6,
          pitch: 38,
          bearing: -8,
          duration: 3400,
          curve: 1.42,
          speed: 0.7,
          essential: true,
        })
      }, 250)
    })

    map.on('click', () => setActivePin(null))

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Keep the popup positioned over the active marker as map pans/zooms
  useEffect(() => {
    const map = mapRef.current
    if (!map || !active) {
      setPopupPos(null)
      return
    }
    const updatePos = () => {
      const p = map.project([active.lng, active.lat])
      setPopupPos({ x: p.x, y: p.y })
    }
    updatePos()
    map.on('move', updatePos)
    map.on('zoom', updatePos)
    return () => {
      map.off('move', updatePos)
      map.off('zoom', updatePos)
    }
  }, [active])

  // Drive marker visuals from activePin state (not local hover) so the dot
  // stays large while the popup is open, even if the cursor briefly leaves
  // the marker DOM on its way to the popup.
  useEffect(() => {
    markerEls.current.forEach(({ dot, halo }, id) => {
      const isActive = id === activePin
      dot.style.transform = isActive ? 'scale(1.18)' : 'scale(1)'
      halo.style.opacity = isActive ? '1' : '0'
    })
  }, [activePin])

  return (
    <section
      id="locations-map"
      style={{
        background: '#0A0A0F',
        padding: '120px 32px 96px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft orange glow behind the card */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 600,
          background:
            'radial-gradient(ellipse, rgba(243,103,42,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section eyebrow strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 22,
            paddingBottom: 14,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#F3672A',
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            [ 12 ] · The Network · Live Map
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#10b981',
                display: 'inline-block',
              }}
            />
            Live · 9 of 9 offices online
          </div>
        </motion.div>

        {/* ── Map canvas + floating overlays ─────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)',
            background: '#1a1a24',
            aspectRatio: '2.4 / 1',
            minHeight: 420,
            maxHeight: 620,
            boxShadow:
              '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(243,103,42,0.05)',
          }}
        >
          {/* Mapbox container fills the card */}
          <div
            ref={mapContainer}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#0A0A0F',
            }}
          />

          {/* Popup overlay — positioned over the active marker, tracks pan/zoom */}
          <AnimatePresence>
            {active && popupPos && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                onMouseEnter={() => openPin(active.id)}
                onMouseLeave={queueClose}
                style={{
                  position: 'absolute',
                  left: popupPos.x,
                  top: popupPos.y,
                  // Box bottom sits ~4px above marker center → hit area
                  // overlaps the marker top so there's no dead zone when
                  // the mouse moves between them.
                  transform: 'translate(-50%, calc(-100% - 4px))',
                  paddingBottom: 18,
                  zIndex: 4,
                  pointerEvents: 'auto',
                  width: 280,
                }}
              >
                <div
                  style={{
                    background: 'rgba(10,10,15,0.96)',
                    border: '1px solid rgba(243,103,42,0.4)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    boxShadow:
                      '0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(243,103,42,0.1)',
                    position: 'relative',
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      bottom: -7,
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: 12,
                      height: 12,
                      background: 'rgba(10,10,15,0.96)',
                      borderRight: '1px solid rgba(243,103,42,0.4)',
                      borderBottom: '1px solid rgba(243,103,42,0.4)',
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        color: '#F3672A',
                        fontFamily:
                          'ui-monospace, "SF Mono", Menlo, monospace',
                      }}
                    >
                      / {String(active.id).padStart(2, '0')} ·{' '}
                      {active.neighborhood}
                    </span>
                    {active.kids && (
                      <span
                        style={{
                          fontSize: 8,
                          fontWeight: 800,
                          background: '#F3672A',
                          color: 'white',
                          padding: '1px 6px',
                          borderRadius: 999,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                        }}
                      >
                        Kids
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: 'white',
                      letterSpacing: '-0.2px',
                      lineHeight: 1.2,
                      marginBottom: 8,
                    }}
                  >
                    {active.label}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      marginBottom: 12,
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <MapPin size={11} style={{ color: '#F3672A' }} />
                      {active.address}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <Phone size={11} style={{ color: '#F3672A' }} />
                      {active.phone}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <Star
                        size={11}
                        fill="#F3672A"
                        style={{ color: '#F3672A' }}
                      />
                      <strong style={{ color: 'white', fontWeight: 700 }}>
                        {active.rating}
                      </strong>{' '}
                      avg rating
                    </div>
                  </div>
                  <a
                    href={`/clinics/${active.slug}/`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: '#F3672A',
                      textDecoration: 'none',
                      fontFamily:
                        'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    Visit clinic
                    <ArrowUpRight size={11} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TOP-LEFT — header glass panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 24,
              left: 24,
              maxWidth: 420,
              background: 'rgba(10,10,15,0.82)',
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(16px) saturate(140%)',
              WebkitBackdropFilter: 'blur(16px) saturate(140%)',
              borderRadius: 16,
              padding: '22px 24px',
              boxShadow: '0 20px 48px rgba(0,0,0,0.4)',
              zIndex: 3,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 10,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Greater Las Vegas coverage
            </div>
            <h3
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.05,
                letterSpacing: '-0.8px',
                margin: '0 0 12px',
                textTransform: 'uppercase',
              }}
            >
              Coverage{' '}
              <span style={{ color: '#F3672A' }}>across</span> the valley.
            </h3>
            <p
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              <strong style={{ color: 'white', fontWeight: 700 }}>
                9 clinics
              </strong>{' '}
              from Downtown to Henderson — same Boca standard at every
              location.
            </p>
          </motion.div>

          {/* TOP-RIGHT — live indicator chip */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'rgba(10,10,15,0.82)',
              border: '1px solid rgba(243,103,42,0.32)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: 999,
              padding: '10px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              zIndex: 3,
            }}
          >
            <MapPin size={13} color="#F3672A" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'white',
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              9 Boca offices
            </span>
          </motion.div>

          {/* BOTTOM-LEFT — neighborhoods data panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              maxWidth: 420,
              background: 'rgba(10,10,15,0.82)',
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(16px) saturate(140%)',
              WebkitBackdropFilter: 'blur(16px) saturate(140%)',
              borderRadius: 16,
              padding: '18px 22px 20px',
              boxShadow: '0 20px 48px rgba(0,0,0,0.4)',
              zIndex: 3,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: 10,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Neighborhoods served · 07
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
              }}
            >
              {NEIGHBORHOODS.map((hood, i) => (
                <motion.span
                  key={hood}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.3 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 999,
                    padding: '5px 11px',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#F3672A',
                      display: 'inline-block',
                    }}
                  />
                  {hood}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* BOTTOM-RIGHT — actions stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 24,
              right: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              alignItems: 'flex-end',
              zIndex: 3,
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActivePin(null)
                mapRef.current?.flyTo({
                  center: [-115.16, 36.13],
                  zoom: 10.6,
                  pitch: 38,
                  bearing: -8,
                  duration: 1600,
                  curve: 1.3,
                  essential: true,
                })
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(10,10,15,0.82)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'white',
                borderRadius: 8,
                padding: '11px 18px',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.1)'
                el.style.borderColor = 'rgba(255,255,255,0.35)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(10,10,15,0.82)'
                el.style.borderColor = 'rgba(255,255,255,0.18)'
              }}
            >
              Reset view
              <ArrowUpRight size={13} />
            </button>
            <a
              href="https://www.google.com/maps/search/Boca+Dental+Las+Vegas/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#F3672A',
                color: 'white',
                borderRadius: 8,
                padding: '11px 18px',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 12px 28px rgba(243,103,42,0.4)',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#d95a22')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#F3672A')
              }
            >
              Open in Maps
              <ExternalLink size={12} />
            </a>
          </motion.div>
        </motion.div>

        {/* ── Stats strip below the map ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          {[
            { value: '9', label: 'Las Vegas clinics' },
            { value: '07', label: 'Neighborhoods covered' },
            { value: '6', label: 'Days a week open' },
            { value: '4.9★', label: 'Avg patient rating' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                    marginBottom: 4,
                  }}
                >
                  / 0{i + 1}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.6)',
                    letterSpacing: 0.3,
                  }}
                >
                  {s.label}
                </div>
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.6px',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LocationsMapV3
