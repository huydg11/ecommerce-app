import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './@components/ProductList';
import Home from './@pages/Home';
import ProductResult from './@components/ProductItem';
import Layout from './Layout';
import Manage from './@pages/Manage';


function App() {

  const routes = [
    { path: '/', element: <Home /> },
    { path: '/products', element: <Products /> },
    { path: '/products/search', element: <ProductResult /> },
    {path: '/admin/manage', element: <Manage/>}

  ];

  return (
    <Router>
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <Layout>
              {element}
            </Layout>
          }
        />
      ))}
      <Route
        path="*"
        element={
          <Layout>
            <h1>Error</h1>
          </Layout>
        }
      />
    </Routes>
  </Router>
  );
}

export default App;
