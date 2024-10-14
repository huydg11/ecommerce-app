import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Product } from '../model/product.model';

const ProductResult = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<boolean>(false);

  const location = useLocation();

  const itemNumber = location.pathname.replace('/products/', '');

  useEffect(() => {
    if (itemNumber) {
      fetch(`https://fakestoreapi.com/products/${itemNumber}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Product not found");
          }
          return res.json();
        })
        .then((json) => setProduct(json))
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError(true);
        });
    }
  }, [itemNumber]);

  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto justify-around">

      {error ? (
        <p>Product not found.</p> 
      ) : product ? (
        <div className="col max-w-4xl" key={product.id}>
          <div className="card h-100 d-flex flex-column">
            <img
              src={product.image}
              className="card-img-top object-contain h-48"
              alt={product.title}
            />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
            </div>
            <div className="card-footer">
              <h1 className="card-price">{product.price} $</h1>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default ProductResult;
