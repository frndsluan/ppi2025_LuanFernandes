import styles from "./Product.module.css";

export function Product({ product, addToCart }) {
  return (

    <div key={product.id} className={styles.productCard}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className={styles.productButton}
      >
        ADD TO CART
      </button>
    </div>
  );
}
