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
import { ConsultationForm } from './components/ConsultationForm/ConsultationForm'
import { Footer } from './components/Footer/Footer'

import { HeroV2 } from './components/v2/HeroV2'
import { AboutV2 } from './components/v2/AboutV2'
import { ServicesV2 } from './components/v2/ServicesV2'
import { WhyBocaV2 } from './components/v2/WhyBocaV2'
import { CTAv2 } from './components/v2/CTAv2'

import { HeroV3 } from './components/v3/HeroV3'
import { AboutV3 } from './components/v3/AboutV3'
import { DoctorFeatureV3 } from './components/v3/DoctorFeatureV3'
import { ServicesV3 } from './components/v3/ServicesV3'
import { WhyBocaV3 } from './components/v3/WhyBocaV3'
import { CTAv3 } from './components/v3/CTAv3'

import { VariantSwitcher, type Variant } from './components/VariantSwitcher'
import { INITIAL_DATA } from './data/initialData'

function readVariantFromUrl(): Variant {
  if (typeof window === 'undefined') return 'a'
  const v = new URLSearchParams(window.location.search).get('variant')
  if (v === 'b') return 'b'
  if (v === 'c') return 'c'
  return 'a'
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
    else params.set('variant', next)
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

      {variant === 'a' && (
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
          <ConsultationForm />
          <CTA />
        </>
      )}

      {variant === 'b' && (
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
          <ConsultationForm />
          <CTAv2 />
        </>
      )}

      {variant === 'c' && (
        <>
          <HeroV3 brand={INITIAL_DATA.brand} />
          <AboutV3 />
          <DoctorFeatureV3 />
          <ServicesV3 />
          <WhyBocaV3 />
          <Steps />
          <BocaKids />
          <Testimonials />
          <FAQ />
          <Financing />
          <Locations />
          <ConsultationForm />
          <CTAv3 />
        </>
      )}

      <Footer />

      <VariantSwitcher current={variant} onChange={switchVariant} />
    </div>
  )
}

export default App
