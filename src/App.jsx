import { useState,useEffect } from 'react'
import Header from './components/header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Filtros from './components/Filtros'



function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidPresupuesto, setIsvalidPresupuesto] = useState(false)
  const[modal, setModal] = useState(false);
  const[animarModal, setAnimarModal] = useState(false);
  const[gastos,setGastos ] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): []  );
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro,setFiltro] = useState('')
  const [gastosFiltrados,setGastosFiltrados] = useState([])

  useEffect(() =>{
    if(Object.keys(gastoEditar).length >0){
      setModal(true)
      
      setTimeout(() =>{
          setAnimarModal(true)
      },500)
    }
  },[gastoEditar])

  useEffect(() =>{
      localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(() =>{
    localStorage.setItem('presupuesto',presupuesto ?? 0)
},[presupuesto])

useEffect(() =>{
  if(filtro){
    //filtrar gastos por categoria
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

    setGastosFiltrados(gastosFiltrados)

  }
},[filtro])


  useEffect(() =>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuesto > 0){
      setIsvalidPresupuesto(true)
    }

},[])

  const handleNuevoGasto = () =>{
      setModal(true)
      setGastoEditar({})

      setTimeout(() =>{
          setAnimarModal(true)
      },500)

  }

  const guardarGasto = gasto =>{
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id ==
        gasto.id ? gasto : gastoState)
        setGastos(gastosActualizados)
        setGastoEditar({})

    }else{
      //nuevo
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos,gasto])

    }

    setAnimarModal(false)

        setTimeout(() =>{
          setModal(false)
        },500)
  }

  const eliminarGasto = id => {
      const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
      setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsvalidPresupuesto={setIsvalidPresupuesto}
      ></Header>
      {isValidPresupuesto && (
        <>
        <main>
          <Filtros filtro={filtro}
                  setFiltro={setFiltro}
          ></Filtros>
          <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          ></ListadoGastos>
        </main>
        <div className='nuevo-gasto'>
          <img
            src={IconoNuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
          />

        </div>
        </>
        )}
      {modal && 
      <Modal
         setModal={setModal}
         animarModal={animarModal}
         setAnimarModal={setAnimarModal}
         guardarGasto={guardarGasto}
         gastoEditar={gastoEditar}
         />}
    </div>
  )
}

export default App
