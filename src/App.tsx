import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Admin module — code-split so it doesn't bloat the public bundle
const AdminApp = lazy(() => import('./admin/AdminApp'))

// Variant A — Modern Clinic
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
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

// Variant B — Warm Editorial
import { HeroV2 } from './components/v2/HeroV2'
import { ServicesV2 } from './components/v2/ServicesV2'
import { WhyBocaV2 } from './components/v2/WhyBocaV2'
import { StepsV2 } from './components/v2/StepsV2'
import { TestimonialsV2 } from './components/v2/TestimonialsV2'
import { AudienceRoutingV2 } from './components/v2/AudienceRoutingV2'
import { BocaKidsV2 } from './components/v2/BocaKidsV2'
import { LocationsV2 } from './components/v2/LocationsV2'
import { MeetTheTeamV2 } from './components/v2/MeetTheTeamV2'
import { FinancingV2 } from './components/v2/FinancingV2'
import { FAQV2 } from './components/v2/FAQV2'
import { FooterV2 } from './components/v2/FooterV2'
import { CTAv2 } from './components/v2/CTAv2'

// Variant C — Super Modern
import { HeaderV3 } from './components/v3/HeaderV3'
import { HeroV3 } from './components/v3/HeroV3'
import { TrustBarV3 } from './components/v3/TrustBarV3'
import { AudienceRoutingV3 } from './components/v3/AudienceRoutingV3'
import { MeetTheTeamV3 } from './components/v3/MeetTheTeamV3'
import { LocationsMapV3 } from './components/v3/LocationsMapV3'
import { ServicesV3 } from './components/v3/ServicesV3'
import { WhyBocaV3 } from './components/v3/WhyBocaV3'
import { StepsV3 } from './components/v3/StepsV3'
import { BocaKidsV3 } from './components/v3/BocaKidsV3'
import { TestimonialsV3 } from './components/v3/TestimonialsV3'
import { FAQV3 } from './components/v3/FAQV3'
import { FinancingV3 } from './components/v3/FinancingV3'
import { LocationsV3 } from './components/v3/LocationsV3'
import { ConsultationFormV3 } from './components/v3/ConsultationFormV3'
import { CTAv3 } from './components/v3/CTAv3'
import { FooterV3 } from './components/v3/FooterV3'

// Shared
import { TrustBar } from './components/shared/TrustBar'
import { AudienceRouting } from './components/shared/AudienceRouting'
import { MeetTheTeam } from './components/shared/MeetTheTeam'
import { LocationsMap } from './components/shared/LocationsMap'
import { MobileStickyCTA } from './components/shared/MobileStickyCTA'
import { SmileTransformations } from './components/shared/SmileTransformations'

import { LocationPage } from './pages/LocationPage'
import { ServicePage } from './pages/ServicePage'
import { ServiceCategoryPage } from './pages/ServiceCategoryPage'
import { DentistPage, DentistsHubPage } from './pages/DentistPage'
import {
  AboutUsPage,
  ClinicsHubPage,
  ServicesHubPage,
  PatientResourcesHubPage,
  NewPatientFormsPage,
  InsurancePage,
  FinancingPage,
  ReviewsPage,
  SpanishLandingPage,
  ContactPage,
  RequestConsultationPage,
  CareersPage,
  PrivacyPage,
  HipaaPage,
} from './pages/CorePages'
import { VariantSwitcher, type Variant } from './components/VariantSwitcher'
import { useSiteData } from './lib/site-data'
import { SERVICE_CATEGORIES } from './data/serviceCatalog'

function readVariantFromUrl(): Variant {
  if (typeof window === 'undefined') return 'a'
  const v = new URLSearchParams(window.location.search).get('variant')
  if (v === 'b') return 'b'
  if (v === 'c') return 'c'
  return 'a'
}

function Homepage() {
  const siteData = useSiteData()
  return (
    <div>
      <Header
        brand={siteData.brand}
        announcement={siteData.announcement}
      />
      <Hero brand={siteData.brand} />
      <TrustBar theme="light" />
      <AudienceRouting theme="light" />
      <Services />
      <WhyBoca />
      <Steps />
      <Testimonials />
      <BocaKids />
      <LocationsMap theme="light" />
      <SmileTransformations theme="light" />
      <MeetTheTeam theme="light" />
      <Financing />
      <FAQ />
      <ConsultationForm />
      <CTA />
      <Footer />
    </div>
  )
}

