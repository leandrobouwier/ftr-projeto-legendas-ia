import { useEffect, useState, useRef } from 'react'
import { convertToAudio, generateCaption, translate} from './models/api.js';
import './App.css'

function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [caption, setCaption] = useState("<Caption>")
  const [captionPTBR, setCaptionPTBR] = useState("<Legenda>")
  const [audioSrc, setAudioSrc] = useState(null)

  const captionAudio = useRef();

  async function addCaption() {
    setCaption("Gerando legenda...")
    const caption = await generateCaption(imgSrc);
    setCaption(caption[0]['generated_text']);

    setCaptionPTBR("Traduzindo legenda...")
    const captionPTBR = await translate(caption)
    setCaptionPTBR(captionPTBR[0]["translation_text"])

    const audioEndpoint = await convertToAudio([{"translation_text": "Um pato na lagoa" }])
    const audioSrc = "http://localhost:5000" + audioEndpoint[0]["url"];
    setAudioSrc(audioSrc);
  }

  useEffect( () => {
    if(captionAudio.current && audioSrc){
      captionAudio.current.pause();
      captionAudio.current.load();
      captionAudio.current.play();
    }
  }, [audioSrc])

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
        <span>{captionPTBR}</span>
        <audio controls ref={captionAudio}>
          <source src={audioSrc}></source>
        </audio>
      </div>
    </>
  )
}

export default App
