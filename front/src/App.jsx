import { useState } from 'react'
import generateCaption from './models/api.js';
import './App.css'

function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [caption, setCaption] = useState("<Caption>")

  function addCaption() {
    const caption = generateCaption(imgSrc);
    setCaption (caption)
  }

  return (
    <>
     <h1>Caption Generator</h1>
     <div className="url-form">
      <input onChange={(e) => setImgSrc(e.target.value)}></input> 
      <button onClick={addCaption}>Generate</button>
     </div>
     <div className="captioned-image">
      <img src={imgSrc} height={200} width={200}></img>
      <span>{caption}</span>
     </div>
    </>
  )
}

export default App
