// Manage.tsx
import React, { useState } from 'react';
import '../@style/global.css';
import AddProductPopup from '../@components/AddProductPopup';
import { Product } from '../model/product.model';

function Manage(): JSX.Element {
    const [showPopup, setShowPopup] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [updateProductId, setUpdateProductId] = useState<string>(''); // Separate state for update ID
    const [deleteProductId, setDeleteProductId] = useState<string>(''); // Separate state for delete ID

    const handleAddProduct = () => {
        setCurrentProduct(null);
        setIsUpdating(false);
        setShowPopup(true);
    };

    const handleUpdateProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateProductId(e.target.value);
    };

    const handleDeleteProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteProductId(e.target.value);
    };
    const handleFetchProduct = () => {
        if (!updateProductId) return;

        fetch(`https://fakestoreapi.com/products/${updateProductId}`)
            .then(res => res.json())
            .then((product: Product) => {
                setCurrentProduct(product);
                setIsUpdating(true);
                setShowPopup(true);
            })
            .catch(error => console.error('Error fetching product:', error));
    };

    const handleDeleteProduct = () => {
        if (!deleteProductId) return;
    
        fetch(`https://fakestoreapi.com/products/${deleteProductId}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(json => {
                console.log("Product deleted:", json);
                setDeleteProductId('');
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setCurrentProduct(null);
        setUpdateProductId('');
    };

    const handleProductSubmit = (productData: Product) => {
        const updatedData = isUpdating ? { ...productData, id: currentProduct?.id } : productData;

        const url = isUpdating
            ? `https://fakestoreapi.com/products/${currentProduct?.id}`
            : 'https://fakestoreapi.com/products';

        fetch(url, {
            method: isUpdating ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container m-2 mx-auto text-center">
            <div className="flex flex-col justify-center items-center gap-8 w-fit mx-auto p-6 border border-gray-300 rounded-lg shadow-sm">
                <div>
                    <h2>Product Manage Tool 9000</h2>
                </div>
                <div className="flex flex-col gap-8">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-2xl text-center hover:bg-blue-600"
                        onClick={handleAddProduct}
                    >
                        Add a product
                    </button>

                    <div className="flex flex-col gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Enter Product ID to update"
                            value={updateProductId}
                            onChange={handleUpdateProductIdChange}
                            className="border p-2 rounded"
                        />
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded-2xl text-center hover:bg-yellow-600"
                            onClick={handleFetchProduct}
                        >
                            Update Product
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Enter Product ID to delete"
                            value={deleteProductId}
                            onChange={handleDeleteProductIdChange}
                            className="border p-2 rounded"
                        />
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-2xl text-center hover:bg-red-600"
                            onClick={handleDeleteProduct}
                        >
                            Delete Product
                        </button>
                    </div>
                </div>
            </div>

            {showPopup && (
                <AddProductPopup
                    onClose={handleClosePopup}
                    onSubmit={handleProductSubmit}
                    existingProduct={currentProduct || undefined}
                />
            )}
        </div>
    );
}

export default Manage;
