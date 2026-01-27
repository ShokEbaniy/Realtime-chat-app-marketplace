import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  addProduct: async (product) => {
    if (!product.name || !product.price || !product.image) {
      return { success: false, message: "All fields are required." };
    }

    set({ loading: true, error: null });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const json = await res.json().catch(() => null); // читаем 1 раз

      if (!res.ok) {
        set({ loading: false });
        return {
          success: false,
          message: json?.message || "Add product failed",
        };
      }

      const created = json?.data ?? json;

      set((state) => ({
        products: [...state.products, created],
        loading: false,
      }));

      return { success: true, message: "Product added successfully." };
    } catch (e) {
      set({ loading: false, error: e.message });
      return { success: false, message: e.message };
    }
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("/api/products/getProducts");
      const json = await res.json();
      const products = json.data ?? json;

      set({ products: products || [], loading: false });
    } catch (e) {
      set({ products: [], loading: false, error: e.message });
    }
  },

  removeProduct: async (productId) => {
    const prevProducts = get().products;

    set({
      products: prevProducts.filter((p) => p._id !== productId),
      error: null,
    });

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        set({ products: prevProducts });
        return { success: false, message: "Delete failed" };
      }

      return { success: true };
    } catch (e) {
      set({ products: prevProducts, error: e.message });
      return { success: false, message: e.message };
    }
  },

  updateProduct: async (productId, updatedProduct) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    if (!res.ok) {
      return { success: false, message: "Update failed" };
    }
    const json = await res.json();
    const updatedData = json?.data ?? json;

    set((state) => ({
      products: state.products.map((p) =>
        p._id === productId ? updatedData : p
      ),
    }));
    return { success: true, message: "Product updated successfully." };
  },
}));
