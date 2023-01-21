import { Fragment, useState } from "react";
import "./App.css";

function DiceElements(props) {
  return (
    <div className="dice-group">
      {[...Array(10).keys()].map((i) => (
        <div className={`die ${i + 1}`} key={i + 1}>
          {i + 1}
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <main className="App">
      <section className="description">
        <h2 className="description--title">Tenzies</h2>
        <p className="description--content">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </section>
      <DiceElements />
      <button className="btn">Roll</button>
    </main>
  );
}

export default App;
