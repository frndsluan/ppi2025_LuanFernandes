import styles from "./ProductForm.module.css";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useContext(CartContext);

  const editing = id && id !== "new";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (editing) {
      const product = products.find(p => p.id == id);
      if (product) {
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setThumbnail(product.thumbnail);
      }
    }
  }, [id, products]);

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      id: editing ? Number(id) : Date.now(),
      title,
      description,
      price,
      thumbnail
    };

    if (editing) {
      updateProduct(newProduct);
    } else {
      addProduct(newProduct);
    }

    navigate("/manage-products");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label>Price</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label>Image (URL)</label>
          <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} required />
        </div>

        {thumbnail && (
          <div className={styles.imagePreview}>
            <img src={thumbnail} alt="Preview" />
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>
            {editing ? "Update" : "Save"}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate("/manage-products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
