import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProductById } from '../@services/product.service';
import { Product } from '../model/product.model';

const ProductDetail = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<boolean>(false);

    const location = useLocation();
    const ProductID = location.pathname.split("/").pop();

    useEffect(() => {
        if (ProductID) {
            searchProductById(ProductID)
                .then((json) => {
                    setProduct(json);
                    setError(false);
                })
                .catch(() => {
                    setError(true);
                    setProduct(null);
                });
        }
    }, [ProductID]);

    return (
        <div className="flex rounded-2xl border border-gray-400 m-12 justify-center">
            {error ? (
                <p>Product not found.</p>
            ) : product ? (
                <div className="flex flex-col items-center p-12 gap-7">
                    <img
                        src={product.image}
                        className="object-contain h-48"
                        alt={product.title}
                    />
                    <div className="card-body flex flex-col items-center text-center gap-3">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                    </div>
                    <div className="card-footer mt-4">
                        <h1 className="card-price text-xl font-bold">{product.price} $</h1>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetail;
