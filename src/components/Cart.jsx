import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";
import { Trash, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, updateQtyCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <Link to="/" className={styles.backButton}>
            <ArrowLeft size={20} /> Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className={styles.cartItems}>
            {cart.map((product, index) => (
              <li key={index} className={styles.cartItem}>
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemDetails}>
                  <h3 className={styles.cartItemTitle}>{product.title}</h3>
                  <p className={styles.cartItemPrice}>${product.price.toFixed(2)}</p>
                  
                  <div className={styles.quantityControls}>
                    <button
                      disabled={product.quantity <= 1}
                      onClick={() =>
                        updateQtyCart(product.id, product.quantity - 1)
                      }
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>{product.quantity}</span>
                    <button
                      onClick={() =>
                        updateQtyCart(product.id, product.quantity + 1)
                      }
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => removeFromCart(product.id)}
                  className={styles.removeButton}
                >
                  <Trash />
                </button>
              </li>
            ))}
          </ul>
          
          <div className={styles.cartSummary}>
            <p className={styles.cartTotal}>
              Total: ${" "}
              {cart
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </p>
            
            <div className={styles.cartActions}>
              <button 
                onClick={clearCart} 
                className={styles.clearButton}
              >
                CLEAR CART <Trash />
              </button>
              
              <Link to="/" className={styles.continueShopping}>
                <ArrowLeft size={20} /> Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}