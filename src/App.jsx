import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import Filters from './components/Filters';
import { generarId } from './components/helpers';
import ListadoGastos from './components/ListadoGastos';



function App() {

const [presupuesto, setPresupuesto] = useState(
  Number(localStorage.getItem('presupuesto')) ?? 0
);

const [isValidPresupuesto, setisValidPresupuesto] = useState(false);
const [modal, setModal] = useState(false)

const [animarModal, setanimarModal] = useState(false)

const [gastos, setGastos] = useState(
  localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
)

const [gastoEditar, setgastoEditar] = useState({})

const [filtro, setFiltro] = useState('')
const [gastosFiltrados, setgastosFiltrados] = useState([])

useEffect(() => {
  if( Object.keys(gastoEditar).length > 0){
    setModal(true)
  
    setTimeout(() => {
      setanimarModal(true)
      
   }, 400);
  }
}, [gastoEditar])

useEffect(() => {
  localStorage.setItem('presupuesto', presupuesto ?? 0)

}, [presupuesto])

useEffect(() => {
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
  if(presupuestoLS > 0){
    setisValidPresupuesto(true)
  }
}, [])

useEffect(() => {
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
}, [gastos])

useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setgastosFiltrados(gastosFiltrados)


    }
}, [filtro])

const handleNuevoGasto = () => {
  setModal(true)
  setgastoEditar({})


  setTimeout(() => {
    setanimarModal(true)
    
 }, 400);
}

const eliminarGasto = (id) => {
  const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
  setGastos(gastosActualizados)
}

const guardarGasto = (gasto) => {
  
  if(gasto.id){
    const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
    setGastos(gastosActualizados);
    setgastoEditar({})
  }else{

    gasto.id = generarId();
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])
  }
  setanimarModal(false)
  setTimeout(() => {
     setModal(false)
  }, 500)
}

  return (
    <div className={modal ? 'fijar' : ''}>
  <div>
    <Header
    presupuesto={presupuesto}
    setPresupuesto={setPresupuesto}
    isValidPresupuesto={isValidPresupuesto}
    setisValidPresupuesto={setisValidPresupuesto}
    gastos={gastos}
    setGastos={setGastos}
    />

   {isValidPresupuesto &&
   <>
   <main>
    <Filters
    filtro={filtro}
    setFiltro={setFiltro}
    />
    <ListadoGastos 
    gastos={gastos}
    setgastoEditar={setgastoEditar}
    eliminarGasto={eliminarGasto}
    filtro={filtro}
    gastosFiltrados={gastosFiltrados}/>
   </main>
    <div className='nuevo-gasto'>
      <img src={IconoNuevoGasto}
      alt="icono nuevo gasto"
      onClick={handleNuevoGasto}/>
    </div> 
      </>
    }

    {
      modal && 
      <Modal
      setModal={setModal}
      animarModal={animarModal}
      setanimarModal={setanimarModal}
      guardarGasto={guardarGasto}
      gastoEditar={gastoEditar}
      setgastoEditar={setgastoEditar}
      />
    }
  </div>
  </div>
  )
}

export default App
