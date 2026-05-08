import { useEffect, useState } from 'react'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Services } from './components/Services/Services'
import { WhyBoca } from './components/WhyBoca/WhyBoca'
import { Steps } from './components/Steps/Steps'
import { BocaKids } from './components/BocaKids/BocaKids'
import { Testimonials } from './components/Testimonials/Testimonials'
import { FAQ } from './components/FAQ/FAQ'
import { Financing } from './components/Financing/Financing'
import { Locations } from './components/Locations/Locations'
import { CTA } from './components/CTA/CTA'
import { Footer } from './components/Footer/Footer'

import { HeroV2 } from './components/v2/HeroV2'
import { AboutV2 } from './components/v2/AboutV2'
import { ServicesV2 } from './components/v2/ServicesV2'
import { WhyBocaV2 } from './components/v2/WhyBocaV2'
import { CTAv2 } from './components/v2/CTAv2'

import { VariantSwitcher } from './components/VariantSwitcher'
import { INITIAL_DATA } from './data/initialData'

type Variant = 'a' | 'b'

function readVariantFromUrl(): Variant {
  if (typeof window === 'undefined') return 'a'
  const v = new URLSearchParams(window.location.search).get('variant')
  return v === 'b' ? 'b' : 'a'
}

function App() {
  const [variant, setVariant] = useState<Variant>('a')

  useEffect(() => {
    setVariant(readVariantFromUrl())
    const onPop = () => setVariant(readVariantFromUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const switchVariant = (next: Variant) => {
    setVariant(next)
    const params = new URLSearchParams(window.location.search)
    if (next === 'a') params.delete('variant')
    else params.set('variant', 'b')
    const qs = params.toString()
    const url = window.location.pathname + (qs ? '?' + qs : '')
    window.history.replaceState({}, '', url)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  return (
    <div>
      <Header
        brand={INITIAL_DATA.brand}
        announcement={INITIAL_DATA.announcement}
      />

      {variant === 'a' ? (
        <>
          <Hero brand={INITIAL_DATA.brand} />
          <About />
          <Services />
          <WhyBoca />
          <Steps />
          <BocaKids />
          <Testimonials />
          <FAQ />
          <Financing />
          <Locations />
          <CTA />
        </>
      ) : (
        <>
          <HeroV2 brand={INITIAL_DATA.brand} />
          <AboutV2 />
          <ServicesV2 />
          <WhyBocaV2 />
          <Steps />
          <BocaKids />
          <Testimonials />
          <FAQ />
          <Financing />
          <Locations />
          <CTAv2 />
        </>
      )}

      <Footer />

      <VariantSwitcher current={variant} onChange={switchVariant} />
    </div>
  )
}

export default App
