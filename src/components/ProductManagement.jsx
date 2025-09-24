import styles from "./ProductManagement.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export function ProductManagement() {
  const { products, deleteProduct } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <h2>Manage Products</h2>
      <Link to="/product-form/new" className={styles.addButton}>
        Add New Product
      </Link>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.productImage}
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <div className={styles.actions}>
              <Link
                to={`/product-form/edit/${product.id}`}
                className={styles.editButton}
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(product.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}