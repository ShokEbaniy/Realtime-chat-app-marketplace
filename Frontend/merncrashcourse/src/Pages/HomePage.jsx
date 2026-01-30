import React, { useEffect } from "react";
import ProductCard from "../Components/ProductCard.jsx";
import { useProductStore } from "../store/product";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const removeProduct = useProductStore((s) => s.removeProduct);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="container mx-auto max-w-7xl px-4 mt-4 md:mt-8 pb-28 md:pb-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        товары
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-base-content/60 text-lg">
          товаров нет{" "}
          <NavLink
            to="/create"
            className="text-primary font-semibold hover:underline"
          >
            создать?
          </NavLink>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              removeProduct={removeProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
