import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Cart.module.css";

export function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [selectedWarranty, setSelectedWarranty] = useState("none");

  useEffect(() => {
    const initialWarranty = document.querySelector('input[name="warranty"]:checked')?.value || "none";
    setSelectedWarranty(initialWarranty);
  }, []);

  function removeAll() {
    setCart([]);
  }

  function increaseQuantity(index) {
    const updated = [...cart];
    updated[index].quantity = (updated[index].quantity || 1) + 1;
    setCart(updated);
  }

  function decreaseQuantity(index) {
    const updated = [...cart];
    if ((updated[index].quantity || 1) > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1);
    }
    setCart(updated);
  }

  function removeItem(index) {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  }

  function goBack() {
    navigate("/");
  }

  const total = cart.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  const servicePrices = {
    none: 0,
    "12": 19.99,
    "24": 39.99,
  };

  const serviceTotal = servicePrices[selectedWarranty];
  const grandTotal = total + serviceTotal;

  function formatUSD(value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  const handleWarrantyChange = (event) => {
    setSelectedWarranty(event.target.value);
  };

  return (
    <div className={styles.cartContainer}>
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <>
          <h2 className={styles.cartTitle}>🛒 PRODUCTS & SERVICES</h2>

          <div className={styles.cartItems}>
            {cart.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <img src={item.thumbnail} alt={item.title} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <p>Qty: <span>{item.quantity || 1}</span></p>
                  <p>Price: {formatUSD(Number(item.price))}</p>
                  <div className={styles.quantityControl}>
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                  <p>Total: {formatUSD(Number(item.price) * (item.quantity || 1))}</p>
                  <button
                    onClick={() => removeItem(index)}
                    className={styles.removeBtn}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={removeAll} className={styles.removeAllBtn}>
            REMOVE ALL PRODUCTS
          </button>

          <div className={styles.services}>
            <h3>SERVICES</h3>
            <div className={styles.serviceOptions}>
              <label>
                <input
                  type="radio"
                  name="warranty"
                  value="none"
                  checked={selectedWarranty === "none"}
                  onChange={handleWarrantyChange}
                /> 
                No warranty - $0.00
              </label>
              <label>
                <input
                  type="radio"
                  name="warranty"
                  value="12"
                  checked={selectedWarranty === "12"}
                  onChange={handleWarrantyChange}
                /> 
                12 Months Extended Warranty - $19.99
              </label>
              <label>
                <input
                  type="radio"
                  name="warranty"
                  value="24"
                  checked={selectedWarranty === "24"}
                  onChange={handleWarrantyChange}
                /> 
                24 Months Extended Warranty - $39.99
              </label>
            </div>
            <p className={styles.serviceTotal}>Subtotal services: {formatUSD(serviceTotal)}</p>
          </div>

          <div className={styles.summaryBox}>
            <h3>SUMMARY</h3>
            <p>Products Value: {formatUSD(total)}</p>
            <p>Total: {formatUSD(grandTotal)} (in up to 10x of {formatUSD(grandTotal / 10)} without interest)</p>
            <p>Cash Price: {formatUSD(grandTotal)}</p>
            <button className={styles.continueBtn}>CONTINUE</button>
            <button onClick={goBack} className={styles.backBtn}>
              BACK
            </button>
          </div>
        </>
      )}
    </div>
  );
}