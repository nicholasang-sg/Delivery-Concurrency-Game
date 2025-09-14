import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CarSprite from './components/carsprite.jsx'
import GridComponent from './grid/grid.jsx' 
import Node from './grid/node.jsx' 
import './App.css'

import Module from './c++ logic/sim.js';


function App() {

  useEffect(() => {
    Module().then((Module) => {
      const result = Module._add(1, 2);
      console.log("WASM result:", result);

      const counter = new Module.Counter();
      counter.inc();
      counter.inc();
      console.log("Counter value:", counter.get()); 
    });
  }, []);


  const [count, setCount] = useState(0);

  return (
    <>
      <GridComponent/>
      <CarSprite/>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
