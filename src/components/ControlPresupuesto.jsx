import React from 'react'

const ControlPresupuesto = ({presupuesto}) => {

    const formatearCantidad = (cantidad) =>{
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })

    }


    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columna'>
            <div >
                <div>
                    <p>grafica aqui</p>
                </div>
            </div>
            <div className='contenido-presupuesto'>
                <p><span>Presupuesto: {formatearCantidad(presupuesto)}  </span></p>
                <p><span>Disponible: {formatearCantidad(presupuesto)}  </span></p>
                <p><span>Gastado: {formatearCantidad(presupuesto)}  </span></p>
            </div>

        </div>
    )
}

export default ControlPresupuesto