import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function App(){
  const akadDate = new Date('2026-04-14T09:00:00');
  const akadCoords = { lat: -0.412915, lng: 100.072266 };
  const resepsiCoords = { lat: -0.6375711, lng: 100.1322098 };
  const [open,setOpen] = useState(false);
  const [count,setCount] = useState(getCountdown());
  const [playing,setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(()=>{
    const t=setInterval(()=>setCount(getCountdown()),1000);
    return ()=>clearInterval(t);
  },[]);

  function getCountdown(){
    const now=new Date();
    let diff=akadDate-now;
    if(diff<0) diff=0;
    const d=Math.floor(diff/(1000*60*60*24));
    const h=Math.floor((diff/(1000*60*60))%24);
    const m=Math.floor((diff/(1000*60))%60);
    const s=Math.floor((diff/1000)%60);
    return {d,h,m,s};
  }
  function openInvite(){
    setOpen(true);
    if(audioRef.current){
      audioRef.current.play().then(()=>setPlaying(true)).catch(()=>{});
    }
  }
  function togglePlay(){
    if(!audioRef.current)return;
    if(playing){audioRef.current.pause();setPlaying(false);}else{audioRef.current.play().then(()=>setPlaying(true)).catch(()=>{});}
  }

  return(<div className="container">
    <div className="card">
      <div className="kaligrafi">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
      <h1 className="title">Muchsin & Suci</h1>
      <button className="btn" onClick={openInvite}>Buka Undangan</button>
      <div style={{marginTop:'10px'}}>
        <audio ref={audioRef} src="/audio/track.mp3" loop/>
        <button onClick={togglePlay} className="btn">{playing? 'Pause Musik':'Putar Musik'}</button>
      </div>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}}>
          <div className="countdown">
            <strong>Menuju Hari Akad:</strong><br/>
            {count.d} Hari {count.h} Jam {count.m} Menit {count.s} Detik
          </div>
          <blockquote style={{marginTop:'20px',color:'#6b3f2b',fontStyle:'italic'}}>
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..." <strong>QS. Ar-Rum: 21</strong>
          </blockquote>
          <h3>Akad Nikah</h3>
          <iframe className="maps" title="map-akad" src={`https://www.google.com/maps?q=${akadCoords.lat},${akadCoords.lng}&z=16&output=embed`}></iframe>
          <h3>Resepsi</h3>
          <iframe className="maps" title="map-resepsi" src={`https://www.google.com/maps?q=${resepsiCoords.lat},${resepsiCoords.lng}&z=16&output=embed`}></iframe>
        </motion.div>
      )}
    </div>
  </div>);
}
