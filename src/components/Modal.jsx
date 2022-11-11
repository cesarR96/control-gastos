import { useState,useEffect } from 'react'
import React from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar}) => {
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('')

  useEffect(() =>{
    if(Object.keys(gastoEditar).length >0){
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  },[])

    
    const ocultarModal = () =>{
        setAnimarModal(false)

        setTimeout(() =>{
          setModal(false)
        },500)

    }

    const handleSumit = e =>{
      e.preventDefault();
     
      //valida que no este vacio
      // (nombre === '') nombre no este vacio
      if([nombre,cantidad,categoria].includes('')){
        setMensaje('todos los campos son obligatorios')

        setTimeout(() =>{
          setMensaje('')
        },3000)

        return
      }

      guardarGasto({nombre,cantidad,categoria,id,fecha})
    }

  
  return (
    <div className='modal'>
       <div className='cerrar-modal'>
            <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal}></img>
       </div>
       <form 
       onSubmit={handleSumit}
       className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
          <legend>{gastoEditar.nombre ? "Editar Gasto" : " Nuevo gasto" }</legend>
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <div className='campo'>
            <label  htmlFor='nombre'>Nombre Gasto</label>
            <input
              id='nombre'
              type="text"
              placeholder='Añade el nombre del Gasto'
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            ></input>
          </div>
          <div className='campo'>
            <label  htmlFor='cantidad'>Cantidad</label>
            <input
              id='cantidad'
              type="number"
              placeholder='Añade la cantitdad del gasto: ej. 300'
              value={cantidad}
              onChange={e => setCantidad(Number(e.target.value))}
            ></input>
          </div>
          <div className='campo'>
            <label  htmlFor='categoria'>Categoria</label>
            <select
            id="categoria"
            value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option value="">-- Seleccione  --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comidas</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos</option>
              <option value="ocio">Ocio</option>
              <option value="Salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>
           
          </div>
          <input type="submit" value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}></input>
       </form>
    </div>
  )
}

export default Modal