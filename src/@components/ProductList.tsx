import React, { useEffect, useState } from 'react';
import { Product } from '../model/product.model';
import Pagination from './Pagination';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((json) => setProducts(json));
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto justify-around">
                {currentProducts.map((product) => (
                    <div className="col max-w-xs" key={product.id}>
                        <div className="card h-100 d-flex flex-column">
                            <img
                                src={product.image}
                                className="card-img-top object-contain h-48"
                                alt={product.title}
                            />
                            <div className="card-body flex-grow-1">
                                <h5 className="card-title font-bold text-xl">{product.title}</h5>
                                <p className="card-text trucation">{product.description}</p>
                            </div>
                            <div className="card-footer">
                                <h1 className="card-price">{product.price} $</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
        </div>
    );
};

export default Products;
