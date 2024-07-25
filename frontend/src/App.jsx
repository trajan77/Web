import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as util_request from './request/util.request'
import * as websocket_client from './request/client.websocket'
import Header from "./components/header/Header.jsx";
//import Header from './components/header/Header';

function App() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState("");

  util_request.getTitle().then(result => {
    console.log(title)
    setTitle(result);
  })

  return (
    <>
        <Header/>
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo"/>
            </a>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo"/>
            </a>
        </div>
        <h1>{title}</h1>
        <div className="card">
            <button onClick={() => {
                setCount((count) => count + 1);
                websocket_client.send("Current Count is: " + count);
        }}>
          count  is {count}
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
