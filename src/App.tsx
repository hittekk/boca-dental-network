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
import { INITIAL_DATA } from './data/initialData'

function App() {
  return (
    <div>
      <Header
        brand={INITIAL_DATA.brand}
        announcement={INITIAL_DATA.announcement}
      />
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
      <Footer />
    </div>
  )
}

export default App
