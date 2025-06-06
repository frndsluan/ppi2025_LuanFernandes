import styles from "./MyGrid.module.css";

export function MyGrid() {
  return (
    <div className={styles.containe}>
      <header className={styles.header1} />
      <header className={styles.header2} />
      <aside className={styles.aside} />

      <div className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.title}>Card 1</h2>
            <p className={styles.text}>This is the content of card 1.</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.title}>Card 2</h2>
            <p className={styles.text}>This is the content of card 2.</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.title}>Card 3</h2>
            <p className={styles.text}>This is the content of card 3.</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.title}>Card 4</h2>
            <p className={styles.text}>This is the content of card 4.</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.title}>Card 5</h2>
            <p className={styles.text}>This is the content of card 5.</p>
          </div>
        </div>
      </div>
      <footer className={styles.footer} />
    </div>
  );
}
