import React, { useEffect, useState } from 'react';
import { getAllProducts, searchProductByName } from '../@services/product.service';
import { Product } from '../model/product.model';

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
                        <div className="col max-w-xs" key={product.id}>
                            <div className="card h-100 d-flex flex-column">
                                <img
                                    src={product.image}
                                    className="card-img-top object-contain h-48"
                                    alt={product.title}
                                />
                                <div className="card-body flex-grow-1">
                                    <h5 className="card-title font-bold text-xl">{product.title}</h5>
                                    <p className="card-text truncate">{product.description}</p>
                                </div>
                                <div className="card-footer">
                                    <h1 className="card-price">{product.price} $</h1>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Products;
