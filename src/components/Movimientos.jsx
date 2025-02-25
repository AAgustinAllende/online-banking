import React from 'react'

const Movimientos = ({ movimientos }) => {
    return (
      <section className="movimientos-container">
        <h5>Movimientos</h5>
        <ul className="list-group">
          {movimientos.length === 0 ? (
            <li className="list-group-item">No hay movimientos aún</li>
          ) : (
            movimientos.map((mov, index) => (
              <li key={index} className="list-group-item movimiento">{mov}</li>
            ))
          )}
        </ul>
      </section>
    );
  };
  
  export default Movimientos;
  