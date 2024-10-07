import React, { useEffect, useState } from 'react';

import { Product } from '../model/product.model';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((json) => setProducts(json));
    }, []);

    return (
        <div>
            <h1>Product</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <img src={product.image} alt={product.title} style={{ width: '100px' }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
