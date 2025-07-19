import { ShoppingBasket } from "lucide-react";
import styles from "./MyHeader.module.css";
import { Link } from "react-router-dom";

export function Header({ cart }) {
  const total = cart.reduce((acc, item) => acc + Number(item.price) * (item.quantity || 1), 0);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>
      <Link to="/cart" className={styles.link}>
        <div className={styles.cartInfo}>
          <ShoppingBasket size={32} />
          <p>
            Total: ${total.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
}