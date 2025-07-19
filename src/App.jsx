import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/MyHeader";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Cart } from "./components/Cart";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity =
          (updatedCart[existingProductIndex].quantity || 1) + 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  );
}