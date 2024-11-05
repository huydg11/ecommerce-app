// AddProductPopup.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../model/product.model';


interface AddProductPopupProps {
    onClose: () => void;
    onSubmit: (productData: Product) => void;
    existingProduct?: Product;
}

const AddProductPopup: React.FC<AddProductPopupProps> = ({ onClose, onSubmit, existingProduct }) => {
    const [productData, setProductData] = useState<Product>({
        id: 0,
        title: '',
        price: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        if (existingProduct) {
            setProductData(existingProduct);
        }
    }, [existingProduct]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(productData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="mb-4 text-lg font-semibold">
                    {existingProduct ? 'Update Product' : 'Add New Product'}
                </h3>
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Product Title"
                        value={productData.title}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        required
                    />
                    
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={productData.price}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={productData.description}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={productData.image}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        required
                    />
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        {existingProduct ? 'Update' : 'Submit'}
                    </button>
                    <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mt-2" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPopup;

