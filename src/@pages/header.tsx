import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Poop.png'
import SearchBar from '../@components/SearchBar';


function Header(): JSX.Element {


    return (

        <header className="p-3 mb-3 border-bottom">
            <div className="container m-2">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">

                        <img src={Logo} alt="logo" width="40" height="32" className="bi me-2" />
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="#" className="nav-link px-2 link-secondary">Overview</a></li>
                        <li><a href="#" className="nav-link px-2 link-body-emphasis">Inventory</a></li>
                        <li><a href="#" className="nav-link px-2 link-body-emphasis">Customers</a></li>
                        <li><a href="#" className="nav-link px-2 link-body-emphasis">Products</a></li>
                    </ul>

                    <SearchBar/>

                    <div className="dropdown text-end">
                        <a href="#" className="flex items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;