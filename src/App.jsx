import { useState } from 'react'
import Header from './components/header'


function App() {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsvalidPresupuesto] = useState(false)

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsvalidPresupuesto={setIsvalidPresupuesto}
      ></Header>
    </div>
  )
}

export default App
