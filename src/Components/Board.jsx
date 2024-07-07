import React, { useState } from 'react'
import Cell from './Cell'
import './Board.css'

const defaultProps = {
    nrows:5,
    ncols: 5,
    chanceLightOn: 0.25
}

function Board() {
    const [boards , setBoards] = useState(createBoard())
    const [hasWon , setHasWon] = useState(false)

    function createBoard (){
        let board = []

        for (let y =0; y< defaultProps.nrows ; y++){
            let row = []

            for (let x = 0; x < defaultProps.ncols; x++){
               row.push(Math.random() < defaultProps.chanceLightOn)
            }

            board.push(row)
        }
        
        return board
    }

    function flipCellsAround (coord){

        console.log('Flip',coord);
       
        let {ncols,nrows} = defaultProps;
        let board = boards
        
        let [y,x] = coord.split('-').map(Number);
        function flipCell (y,x){
        if(x >= 0 && x < ncols && y >=0 && y< nrows){
            board[y][x] = !board[y][x];
        }
    }
        flipCell(y,x)
        flipCell(y,x -1)
        flipCell(y,x +1)
        flipCell(y -1,x )
        flipCell(y +1,x )

      
            setHasWon(board.every((row)=>row.every((cell)=>!cell)))

       console.log(hasWon);
        setBoards([...board])

        // console.log(board);
    }
  
   

    let tableBoard = []

    for (let y =0; y< defaultProps.nrows ; y++){
        let row = []

        for (let x = 0; x < defaultProps.ncols; x++){
            let coord = `${y}-${x}`
           
           
           row.push(<Cell flipCellsAroundMe={()=>{flipCellsAround(coord)}} key={coord} isLit={boards[y][x]}/>)
        }
       
       tableBoard.push(<tr key={y}>{row}</tr>)
    }

    const handleRestart = ()=>{
        window.location ='/'
    }
    if(hasWon) return (
        <div className='Board-Title'>
            <div className=" lg:text-[200px] md:text-[120px] text-[80px] ">

        <span className="neon-pink">You</span>
        <span className="neon-blue">Win</span>
        <div>

        <button onClick={handleRestart} className='neon-red text-5xl md:text-7xl'>Restart</button>
        </div>
            </div>
        </div>
    )
  return (
    <div>
        <div className='Board-Title'>
        <div className="neon-pink lg:text-[80px] text-[50px]">Lights</div>
        <div className="neon-blue lg:text-[80px] text-[50px]">Out</div>
        </div>
    <table className='Board sm:max-w-[100%] max-w-[24em]'>
        <tbody>
            {tableBoard}
        </tbody>
    </table>
    </div>
  )
}

export default Board