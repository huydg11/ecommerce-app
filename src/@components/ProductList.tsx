import React, { useEffect, useState } from 'react';
import { getAllProducts, searchProductByName } from '../@services/product.service';
import { Product } from '../model/product.model';
import ProjectItem from './ProductItem';

interface ProductsProps {
    searchTerm: string;
}

function Products({ searchTerm }: ProductsProps): JSX.Element {
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto justify-around">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Product not found.</p>
                ) : (
                    products.map((product) => (
                        <ProjectItem key={product.id} product={product}/>
                    ))
                )}
            </div>
        </div>
    );
}

export default Products;
