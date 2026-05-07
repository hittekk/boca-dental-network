import { Header } from './components/Header/Header'
import { INITIAL_DATA } from './data/initialData'

function App() {
  return (
    <div className="min-h-screen" style={{ background: '#101D4A' }}>
      <Header
        brand={INITIAL_DATA.brand}
        announcement={INITIAL_DATA.announcement}
      />
    </div>
  )
}

export default App
