import { useState, useEffect } from "react";
import styles from "./ProductList.module.css";
import { Product } from "./Product";
import { CircularProgress } from "@mui/material";

export function ProductList() {
  var category = "smartphones";
  var limit = 10;
  var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,brand,title,price,description`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>TJA Megastore 🛒</h1>
      {products.map((product) => (
        <Product
          key={product.id}
          thumbnail={product.thumbnail}
          title={product.title}
          description={product.description}
          price={product.price}
        />
      ))}
      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{ color: "#001111" }}
          />
          <p>Loading products...</p>
        </div>
      )}
      {error && <p>Error loading products: {error} ❌</p>}
    </div>
  );
}
