import React, { useState } from 'react';


interface SearchBarProps {
    onSearch: (term: string) => void;
}


function SearchBar({ onSearch }: SearchBarProps): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={handleFormSubmit}>
            <input
                id="searchTerm"
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                value={searchTerm}
                onChange={handleInputChange}
            />
        </form>
    );
}

export default SearchBar;
