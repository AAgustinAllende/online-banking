import React from 'react'
import data from "../data/data.json"

const Caracteristicas = () => {
  return (
    <section className="caracteristicas">
        {data.map((item,index) => (
            <div key={index} className="card" style={{width: "18rem"}}>
            <img src={item.img} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h4>{item.title}</h4>
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        ))}
      
      
    </section>
  )
}

export default Caracteristicas