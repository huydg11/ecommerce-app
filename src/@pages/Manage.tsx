// Manage.tsx
import React, { useState } from 'react';
import ProductsListAdmin from '../@components/ProjectListAdmin';
import SearchBar from '../@components/SearchBar';
import AddButton from '../@components/AddButtonAdmin';
import '../@style/global.css';

function Manage(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        
        <div className="container m-2">
            <SearchBar onSearch={(term) => setSearchTerm(term)} />
            <AddButton/>   
            <ProductsListAdmin searchTerm={searchTerm} />
        </div>
    );

}

export default Manage;
