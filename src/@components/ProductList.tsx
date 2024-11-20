import React, { useEffect, useState } from 'react';
import { Product } from '../model/product.model';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((json) => setProducts(json));
    }, []);

    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="flex justify-center">

            <div className="relative mt-8">
                <i 
                    className={`fas fa-shopping-cart text-2xl ${dropdownOpen ? 'text-green-500' : 'text-black'}`}
                    onClick={toggleDropdown}
                    style={{ cursor: 'pointer' }}
                ></i>

                {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                        <h2 className="text-2xl font-bold p-4 border-b">Cart</h2>
                        <div className="max-h-64 overflow-y-auto p-4">
                            {cart.length === 0 ? (
                                <p className="text-center text-gray-500">Your cart is empty.</p>
                            ) : (
                                cart.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 border-b">
                                        <img 
                                            src={item.image} 
                                            className="w-16 h-16 object-contain"
                                            alt={item.title} 
                                        />
                                        <div className="flex-1 ml-2">
                                            <h5 className="font-bold">{item.title}</h5>
                                            <p className="text-gray-600">{item.price} $</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto justify-around">
                {products.map((product) => (
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
                                <button 
                                    className="bg-blue-500 text-white px-4 py-2 rounded" 
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
