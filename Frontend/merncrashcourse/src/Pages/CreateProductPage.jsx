import React from "react";
import { useState } from "react";
import { useProductStore } from "../store/product.js";
import toast from "react-hot-toast";

const CreateProductPage = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    image: "",
  });
  
  const addProduct = useProductStore((state) => state.addProduct);

  const handleAddProduct = async () => {
    const { success, message } = await addProduct(productDetails);
    if (success) {
      toast.success(message || "товар создан");
      setProductDetails({ name: "", price: "", image: "" });
    } else {
      toast.error(message || "ошибка при создании");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 mt-8 pb-28 md:pb-8">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center justify-center mb-6">
            создать товар
          </h2>
          
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">название</span>
              </label>
              <input
                type="text"
                placeholder="введи название"
                className="input input-bordered w-full focus:input-primary"
                value={productDetails.name}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, name: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">цена</span>
              </label>
              <input
                type="number"
                placeholder="цена в тенге"
                className="input input-bordered w-full focus:input-primary"
                value={productDetails.price}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, price: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">картинка</span>
              </label>
              <input
                type="text"
                placeholder="ссылка на фото"
                className="input input-bordered w-full focus:input-primary"
                value={productDetails.image}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, image: e.target.value })
                }
              />
            </div>

            <button
              onClick={handleAddProduct}
              className="btn btn-primary w-full mt-4"
            >
              создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
