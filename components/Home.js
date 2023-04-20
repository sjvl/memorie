import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';
import React from 'react'
import Confetti from 'react-confetti';

function Home() {
  const deck = [
    { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 5, name: 'cactus', image: '/cactus.svg' },
    { id: 6, name: 'cactus', image: '/cactus.svg' },
    { id: 7, name: 'dog', image: '/dog.svg' },
    { id: 8, name: 'dog', image: '/dog.svg' },
    { id: 9, name: 'laptop', image: '/laptop.svg' },
    { id: 10, name: 'laptop', image: '/laptop.svg' },
    { id: 11, name: 'octopus', image: '/octopus.svg' },
    { id: 12, name: 'octopus', image: '/octopus.svg' },
    { id: 13, name: 'strawberry', image: '/strawberry.svg' },
    { id: 14, name: 'strawberry', image: '/strawberry.svg' },
    { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
    { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
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

  const selectCard = (id) => {
    setSelected([...selected, id]);
  };

  useEffect(()=>{
    if(selected.length === deck.length){
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
          Memory Game 🧠
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
