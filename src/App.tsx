import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './@components/showallProduct';
import Home from './@components/home';
import ProductResult from './@components/showProduct';


function App() {

  const routes = [
    { path: '/', element: <Home /> },
    { path: '/products', element: <Products /> },
    { path: '/products/:productId', element: <ProductResult /> },

  ];

  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route
            key={index}
            path={path}
            element={element}  
          />
        ))}
        
        <Route
          path="*"
          element={<div>Page Not Found</div>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
