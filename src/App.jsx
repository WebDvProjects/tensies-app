import { Fragment, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Confetti from "react-confetti";

function DiceElements(props) {
  return (
    <div className="dice-group">
      {props.diceNums.map((die) => (
        <div
          // if die is isHeld then add selected class in
          className={`die`}
          data-is-held={die.isHeld}
          key={die.id}
          onClick={() => props.handleClick(die.id)}>
          {die.value}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [dice, setDice] = useState(() => getRandomDiceNums());

  function getRandomDiceNums() {
    // generate 10 random numbers btn 1-6 inclusive
    return [...Array(10)].map((v, k) => ({
      id: k + 1,
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
    }));
  }

  function handleSelect(dieId) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        // look for the die with a matching id and select it
        die.id === dieId ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  // WIN STATE
  const [tenzies, setTenzies] = useState(false);

  // check win
  useEffect(() => {
    // isWin will loop through the dice and store the current
    // die.value and another value which returns true if all
    // values are the same and are held
    const win = dice.reduce(
      (isWin, die) => [
        die.value,
        isWin[0] === die.value && isWin[1] && die.isHeld,
      ],
      [dice[0].value, dice[0].isHeld]
    );

    if (win[1]) {
      console.log("YOU WON");
      setTenzies(win[1]);
    }
  }, [dice]);

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) =>
        // for every die check if die is isHeld, if yes then dont change
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) }
      )
    );
  }

  function newGame() {
    setTenzies(false);
    setDice(() => getRandomDiceNums());
  }

  return (
    <main className="App">
      {tenzies && <Confetti />}
      <section className="description">
        <h2 className="description--title">Tenzies</h2>
        <p className="description--content">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        {tenzies && (
          <h3
            style={{
              margin: "0",
              marginTop: "20px",
            }}>
            YOU WON! YAYYYYy
          </h3>
        )}
      </section>
      <DiceElements diceNums={dice} handleClick={handleSelect} />
      <button className="btn" onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
