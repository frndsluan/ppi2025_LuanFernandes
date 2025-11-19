import { useContext, useState, useEffect } from "react";
import styles from "./User.module.css";
import { SessionContext } from "../context/SessionContext";
import { CartContext } from "../context/CartContext";
import { supabase } from "../utils/supabase";

export function User() {
  const { session, handleSignOut } = useContext(SessionContext);
  const { products, loading, error, refreshProducts, refreshCart } =
    useContext(CartContext);

  const [adminProducts, setAdminProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  const isAdmin = session?.user?.user_metadata?.admin;

  async function fetchAdminProducts() {
    const { data } = await supabase
      .from("product")
      .select()
      .eq("is_deleted", false)
      .order("title", { ascending: true });
    setAdminProducts(data || []);
  }

  useEffect(() => {
    if (isAdmin) {
      fetchAdminProducts();
    }
  }, [isAdmin]);

  async function handleDelete(id) {
    await supabase.from("product").update({ is_deleted: true }).eq("id", id);
    await refreshProducts();
    await refreshCart();
    if (isAdmin) {
      await fetchAdminProducts();
    }
  }

  async function handleUpdate(id) {
    await supabase
      .from("product")
      .update({
        title: editingProduct.title,
        description: editingProduct.description,
        price: parseFloat(editingProduct.price),
        thumbnail: editingProduct.thumbnail,
      })
      .eq("id", id);
    setEditingProduct(null);
    await refreshProducts();
    await refreshCart();
    if (isAdmin) {
      await fetchAdminProducts();
    }
  }

  async function handleInsert() {
    await supabase.from("product").insert({
      title: newProduct.title,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      thumbnail: newProduct.thumbnail,
      is_deleted: false,
    });
    setNewProduct({ title: "", description: "", price: "", thumbnail: "" });
    await refreshProducts();
    if (isAdmin) {
      await fetchAdminProducts();
    }
  }

  const visibleProducts = isAdmin ? adminProducts : products;

  return (
    <div className={styles.container}>
      {session ? (
        <>
          <h1>{isAdmin ? "Admin Account" : "User Account"}</h1>
          <div className={styles.userInfo}>
            <p>
              <strong>Username:</strong> {session.user.user_metadata.username}
            </p>
            <p>
              <strong>Email:</strong> {session.user.email}
            </p>
            <p>
              <strong>ID:</strong> {session.user.id}
            </p>
          </div>
          <button className={styles.button} onClick={handleSignOut}>
            SIGN OUT
          </button>

          {isAdmin && (
            <div className={styles.adminPanel}>
              <h2>Admin Panel</h2>

              <h3>Insert New Product</h3>
              <div className={styles.form}>
                <input
                  type="text"
                  placeholder="Title"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Thumbnail URL"
                  value={newProduct.thumbnail}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      thumbnail: e.target.value,
                    })
                  }
                />
                <button onClick={handleInsert}>ADD PRODUCT</button>
              </div>

              <h3>Manage Products</h3>
              {loading && <p>Loading products...</p>}
              {error && <p>❌ {error}</p>}
              {visibleProducts.map((product) => (
                <div key={product.id} className={styles.productItem}>
                  {editingProduct?.id === product.id ? (
                    <>
                      <input
                        type="text"
                        value={editingProduct.title}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editingProduct.thumbnail}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            thumbnail: e.target.value,
                          })
                        }
                      />
                      <button onClick={() => handleUpdate(product.id)}>
                        SAVE
                      </button>
                      <button onClick={() => setEditingProduct(null)}>
                        CANCEL
                      </button>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>{product.title}</strong> - ${product.price}
                      </p>
                      <button onClick={() => setEditingProduct(product)}>
                        EDIT
                      </button>
                      <button onClick={() => handleDelete(product.id)}>
                        DELETE
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <h1>User not signed in!</h1>
      )}
    </div>
  );
}