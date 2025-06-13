import styles from "./MyFooter.module.css";
import { Instagram, Github, MessageSquare } from "lucide-react";

export default function MyFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <p>IFRN - Campus Macau</p>
        <p>Curso Técnico em Informática</p>
        <p>Programação para Internet 2025</p>
      </div>

      <div className={styles.center}>
        <p className={styles.italic}>Aluno: Luan Fernandes Bezerra</p>
      </div>

      <div className={styles.right}>
        <a
          href="https://www.instagram.com/frndsluan?igsh=MXFhNzNmY2QxYWc1Ng=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
        <a
          href="https://github.com/frndsluan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
        <a
          href="https://wa.me/5584996027699"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageSquare />
        </a>
      </div>
    </footer>
  );
}
