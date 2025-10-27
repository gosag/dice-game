import { useState ,useEffect} from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti";
export default function Main(){
 const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
function generateNewDie(){
   return{ value: Math.ceil(Math.random()*6),
                  isHeld:false,
                  id:nanoid()}
}
const AllNewDice=()=>{
const newDice=[];
for(let i=0;i<10;i++){
    newDice.push(generateNewDie())
}
return newDice
}
const [dice,setDice]=useState(AllNewDice())
const [rollTracker,setRollTracker]=useState(0)



function HoldDice(id:string){
setDice(oldDice=>oldDice.map(dice=>{
    return dice.id===id?
    {...dice,isHeld:!dice.isHeld}:dice
}))
}
const [tenzies,setTenzies]=useState(false)
function NewGame(){
    setDice(AllNewDice())
    setTenzies(false) 
    setRollTracker(1)
    setStartTime(Date.now())
    setEndTime(null)
    setDuration(null)
    }
function RollDice(){
setDice(oldDice=>oldDice.map(die=>{
return die.isHeld?
die:generateNewDie()
}))
setRollTracker(prevState=>prevState+1)
}

useEffect(()=>{
if (dice.length === 0) {
        return; 
    }

    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if(allHeld && allSameValue){
        setTenzies(true)
    }
},[dice])

function RollAndStart(){
RollDice()
if(!startTime){
    setStartTime(Date.now())
}}
useEffect(()=>{
if(tenzies && startTime){
    const end=Date.now()
    setEndTime(end)
    const diff=Math.floor((end-startTime)/1000)
    setDuration(diff)
}
},[tenzies])
const [showCongrats, setShowCongrats] = useState(false)
useEffect(() => {
  if (tenzies) {
    setShowCongrats(true)
    const timer = setTimeout(() => setShowCongrats(false), 3000)
    return () => clearTimeout(timer)
  }
}, [tenzies])


const diceElement=dice.map((dice,index)=><Die value={dice.value} key={dice.id} isHeld={dice.isHeld} id={dice.id} HoldDice={()=>HoldDice(dice.id)} />)
    return(
        <div className="main-container">
        <div className="main">
            <h1 className="title">Tenzies</h1>
            <p className="the-Description">Roll untill all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {diceElement}    
            </div>
            
            {tenzies && <Confetti />}
            {!tenzies?<button onClick={()=>RollAndStart()} className="dice-Button">Roll</button>:
            <button className="dice-Button new-game" onClick={()=>NewGame()}>New Game</button>}
            { rollTracker!==0 && <div className="roll-tracking"><mark>{rollTracker}</mark> {rollTracker>1?"Rollings":"Rolling"}{tenzies && <span> in <mark>{duration}</mark>seconds to finish</span> }</div>}
            {showCongrats && (
  <div className="congrats-message">
    🎉 Congratulations! You Won! 🎲
  </div>
)}

        </div>
        </div>
        
    )
}

