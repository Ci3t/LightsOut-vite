import React from 'react'
import './cell.css'

function Cell({isLit,flipCellsAroundMe}) {

    const handleClick = ()=>{
        
        flipCellsAroundMe()
    }


    let classes = "Cell" + (isLit ? " Cell-lit": "")
  return (
    <td className={classes} onClick={handleClick} />
  )
}

export default Cell