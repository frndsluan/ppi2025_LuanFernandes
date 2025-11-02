import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "./SessionContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("product")
      .select()
      .eq("is_deleted", false)
      .order("title", { ascending: true });
    if (error) setError(error.message);
    else setProducts(data);
    setLoading(false);
  }

  async function fetchCart() {
    if (!session?.user?.id) return;
    const { data, error } = await supabase
      .from("cart")
      .select("product_id, quantity, product:product_id(*)")
      .eq("user_id", session.user.id);
    if (!error && data) {
      const formatted = data
        .filter((item) => item.product?.is_deleted === false)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));
      setCart(formatted);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [session]);

  useEffect(() => {
    if (!session) {
      setCart([]);
    }
  }, [session]);

  async function refreshProducts() {
    await fetchProducts();
  }

  async function refreshCart() {
    await fetchCart();
  }

  async function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      updateQtyCart(product.id, existing.quantity + 1);
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
      if (session) {
        await supabase.from("cart").insert({
          user_id: session.user.id,
          product_id: product.id,
          quantity: 1,
        });
      }
    }
  }

  async function updateQtyCart(productId, quantity) {
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
    if (session) {
      await supabase
        .from("cart")
        .update({ quantity })
        .eq("user_id", session.user.id)
        .eq("product_id", productId);
    }
  }

  async function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    if (session) {
      await supabase
        .from("cart")
        .delete()
        .eq("user_id", session.user.id)
        .eq("product_id", productId);
    }
  }

  async function clearCart() {
    setCart([]);
    if (session) {
      await supabase.from("cart").delete().eq("user_id", session.user.id);
    }
  }

  return (
    <CartContext.Provider
      value={{
        products,
        loading,
        error,
        cart,
        addToCart,
        updateQtyCart,
        removeFromCart,
        clearCart,
        refreshProducts,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
