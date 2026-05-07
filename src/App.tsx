import { Hero } from './components/Hero/Hero'
import { Header } from './components/Header/Header'
import { INITIAL_DATA } from './data/initialData'

function App() {
  return (
    <div>
      <Header
        brand={INITIAL_DATA.brand}
        announcement={INITIAL_DATA.announcement}
      />
      <Hero brand={INITIAL_DATA.brand} />
    </div>
  )
}

export default App
