import './App.css'
import { useState, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      setRunning(false)
      // console.log("You won!")
    }
  }, [dice])


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  // console.log(allNewDice())

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        if (id === die.id) {         
          setRunning(true);
          return { ...die, isHeld: !die.isHeld };
        } else {
          return die;
        }
      })
    );
  }

  const diceElements = dice.map((die) =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />)

  function rollDice() {
    if (!tenzies) {
      setCount(prev => prev + 1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setCount(0);
      setTenzies(false)
      setDice(allNewDice())
      setTime(0);
    }
  }
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = undefined;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <div className="roll-time">
        <div className='roll'>Total Roll: {count}</div>
        <div className="timer">
          <p>Time:</p>
          <div>
            <span>
              {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            </span>
            <span>
              {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
            </span>
            <span>
              {("0" + ((time / 10) % 100)).slice(-2)}
            </span>
          </div>
        </div>
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
