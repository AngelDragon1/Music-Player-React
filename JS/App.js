import React, { useState, useRef, createContext } from "react";
//importing styles
import "./style/App.scss";
//Adding Components 
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//IMPORT UTIL
import data from "./data";
import ReactSwitch from "react-switch";
import { ToastContainer } from "react-toastify";


export const ThemeContext = React.createContext(null);


function App() {

  const [show, hide] = useState(true);

  const audioRef = useRef(null);
  const [libraryStatus,setLibraryStatus ] = useState(false);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
});


const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  //console.log(e.target);
  const duration = e.target.duration;
   //console.log(e.target.duration);
   //calculate %
   const roundCurrent = Math.round(current);
   const roundDuration = Math.round(duration);
   const animation = Math.round((roundCurrent / roundDuration) * 100);
   //console.log(roundedCurrent);
   //console.log(roundedDuration);
   //console.log(roindedCurrent / roundedDuration * 100);

   setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation,
  })
};
const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  await  setCurrentSong(songs[(currentIndex + 1) % songs.length])  
  if (isPlaying) audioRef.current.play();
};
const toggleTheme = () => {
  setTheme((curr) => (curr === "light" ? "dark" : "light"));
};

const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
    <div className={`App ${libraryStatus ? "library-active" : ""}`} id={theme} onload="alertUser('Welcome to this AMAZING web page!')">
    <Nav 
    libraryStatus={libraryStatus}
    setLibraryStatus={setLibraryStatus}
    />
    <Song currentSong={currentSong}/>
    <Player 
    audioRef={audioRef}
    setIsPlaying={setIsPlaying}
    isPlaying={isPlaying}
    currentSong={currentSong}
    setSongInfo={setSongInfo}
    songInfo={songInfo}
    songs={songs}
    setCurrentSong={setCurrentSong}
    setSongs={setSongs}
    />

    <Library 
    audioRef={audioRef} 
    songs={songs} 
    setCurrentSong={setCurrentSong}
    isPlaying={isPlaying}
    setSongs={setSongs}
    libraryStatus={libraryStatus}
    />
    <div className="switch">
    <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
    </div>

    <audio 
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        isPlaying={isPlaying}
        onEnded={songEndHandler}
        ></audio>
        
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
