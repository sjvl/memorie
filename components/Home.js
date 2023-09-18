import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';
import React from 'react'
import Confetti from 'react-confetti';

function Home() {
  const deck = [
    { id: 1, name: 'Maps', image: '/maps.svg' },
    { id: 2, name: 'Maps', image: '/maps.svg' },
    { id: 3, name: 'YouTube', image: '/youtube.svg' },
    { id: 4, name: 'YouTube', image: '/youtube.svg' },
    { id: 5, name: 'Spotify', image: '/spotify.svg' },
    { id: 6, name: 'Spotify', image: '/spotify.svg' },
    { id: 7, name: 'Outlook', image: '/outlook.svg' },
    { id: 8, name: 'Outlook', image: '/outlook.svg' },
    { id: 9, name: 'Android', image: '/android.svg' },
    { id: 10, name: 'Android', image: '/android.svg' },
    { id: 11, name: 'Meteo France', image: '/meteo-france.svg' },
    { id: 12, name: 'Meteo France', image: '/meteo-france.svg' },
    { id: 13, name: 'Tesla', image: '/tesla.svg' },
    { id: 14, name: 'Tesla', image: '/tesla.svg' },
    { id: 15, name: 'Firefox', image: '/firefox.svg' },
    { id: 16, name: 'Firefox', image: '/firefox.svg' },
  ];

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
      setExplained([...explained, deck[selected[selected.length-1]-1].name])
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
      }, 3000);
    }else if (selected.length === 0 || selected.length % 2 !== 0){
      setSelected(selected)
    }else{
      if(deck[selected[selected.length-2]-1].name === deck[selected[selected.length-1]-1].name){
        if(!explained.includes(deck[selected[selected.length-1]-1].name)){
          setExplained([...explained, deck[selected[selected.length-1]-1].name])
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
      ///popup explanation
      console.log(explained[explained.length-1])
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
          Le mémorie de l'IA 🧠 
        </h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
