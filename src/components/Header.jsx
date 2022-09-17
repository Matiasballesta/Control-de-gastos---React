import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'


const Header = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto, 
    isValidPresupuesto, 
    setisValidPresupuesto}) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>

        {isValidPresupuesto ? <ControlPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
        setisValidPresupuesto={setisValidPresupuesto}/> :

        <NuevoPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
        /> }
    </header>
  )
}

export default Header