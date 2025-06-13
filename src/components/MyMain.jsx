import styles from "./MyMain.module.css";

const cards = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/300/200?random=${i + 1}`,
  title: `My Text ${i}`,
}));

export default function MyMain() {
  return (
    <main className={styles.main}>
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          <img src={card.image} alt={card.title} className={styles.image} />
          <h2 className={styles.title}>{card.title}</h2>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Expedita, exercitationem.
          </p>
        </div>
      ))}
    </main>
  );
}
