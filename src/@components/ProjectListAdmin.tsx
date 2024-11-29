import React, { useEffect, useState } from "react";
import { getAllProducts, searchProductByName } from "../@services/product.service";
import { Product } from "../model/product.model";
import ProjectItemAdmin from "./ProductItemAdmin";

interface ProductsProps {
  searchTerm: string;
}

function ProductsManage({ searchTerm }: ProductsProps): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (searchTerm) {
      searchProductByName(searchTerm)
        .then((json) => {
          setProducts(json);
          setError(false);
        })
        .catch(() => {
          setError(true);
          setProducts([]);
        })
        .finally(() => setLoading(false));
    } else {
      getAllProducts()
        .then((json) => {
          setProducts(json);
          setError(false);
        })
        .catch(() => {
          setError(true);
          setProducts([]);
        })
        .finally(() => setLoading(false));
    }
  }, [searchTerm]);

  return (
    <div className="flex justify-center">
      <div className="w-full">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Product not found.</p>
        ) : (  
          <ProjectItemAdmin products={products} setProducts={setProducts}  />
        )}
      </div>
    </div>
  );
}

export default ProductsManage;
