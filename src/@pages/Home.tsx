import React from 'react';
import Products from '../@components/ProductList';
import '../@style/global.css'

function Home(): JSX.Element {


  return (
    <div className="container m-2">
    
    <Products />
     
    </div>
  );
}

export default Home;
