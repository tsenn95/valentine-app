import { useState, useRef } from "react";
import "./App.css";

import askingVideo from "./assets/asking-video.mp4"; 
import happyVideo from "./assets/accepting-video.mp4";
// Background music removed
import happyMusic from "./assets/happy-music.mp3";
import noSound from "./assets/no-sound.mp3";

const phrases = [
  "No", "Are you sure?", "Really sure?", "Pookie please?", 
  "Don't do this to me", "I'm gonna cry...", "You're breaking my heart ;("
];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  
  // Refs only for the sounds we are keeping
  const happyAudioRef = useRef(null);
  const noAudioRef = useRef(null);

  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    
    // Play "No" sound effect immediately on every click
    if (noAudioRef.current) {
      noAudioRef.current.currentTime = 0; // Rewind to start
      noAudioRef.current.play().catch(e => console.log("Playback blocked:", e));
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);
    
    // Stop the "No" sound if it happens to be playing
    if (noAudioRef.current) noAudioRef.current.pause();

    // Start the happy victory music
    if (happyAudioRef.current) {
      happyAudioRef.current.play().catch(e => console.log("Playback blocked:", e));
    }
  };

  return (
    <div className="valentine-container">
      {/* Audio Elements - Only Happy and No sound */}
      <audio ref={happyAudioRef} src={happyMusic} loop />
      <audio ref={noAudioRef} src={noSound} />

      {yesPressed ? (
        <>
          <video key="happy" autoPlay loop muted playsInline className="video-player">
            <source src={happyVideo} type="video/mp4" />
          </video>
          <div className="text-container">Ok yay!!! ❤️</div>
        </>
      ) : (
        <>
          <video key="asking" autoPlay loop muted playsInline className="video-player">
            <source src={askingVideo} type="video/mp4" />
          </video>
          <div className="text-container">Will you be my Valentine?</div>
          <div className="btn-container">
            <button
              className="yes-button"
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button onClick={handleNoClick} className="no-button">
              {noCount === 0 ? "No" : phrases[Math.min(noCount, phrases.length - 1)]}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;