import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Product } from '../model/product.model';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((json) => setProducts(json));
    }, []);

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto justify-around">
                {products.map((product) => (
                    <div className="col max-w-xs" key={product.id}>
                        <Link to={`/products/${product.id}`} className="no-underline">
                            <div className="card h-100 d-flex flex-col">
                                <img
                                    src={product.image}
                                    className="card-img-top object-contain h-48"
                                    alt={product.title}
                                />
                                <div className="card-body flex-grow">
                                    <h5 className="card-title font-bold text-xl">{product.title}</h5>
                                    <p className="card-text truncation">{product.description}</p>
                                </div>
                                <div className="card-footer">
                                    <h1 className="card-price">{product.price} $</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
