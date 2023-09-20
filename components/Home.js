import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';
import React from 'react'
import Confetti from 'react-confetti';

function Home() {
  const deck = [
    { id: 1, name: 'Maps', image: '/maps.svg', msg: 'Une IA détermine le meilleur trajet' },
    { id: 2, name: 'Maps', image: '/maps.svg', msg: 'Une IA détermine le meilleur trajet' },
    { id: 3, name: 'YouTube', image: '/youtube.svg', msg: 'Une IA me recommande des vidéos' },
    { id: 4, name: 'YouTube', image: '/youtube.svg', msg: 'Une IA me recommande des vidéos' },
    { id: 5, name: 'Spotify', image: '/spotify.svg', msg: 'Une IA me recommande des morceaux de musique' },
    { id: 6, name: 'Spotify', image: '/spotify.svg', msg: 'Une IA me recommande des morceaux de musique' },
    { id: 7, name: 'Outlook', image: '/outlook.svg', msg: 'Une IA peut détecter les spams' },
    { id: 8, name: 'Outlook', image: '/outlook.svg', msg: 'Une IA peut détecter les spams' },
    { id: 9, name: 'Android', image: '/android.svg', msg: 'Une IA me suggère des applications' },
    { id: 10, name: 'Android', image: '/android.svg', msg: 'Une IA me suggère des applications' },
    { id: 11, name: 'Meteo France', image: '/meteo-france.svg', msg: 'Une IA prédit la météo' },
    { id: 12, name: 'Meteo France', image: '/meteo-france.svg', msg: 'Une IA prédit la météo' },
    { id: 13, name: 'Tesla', image: '/tesla.svg', msg: 'Une IA peut piloter ma voiture' },
    { id: 14, name: 'Tesla', image: '/tesla.svg', msg: 'Une IA peut piloter ma voiture' },
    { id: 15, name: 'Firefox', image: '/firefox.svg', msg: 'Une IA personnalise la réponse à ma recherche' },
    { id: 16, name: 'Firefox', image: '/firefox.svg', msg: 'Une IA personnalise la réponse à ma recherche' },
  ];
  
  const [popup, setPopup] = useState('');

  const [shuffleDeck, setShuffleDeck] = useState([]);

  useEffect(() => {
    for (let i = deck.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      let temp = deck[i];
      deck[i] = deck[rand];
      deck[rand] = temp;
    }
    setShuffleDeck(deck);
  },[])

  const [selected, setSelected] = useState([]);
  const [confetti, setConfetti] = useState();
  const [explained, setExplained] = useState([]);

  const selectCard = (id) => {
    setSelected([...selected, id]);
  };

  useEffect(()=>{
    if(selected.length === deck.length){
      setExplained([...explained, deck[selected[selected.length-1]-1].msg])
      ///
      setConfetti(<Confetti
        width='1500%'
        height='800%'
        numberOfPieces={200}
        recycle={true}
        gravity={0.2}
        confettiSource={{ x: 750, y: 0 }}
      />)
      ///
      setTimeout(() => {
        setSelected([])
        for (let i = deck.length - 1; i > 0; i--) {
          let rand = Math.floor(Math.random() * (i + 1));
          let temp = deck[i];
          deck[i] = deck[rand];
          deck[rand] = temp;
        }
        setShuffleDeck(deck);
        setConfetti();
        setExplained([])
        setPopup("")
      }, 4000);
    }else if (selected.length === 0 || selected.length % 2 !== 0){
      setSelected(selected)
    }else{
      if(deck[selected[selected.length-2]-1].name === deck[selected[selected.length-1]-1].name){
        if(!explained.includes(deck[selected[selected.length-1]-1].msg)){
          setExplained([...explained, deck[selected[selected.length-1]-1].msg])
        }
      }
      setTimeout(() => {
        if(deck[selected[selected.length-2]-1].name !== deck[selected[selected.length-1]-1].name){
          setSelected(selected.filter((e,i) => {
            if (i<selected.length-2){
              return e
            }
          }))
        }
      }, 1000);
    }
  },[selected])

  useEffect(()=>{
    if(explained.length > 0){
      setPopup(explained[explained.length-1])
    }
  },[explained])

  const cardsToDisplay = shuffleDeck.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={selected.includes(card.id)}
      />
    );
  });



  return (
    <div className={styles.home}>
      {confetti}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Le memory de l'IA 🧠 
        </h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>

      {popup && 
      <div onClick={()=> setPopup("")} className={styles.popup}>
        <div className={styles.modal}>
          {popup}
        </div>
      </div>
      }
      
    </div>
  );
}

export default Home;
