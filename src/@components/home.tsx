import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home(): JSX.Element {
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };

  return (
    <div>
      <a href="/products">List All Products</a>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <label htmlFor="productId">Enter Product ID:</label>
        <input
          type="text"
          id="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID"
        />
        <button type="submit">Show Product</button>
      </form>
    </div>
  );
}

export default Home;
