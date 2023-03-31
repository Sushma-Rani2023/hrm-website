import React from 'react'

const Taskicon = (prompt) => {
   
  return (
    <div>
        {prompt.type==='Epic' && <i
                        className="fas fa-bolt"
                        aria-hidden="true"
                        style={{ color: "yellow", marginRight: "12px" }}
                      ></i>}
        {prompt.type==='Story' && <i
                        className="fa-sharp fa-solid fa-square"
                        aria-hidden="true"
                        style={{ color: "red", marginRight: "12px" }}
                      ></i>}
        {prompt.type==='Task' && <i
                        className="fa-solid fa-square-check"
                        aria-hidden="true"
                        style={{ color: "blue", marginRight: "12px" }}
                      ></i>}
        {prompt.type==='Phase' && <i
                        className="fa-solid  fa-circle"
                        aria-hidden="true"
                        style={{ color: "violet", marginRight: "12px" }}
                      ></i>}

        {prompt.type==='Milestone' && <i
                        className="fab fa-ethereum"
                        aria-hidden="true"
                        style={{ color: "green", marginRight: "12px" }}
                      ></i>}
    </div>
  )
}

export default Taskicon