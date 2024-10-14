import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function SearchBar(): JSX.Element {

    const [productId, setProductId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        if (productId) {
          navigate(`/products/${productId}`);
        }
      };

    return (
        <form onSubmit={handleSubmit} className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input id="searchTerm" value={productId} onChange={(e) => setProductId(e.target.value)} type="text" className="form-control" placeholder="Search..." aria-label="Search" />
        </form>
    );
}

export default SearchBar;
