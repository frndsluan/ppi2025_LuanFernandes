import styles from "./MyHeader.module.css";

export default function MyHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.fraseContainer}>
        <img src="/Tomate azul.png" alt="Tomate azul" />
        <h1 className={styles.title}>Foco, Força e Fé</h1>
      </div>
    </header>
  );
}
