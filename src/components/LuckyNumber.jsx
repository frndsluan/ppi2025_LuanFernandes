import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  //REACT HOOK - useState()
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [saveNumber, setSaveNumber] = useState([]);
  const [message, setMessage] = useState("");

  function handleClick() {
    const number = Math.ceil(Math.random() * 31);

    if (saveNumber.includes(number)) {
      setMessage(`O número ${number} já foi sorteado!`);
    } else {
      setLuckyNumber(number);
      setSaveNumber([...saveNumber, number]);
      setMessage(`O número ${number} foi sorteado com sucesso!`);
    }
  }

  return (
    <div className={styles.container}>
      {luckyNumber ? (
        <h1>Lucky Number = {luckyNumber}</h1>
      ) : (
        <h1>Lucky Number 🎲</h1>
      )}

      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleClick}>
          Clique!
        </button>

        <button
          className={styles.button}
          onClick={() => {
            setLuckyNumber(0);
            setSaveNumber([]);
            setMessage("");
          }}
        >
          RESET 🔄
        </button>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <strong>Números sorteados:</strong>
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          [{saveNumber.toString()}]
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}
