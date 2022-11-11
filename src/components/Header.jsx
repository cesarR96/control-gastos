import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({ gastos,presupuesto, setPresupuesto, isValidPresupuesto, setIsvalidPresupuesto ,setGastos}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidPresupuesto ? (
        <ControlPresupuesto
            gastos={gastos}
            presupuesto={presupuesto}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            setIsvalidPresupuesto={setIsvalidPresupuesto}
        ></ControlPresupuesto>
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsvalidPresupuesto={setIsvalidPresupuesto}
        ></NuevoPresupuesto>
      )}
    </header>
  )
}

export default Header