// src/components/Product.jsx
import styles from "./Product.module.css";

export function Product({ thumbnail, title, description, price }) {
  return (
    <div className={styles.productCard}>
      <img src={thumbnail} alt={title} className={styles.productImage} />
      <h2 className={styles.productTitle}>{title}</h2>
      <p className={styles.productDescription}>{description}</p>
      <p className={styles.productPrice}>${price}</p>
      <button className={styles.addButton}>Adicionar ao Carrinho</button>
    </div>
  );
}
