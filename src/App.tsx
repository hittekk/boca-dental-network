import { Hero } from './components/Hero/Hero'
import { Header } from './components/Header/Header'
import { About } from './components/About/About'
import { Locations } from './components/Locations/Locations'
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
      <Locations />
    </div>
  )
}

export default App
