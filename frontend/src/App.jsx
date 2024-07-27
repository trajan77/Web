import { useState } from 'react'

import './App.css'
import * as util_request from './request/util.request'
import Pages from "./components/pages/Pages.jsx";
//import Header from './components/header/Header';

function App() {
  const [title, setTitle] = useState("");
  util_request.getTitle().then(result => {
    console.log(title)
    setTitle(result);
  })

  return (
    <>
        <Pages/>
    </>
  )
}

export default App
