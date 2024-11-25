import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Confetti from 'react-confetti';

const gameIcons = ["🎉","🌹","🤳","🎁","🐱‍🚀"];

function App() {
 
  
  const[pieces,setPieces] = useState([]); 
  const isGameFinished = useMemo(()=>{
    if( pieces.length > 0 && pieces.every((piece)=>piece.solved  )){
      return true;}
    else{
      return false;
}},[pieces]);
//console.log(isGameFinished);
  const startGame=()=>{
    
    const duplicateIcons = [...gameIcons,...gameIcons];
    
    const newGameIcons = [];
    while(newGameIcons.length < gameIcons.length*2){
      const randomIndex = Math.floor(Math.random()*duplicateIcons.length);
      newGameIcons.push({
        emoji:duplicateIcons[randomIndex],
        flipped:false,
        solved:false,
        position:newGameIcons.length
      });
      duplicateIcons.splice(randomIndex,1);
    }
    setPieces(newGameIcons);
  } 

  
  useEffect(()=>{
    startGame()
  },[]);
 
  const handleActive=(data)=>{
    const flippedData = pieces.filter((piece)=>piece.flipped && !piece.solved);
    if(flippedData.length === 2)return;
     const newPieces= pieces.map((piece)=>{
      if(piece.position === data.position){
         piece.flipped=!piece.flipped;
      }
      return piece;
    });
    setPieces(newPieces);
  }

  const gameLogicForFlipped = ()=>{
    const flippedData = pieces.filter((data)=>data.flipped && !data.solved);
    console.log(flippedData);
    if(flippedData.length===2){
      setTimeout(()=>{
       
          setPieces(
            pieces.map((piece)=>{
              if(piece.position===flippedData[0].position ||
                piece.position===flippedData[1].position
              ){
                if(flippedData[0].emoji===flippedData[1].emoji){
                piece.solved = true;
              }
              else{
                piece.flipped = false;
              }
              
            }
            return piece;
         
        })
          )},800)
    }
  }

  useEffect(()=>{
    gameLogicForFlipped();
  },[pieces]);

    
  
  return (
    <main className='home-page'>
      <h1>Memory Game using React</h1>
      <div className='container'>
        {pieces.map((data,index)=>(
  <div className={`flip-card ${data.flipped || data.solved ? "active":"" }`} key={index} onClick={()=>handleActive(data)} >
  <div className="flip-card-inner">
    <div className="flip-card-front"/>
    <div className="flip-card-back" >{data.emoji}</div>
    </div>
    </div>))}
      </div>
      {
        isGameFinished && (
          <div className='game-finished'>
            <h1>YOU WIN!!!</h1>
            <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />
          </div>
        )
      }
    </main>
      
    
  )
}

export default App
