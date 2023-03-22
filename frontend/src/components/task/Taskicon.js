import React from 'react'

const Taskicon = (prompt) => {
   
  return (
    <div>
        {prompt.type==='Epic' && <i
                        className="fa-sharp fa-solid fa-circle"
                        aria-hidden="true"
                        style={{ color: "#00cc6a", marginRight: "12px" }}
                      ></i>}
        {prompt.type==='Story' && <i
                        className="fa-sharp fa-solid fa-square"
                        aria-hidden="true"
                        style={{ color: "red", marginRight: "12px" }}
                      ></i>}
        {prompt.type==='Task' && <i
                        className="fa-solid fa-square-check"
                        aria-hidden="true"
                        style={{ color: "yellow", marginRight: "12px" }}
                      ></i>}
        {prompt.type==='Phase' && <i
                        className="fa-sharp fa-regular fa-money-bill"
                        aria-hidden="true"
                        style={{ color: "violet", marginRight: "12px" }}
                      ></i>}

        {prompt.type==='Milestone' && <i
                        className="fa-sharp fa-regular fa-credit-card"
                        aria-hidden="true"
                        style={{ color: "brown", marginRight: "12px" }}
                      ></i>}
    </div>
  )
}

export default Taskicon