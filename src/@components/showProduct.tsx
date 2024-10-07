import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Product } from '../model/product.model';

const ProductResult = () => {
  const [product, setProduct] = useState<Product | null>(null);

  const location = useLocation();

  const ItemNumber = location.pathname.replace('/products/', '');

  useEffect(() => {
  if (ItemNumber) {
    fetch(`https://fakestoreapi.com/products/${ItemNumber}`)
      .then((res) => res.json())
      .then((json) => setProduct(json))
      .catch((err) => console.error("Error fetching product:", err));
  }
}, [ItemNumber]);

  return (
    <div>
      <h1>Product</h1>
      {product ? (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img src={product.image} alt={product.title} style={{ width: '100px' }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductResult;
