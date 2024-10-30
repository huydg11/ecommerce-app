import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function SearchBar(): JSX.Element {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();

      if (searchTerm) {
          navigate(`/products/search?name=${searchTerm}`);
      }
  };

  return (
      <form onSubmit={handleSubmit} className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input id="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="form-control" placeholder="Search..." aria-label="Search" />
      </form>
  );
}

export default SearchBar;
