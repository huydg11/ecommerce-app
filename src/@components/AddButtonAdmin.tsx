import React, { useState } from "react";
import { addNewProduct } from "../@services/product.service"; // Assuming the addNewProduct function is in this file

const AddButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addNewProduct(newProduct);
      setIsModalOpen(false); // Close the modal after successful product addition
      setNewProduct({ title: "", price: 0, description: "", image: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding new product", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add New Product
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newProduct.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButton;
