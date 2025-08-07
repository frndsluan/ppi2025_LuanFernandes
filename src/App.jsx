import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/MyHeader";
import { Route, Routes } from "react-router-dom";
import { Cart } from "./components/Cart";
import { CartProvider } from "./service/CartContext";
import { ProductManagement } from "./components/ProductManagement";
import { ProductForm } from "./components/ProductForm";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export default function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/manage-products" element={<ProductManagement />} />
        <Route path="/product-form/new" element={<ProductForm />} />
        <Route path="/product-form/edit/:id" element={<ProductForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </CartProvider>
  );
}