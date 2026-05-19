import { useState } from 'react'
import generateCaption from './models/api.js';
import './App.css'

function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [caption, setCaption] = useState("<Caption>")

  async function addCaption() {
    setCaption("Gerando legenda...")

    const caption = await generateCaption(imgSrc);
    setCaption(caption[0]['generated_text']);
  }

  return (
    <>
      <h1>Caption Generator</h1>
      <div className="url-form">
        <input onChange={(e) => setImgSrc(e.target.value)}></input>
        <button onClick={addCaption}>Generate</button>
      </div>
      <div className="captioned-image">
        {imgSrc && (
          <img src={imgSrc} height={200} width={200} />
        )}
        <span>{caption}</span>
      </div>
    </>
  )
}

export default App
