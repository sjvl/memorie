import Image from 'next/image';
import styles from '../styles/Card.module.css';

function Card(props) {
  return (
    <div onClick={() => { if(!props.selected){props.selectCard(props.id)} }} className={`${styles.card} ${props.selected && styles.active}`}>
      <div className={styles.flipper}>
        <div className={styles.cardFront}>
          <Image src="/images/AI.svg" alt="Card back" width={90} height={90} />
        </div>
        <div className={styles.cardBack}>
          <Image src={`/images/${props.image}`} alt={props.name} width={50} height={50} />
        </div>
      </div>
    </div>
  );
}

export default Card;
