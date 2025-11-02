import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
const akadDate = new Date('2026-04-14T13:00:00');
const akadCoords = { lat: -0.412915, lng: 100.072266 };
const resepsiCoords = { lat: -0.6375711, lng: 100.1322098 };

export default function App(){
  const [open, setOpen] = useState(false);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [rsvps, setRsvps] = useState(()=>{ try{ const raw = localStorage.getItem('rsvps-final'); return raw? JSON.parse(raw): []; }catch{return []} });
  const [form, setForm] = useState({name:'',attending:'Hadir',message:''});
  useEffect(()=>{ localStorage.setItem('rsvps-final', JSON.stringify(rsvps)); },[rsvps]);

  // countdown
  const [count,setCount] = useState(getCountdown());
  useEffect(()=>{ const t = setInterval(()=>setCount(getCountdown()),1000); return ()=>clearInterval(t); },[]);
  function getCountdown(){ const now=new Date(); let diff=akadDate-now; if(diff<0) diff=0; const days=Math.floor(diff/(1000*60*60*24)); const hours=Math.floor((diff/(1000*60*60))%24); const minutes=Math.floor((diff/(1000*60))%60); const seconds=Math.floor((diff/1000)%60); return {days,hours,minutes,seconds}; }

  function openInvite(){ setOpen(true); // play music on user gesture
    if(audioRef.current){ audioRef.current.play().then(()=>setPlaying(true)).catch(()=>{}); }
  }
  function togglePlay(){ if(!audioRef.current) return; if(playing){ audioRef.current.pause(); setPlaying(false);} else { audioRef.current.play().catch(()=>{}); setPlaying(true);} }

  function submitRsvp(e){ e.preventDefault(); if(!form.name.trim()) return alert('Mohon isi nama'); const entry={...form,time:new Date().toISOString()}; setRsvps(s=>[entry,...s]); setForm({name:'',attending:'Hadir',message:''}); alert('Terima kasih, RSVP tersimpan.'); }
  function downloadCSV(){ if(!rsvps.length) return alert('Belum ada RSVP'); const header=['name','attending','message','time']; const rows=rsvps.map(r=>header.map(h=>'"'+((r[h]||'').replace(/"/g,'""'))+'"').join(',')); const csv=[header.join(','),...rows].join('\n'); const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='rsvp_muchsin_suci.csv'; a.click(); URL.revokeObjectURL(url); }

  return (<div className="container">
    <div className="card">
      <div className="hero">
        <div style={{flex:1}}>
          <div className="kaligrafi">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
          <motion.h1 className="title" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.8}}>Muchsin & Suci</motion.h1>
          <div className="subtitle">M. MUCHSIN RAHMADANI & SUCI PERMATA ARJUNA, S.Pd.GSD</div>
          <div style={{marginTop:12,color:'#6f4a37'}}>Putra Ketiga dari Bapak Nasrul & Ibu Deslinawati — Putri Kedua dari Bapak Zulkifli (Alm.) & Ibu Arjuna</div>
          <div style={{marginTop:14}}>
            <div style={{display:'inline-block',padding:8,borderRadius:10,background:'#fff',border:'1px solid rgba(0,0,0,0.03)'}}>14 — 16 April 2026</div>
          </div>
        </div>
        <div className="hero-right" style={{width:220}}>
          <div className="hero-image gold-shimmer"><img src="/images/pasangan.jpg" alt="Pasangan" /></div>
          <div style={{marginTop:12}}>
            <button className="open-btn" onClick={openInvite}>Buka Undangan</button>
          </div>
          <div className="audio-controls" style={{marginTop:12}}>
            <audio ref={audioRef} loop src="/audio/track.mp3" />
            <button onClick={togglePlay} className="btn">{playing? 'Pause Musik' : 'Putar Musik'}</button>
          </div>
        </div>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} style={{display: open? 'block':'none'}}>
        <div style={{padding:22}}>
          <motion.blockquote initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.3}} style={{fontStyle:'italic',color:'#6f4a37'}}>
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..." <strong>QS. Ar-Rum: 21</strong>
          </motion.blockquote>

          <div style={{marginTop:18}} className="grid">
            <div className="card-small">
              <h3>Akad Nikah</h3>
              <p style={{marginTop:6}}>Selasa, 14 April 2026 — 13.00 WIB</p>
              <p style={{marginTop:6}}>Jl. Raya Malai, Kampung Ingu, Kecamatan Sungai Geringging, Kabupaten Padang Pariaman</p>
              <p style={{marginTop:10}}><a href={`https://www.google.com/maps?q=${akadCoords.lat},${akadCoords.lng}`} target="_blank" rel="noreferrer">Lihat di Google Maps</a></p>
              <div style={{marginTop:10}}><iframe className="maps" title="map-akad" src={`https://www.google.com/maps?q=${akadCoords.lat},${akadCoords.lng}&z=16&output=embed`}></iframe></div>
              <p style={{marginTop:8,color:'#6f4a37'}}>Lokasi Akad – Jl. Raya Malai, Kampung Ingu, Kecamatan Sungai Geringging, Kabupaten Padang Pariaman</p>
            </div>
            <div className="card-small">
              <h3>Resepsi</h3>
              <p style={{marginTop:6}}>Kamis, 16 April 2026 — 08.00 WIB</p>
              <p style={{marginTop:6}}>Jl. H. Agus Salim No. 48, Kel. Jalan Baru, Kecamatan Pariaman Tengah, Kota Pariaman</p>
              <p style={{marginTop:10}}><a href={`https://www.google.com/maps?q=${resepsiCoords.lat},${resepsiCoords.lng}`} target="_blank" rel="noreferrer">Lihat di Google Maps</a></p>
              <div style={{marginTop:10}}><iframe className="maps" title="map-resepsi" src={`https://www.google.com/maps?q=${resepsiCoords.lat},${resepsiCoords.lng}&z=16&output=embed`}></iframe></div>
              <p style={{marginTop:8,color:'#6f4a37'}}>Lokasi Resepsi – Jl. H. Agus Salim No. 48, Kel. Jalan Baru, Kecamatan Pariaman Tengah, Kota Pariaman</p>
            </div>
          </div>

          <div style={{marginTop:18,display:'grid',gridTemplateColumns:'1fr 400px',gap:18}}>
            <div style={{background:'#fff',padding:18,borderRadius:12}}>
              <h3>Doa & Harapan</h3>
              <p>Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir memberi doa restu pada pernikahan putra-putri kami.</p>
              <p style={{marginTop:12}}><strong>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</strong></p>
            </div>

            <div style={{background:'#fff',padding:18,borderRadius:12}}>
              <h3>Konfirmasi Kehadiran (RSVP)</h3>
              <form className="rsvp-form" onSubmit={submitRsvp} style={{marginTop:8}}>
                <input placeholder="Nama lengkap" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
                <select value={form.attending} onChange={e=>setForm(f=>({...f,attending:e.target.value}))}>
                  <option>Hadir</option>
                  <option>Berhalangan</option>
                </select>
                <textarea placeholder="Pesan / Doa (opsional)" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} />
                <div style={{display:'flex',gap:8,marginTop:8}}>
                  <button type="submit" className="btn">Kirim RSVP</button>
                  <button type="button" onClick={downloadCSV} className="btn" style={{background:'#fff',color:'#6f4a37',border:'1px solid #efe0d4'}}>Unduh CSV</button>
                </div>
              </form>

              <div style={{marginTop:12}}>
                <h4>Daftar RSVP ({rsvps.length})</h4>
                <div style={{maxHeight:220,overflow:'auto',paddingRight:8,marginTop:8}}>
                  {rsvps.length===0 && <div style={{color:'#6f4a37'}}>Belum ada konfirmasi</div>}
                  {rsvps.map((r,i)=>(
                    <div key={i} style={{padding:10,background:'#fff',border:'1px solid #f0e6de',borderRadius:8,marginBottom:8}}>
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div style={{fontWeight:600,color:'#3b2f2a'}}>{r.name}</div>
                        <div style={{fontSize:12,color:'#8b5e3c'}}>{new Date(r.time).toLocaleString()}</div>
                      </div>
                      <div style={{color:'#6f4a37'}}>{r.attending} — {r.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <footer className="footer">
            <p>Wassalamu’alaikum Warahmatullahi Wabarakatuh</p>
            <div style={{marginTop:8,color:'#8b5e3c'}}>© 2026 Muchsin & Suci</div>
          </footer>
        </div>
      </motion.div>
    </div>
  </div>);
}