function App() {
  const routerLocation = useLocation()
  const isAdminRoute = routerLocation.pathname.startsWith('/dental-admin')
  const siteData = useSiteData()

  // Render admin in isolation — no public-site chrome
  if (isAdminRoute) {
    return (
      <Suspense fallback={
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#001D3D' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(243,103,42,0.3)', borderTopColor: '#F3672A', animation: 'spin 1s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      }>
        <Routes>
          <Route path="/dental-admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    )
  }

  const serviceCategoryRoutes = SERVICE_CATEGORIES.flatMap((cat) => [
    <Route key={`${cat.slug}-hub`} path={`/${cat.slug}/`} element={<ServiceCategoryPage categorySlugProp={cat.slug} />} />,
    <Route key={`${cat.slug}-hub-noslash`} path={`/${cat.slug}`} element={<ServiceCategoryPage categorySlugProp={cat.slug} />} />,
    <Route key={`${cat.slug}-svc`} path={`/${cat.slug}/:service/`} element={<ServicePage categorySlugProp={cat.slug} />} />,
    <Route key={`${cat.slug}-svc-noslash`} path={`/${cat.slug}/:service`} element={<ServicePage categorySlugProp={cat.slug} />} />,
  ])

  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Homepage />} />

        {/* Location pages */}
        <Route path="/clinics/" element={<ClinicsHubPage />} />
        <Route path="/clinics" element={<ClinicsHubPage />} />
        <Route path="/clinics/:slug" element={<LocationPage />} />
        <Route path="/clinics/:slug/" element={<LocationPage />} />

        {/* Service hub + category hubs + service detail pages */}
        <Route path="/services/" element={<ServicesHubPage />} />
        <Route path="/services" element={<ServicesHubPage />} />
        {serviceCategoryRoutes}

        {/* Dentist pages */}
        <Route path="/about-us/dentists/" element={<DentistsHubPage />} />
        <Route path="/about-us/dentists" element={<DentistsHubPage />} />
        <Route path="/about-us/dentists/:slug" element={<DentistPage />} />
        <Route path="/about-us/dentists/:slug/" element={<DentistPage />} />

        {/* About */}
        <Route path="/about-us/" element={<AboutUsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />

        {/* Patient Resources */}
        <Route path="/patient-resources/" element={<PatientResourcesHubPage />} />
        <Route path="/patient-resources" element={<PatientResourcesHubPage />} />
        <Route path="/patient-resources/new-patient-forms/" element={<NewPatientFormsPage />} />
        <Route path="/patient-resources/new-patient-forms" element={<NewPatientFormsPage />} />
        <Route path="/patient-resources/insurance/" element={<InsurancePage />} />
        <Route path="/patient-resources/insurance" element={<InsurancePage />} />
        <Route path="/patient-resources/financing/" element={<FinancingPage />} />
        <Route path="/patient-resources/financing" element={<FinancingPage />} />
        <Route path="/patient-resources/reviews/" element={<ReviewsPage />} />
        <Route path="/patient-resources/reviews" element={<ReviewsPage />} />

        {/* Spanish landing */}
        <Route path="/oficina-de-habla-hispana/" element={<SpanishLandingPage />} />
        <Route path="/oficina-de-habla-hispana" element={<SpanishLandingPage />} />

        {/* Contact + conversion */}
        <Route path="/contact-us/" element={<ContactPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/request-consultation/" element={<RequestConsultationPage />} />
        <Route path="/request-consultation" element={<RequestConsultationPage />} />

        {/* Employment + legal */}
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/" element={<CareersPage />} />
        <Route path="/privacy-policy/" element={<PrivacyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/hipaa-compliance/" element={<HipaaPage />} />
        <Route path="/hipaa-compliance" element={<HipaaPage />} />

        {/* Catch-all fallback to homepage */}
        <Route path="*" element={<Homepage />} />
      </Routes>
      <MobileStickyCTA phone={siteData.brand.phone} />
    </>
  )
}

export default App
