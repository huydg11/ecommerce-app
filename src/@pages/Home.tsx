import React, { useState } from 'react';
import Products from '../@components/ProductList';
import SearchBar from '../@components/SearchBar';
import '../@style/global.css'

function Home(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container m-2">
      <SearchBar onSearch={(term) => setSearchTerm(term)} />
      <Products searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
