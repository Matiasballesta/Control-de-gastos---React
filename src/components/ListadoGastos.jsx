import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setgastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {
        filtro ? (
          <>
          <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos aun"}</h2>
         { gastosFiltrados.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setgastoEditar={setgastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
          </>
        ) : (
          <>
          <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos aun"}</h2>
          {
          gastos.map(gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setgastoEditar={setgastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
          </>
        )
      }
    </div>
  );
};

export default ListadoGastos;
