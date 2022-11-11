import {useState, useEffect} from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos,presupuesto,setGastos,setPresupuesto,setIsvalidPresupuesto}) => {

    const [porcentaje,setPorcentaje] = useState(0);
    const [disponible,setDisponible] = useState(0);
    const [gastado,setGastado] = useState(0);

    useEffect(() => {
        const totalGastado =  gastos.reduce((total, gasto) => gasto.cantidad + total, 0)    
        const totalDisponible = presupuesto - totalGastado

        //calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto ) *100).toFixed(2);
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        //agregando tiempo 
        setTimeout(() => {setPorcentaje(nuevoPorcentaje)
        },[1000])
    }, [gastos])
    


    const formatearCantidad = (cantidad) =>{
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })

    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsvalidPresupuesto(false)
        }

    }


    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div >
                <div>
                    <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3b82f5'
                    })}
                        value={porcentaje}
                        text={`${porcentaje}% Gastado`}
                    ></CircularProgressbar>
                </div>
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app'
                    type="button"
                    onClick={handleResetApp}
                    >
                    Resetear App
                </button>
                <p><span>Presupuesto: {formatearCantidad(presupuesto)}  </span></p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}><span>Disponible: {formatearCantidad(disponible)}  </span></p>
                <p><span>Gastado: {formatearCantidad(gastado)}  </span></p>
            </div>

        </div>
    )
}

export default ControlPresupuesto