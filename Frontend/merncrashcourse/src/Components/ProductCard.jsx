import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useProductStore } from "../store/product";
import toast from "react-hot-toast";

const ProductCard = ({ product, removeProduct }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = React.useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleUpdate = async () => {
    setIsModalOpen(false);
    const updated = await updateProduct(
      product._id || product.id,
      updatedProduct
    );
    if (updated.success) {
      toast.success("товар обновлен");
    } else {
      toast.error(updated.message || "ошибка обновления");
    }
  };

  const handleDelete = async () => {
    const removed = await removeProduct(product._id || product.id);
    if (removed.success) {
      toast.success(`товар ${product.name} удален`);
    } else {
      toast.error(removed.message || "ошибка удаления");
    }
  };

  return (
    <>
      <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
        <div className="card-body">
          <p className="text-sm text-base-content/40 truncate">
            {product.image}
          </p>
          <h2 className="card-title">{product.name}</h2>
          <p className="text-lg font-semibold text-primary">{product.price} ₸</p>

          <div className="card-actions justify-end mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-sm btn-ghost"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-error"
            >
              <FaRegTrashCan />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">редактировать товар</h3>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">название</span>
                </label>
                <input
                  type="text"
                  placeholder="название товара"
                  className="input input-bordered focus:input-primary"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
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
                  className="input input-bordered focus:input-primary"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
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
                  className="input input-bordered focus:input-primary"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="modal-action">
              <button onClick={handleUpdate} className="btn btn-primary">
                сохранить
              </button>
              <button onClick={() => setIsModalOpen(false)} className="btn">
                отмена
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default ProductCard;
