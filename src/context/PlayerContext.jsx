import { createContext, useRef, useState,useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();
const PlayerContextProvider = (props) => {
  const audioref = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const [Track, setTrack] = useState(songsData[0]);
  const [playstatus, setplaystatus] = useState(false);
  const [Time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const play = () => {
    audioref.current.play();
    setplaystatus(true);
  };
  const pause = () => {
    audioref.current.pause();
    setplaystatus(false);
  };
  useEffect(()=>{
    setTimeout(()=>
    {

    
    audioref.current.ontimeupdate=()=>{
      seekBar.current.style.width=Math.floor((audioref.current.currentTime/audioref.current.duration*100))+"%";
  
      setTime({
        currentTime: {
          second: Math.floor(audioref.current.currentTime%60),
          minute: Math.floor(audioref.current.currentTime/60),
        },
        totalTime: {
          second:  Math.floor(audioref.current.duration%60),
          minute: Math.floor(audioref.current.duration/60),
        },

      })
    }
  },1000);

  },[audioref]);
  const playwithid = async (id) => {
    await setTrack(songsData[id]);
    await audioref.current.play();
    setplaystatus(true);
  };
  const previous = async () => {
    if(Track.id>0)
    {
      await setTrack(songsData[Track.id-1]);
      await audioref.current.play();
      setplaystatus(true);
    }
  };
  const next = async () => {
    if(Track.id<songsData.length-1)
      {
        await setTrack(songsData[Track.id+1]);
        await audioref.current.play();
        setplaystatus(true);
      }


  };
  const seeksong = async (e) => {
   audioref.current.currentTime=((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioref.current.duration)
  };

  const contextvalue = {
    audioref,
    seekBg,
    seekBar,
    Track,
    setTrack,
    playstatus,
    setplaystatus,
    Time,
    setTime,
    play,
    pause,
    playwithid,
    previous,
    next,
    seeksong,
  };
  return (
    <PlayerContext.Provider value={contextvalue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;
