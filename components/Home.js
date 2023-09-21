import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';
import React from 'react'
import Confetti from 'react-confetti';

function Home() {
  const deck = [
    { id: 1, name: 'Maps', image: '/maps.svg', msg: 'Une IA peut déterminer le meilleur trajet selon la circulation, les travaux ou acccidents.' },
    { id: 2, name: 'Maps', image: '/maps.svg', msg: 'Une IA peut déterminer le meilleur trajet selon la circulation, les travaux ou acccidents.' },
    { id: 3, name: 'YouTube', image: '/youtube.svg', msg: 'Une IA peut recommander des vidéos selon mes centres d’intérêt.' },
    { id: 4, name: 'YouTube', image: '/youtube.svg', msg: 'Une IA peut recommander des vidéos selon mes centres d’intérêt.' },
    { id: 5, name: 'Spotify', image: '/spotify.svg', msg: 'Une IA peut recommander des morceaux de musique selon mes goûts.' },
    { id: 6, name: 'Spotify', image: '/spotify.svg', msg: 'Une IA peut recommander des morceaux de musique selon mes goûts.' },
    { id: 7, name: 'Outlook', image: '/outlook.svg', msg: 'Une IA peut détecter les spams en fonction du contenu d’un message ou de l’adresse d’un destinataire.' },
    { id: 8, name: 'Outlook', image: '/outlook.svg', msg: 'Une IA peut détecter les spams en fonction du contenu d’un message ou de l’adresse d’un destinataire.' },
    { id: 9, name: 'Android', image: '/android.svg', msg: 'Une IA peut identifier mes contacts dans les photos que je prends ou rédiger un message lorsque je lui demande.' },
    { id: 10, name: 'Android', image: '/android.svg', msg: 'Une IA peut identifier mes contacts dans les photos que je prends ou rédiger un message lorsque je lui demande.' },
    { id: 11, name: 'Meteo France', image: '/meteo-france.svg', msg: 'Une IA peut prédire le temps qu’il fera, les risques d’orages ou de catastrophes.' },
    { id: 12, name: 'Meteo France', image: '/meteo-france.svg', msg: 'Une IA peut prédire le temps qu’il fera, les risques d’orages ou de catastrophes.' },
    { id: 13, name: 'Tesla', image: '/tesla.svg', msg: 'Une IA peut corriger ma conduite lorsque je suis fatigué ou innatentif.' },
    { id: 14, name: 'Tesla', image: '/tesla.svg', msg: 'Une IA peut corriger ma conduite lorsque je suis fatigué ou innatentif.' },
    { id: 15, name: 'Firefox', image: '/firefox.svg', msg: 'Une IA peut personnaliser les réponses à ma recherche en fonction de mes recherches précédentes, de mon identité ou de ma position.' },
    { id: 16, name: 'Firefox', image: '/firefox.svg', msg: 'Une IA peut personnaliser les réponses à ma recherche en fonction de mes recherches précédentes, de mon identité ou de ma position.' },
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
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>
            Le memory de l'IA 🧠 
          </h1>

        </div>
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
