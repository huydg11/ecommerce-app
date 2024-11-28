import React, { useState } from "react";
import { Product } from "../model/product.model";
import { updateProductById, deleteProductById } from "../@services/product.service"

interface ProjectItemAdminProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProjectItemAdmin: React.FC<ProjectItemAdminProps> = ({
  products,
  setProducts,
}) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const handleUpdate = async (id: number) => {
    const productToUpdate = products.find((product) => product.id === id);
    if (productToUpdate) {
      setSelectedProduct(productToUpdate);
      setUpdateModalOpen(true);
    }
  };

  const handleUpdateSubmit = async (updatedData: {
    title: string;
    price: number;
    description: string;
    image: string;
  }) => {
    if (selectedProduct) {
      try {
        const updatedProduct = await updateProductById(selectedProduct.id, updatedData);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id ? { ...product, ...updatedProduct } : product
          )
        );
        setUpdateModalOpen(false);
        setSelectedProduct(null);
        console.log("Product updated successfully:", updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleDelete = (id: number) => {
    setConfirmDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete !== null) {
      try {
        await deleteProductById(confirmDelete);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== confirmDelete)
        );
        setConfirmDelete(null);
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  return (
    <div>
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-1/6">ID</th>
            <th className="border border-gray-300 px-4 py-2 w-1/6">Image</th>
            <th className="border border-gray-300 px-4 py-2 w-1/6">Title</th>
            <th className="border border-gray-300 px-4 py-2 w-1/6">Description</th>
            <th className="border border-gray-300 px-4 py-2 w-1/6">Price</th>
            <th className="border border-gray-300 px-4 py-2 w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-16 w-16 object-contain"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 font-bold">
                {product.title}
              </td>
              <td className="border border-gray-300 px-4 py-2" style={{ whiteSpace: "pre-wrap" }}>
                {product.description || "No description available"}
              </td>
              <td className="border border-gray-300 px-4 py-2">{product.price} $</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  onClick={() => handleUpdate(product.id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {isUpdateModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Update Product</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedData = {
                  title: (e.target as any).title.value,
                  price: parseFloat((e.target as any).price.value),
                  description: (e.target as any).description.value,
                  image: (e.target as any).image.value,
                };
                handleUpdateSubmit(updatedData);
              }}
            >
              <div className="mb-2">
                <label className="block">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedProduct.title}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedProduct.price}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedProduct.description}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedProduct.image}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setUpdateModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectItemAdmin;
