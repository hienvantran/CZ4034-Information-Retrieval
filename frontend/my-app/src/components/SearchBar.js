import React, { useEffect, useState } from 'react';
import '../styles/searchBar.css'

const SearchBar = ({ onSearchSubmit, clearResults }) => {
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);

    // update 'term' value after 1 second from the last update of 'debouncedTerm'
    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), 1000);
        return () => clearTimeout(timer);
    }, [debouncedTerm])

    // submit a new search
    useEffect(() => {
        if (term !== '') {
            onSearchSubmit(term);
        }
        else {
            clearResults();
            setTerm('*:*');
            onSearchSubmit(term);
        }
    }, [term]);

    return (
        <div className='search'>
            <input
                className='searchbar-input'
                type='text'
                placeholder="Search tweets . . ."
                onChange={e => setDebouncedTerm(e.target.value)}
                value={debouncedTerm} />
            <button className="search-button" type="submit" title="Search">🔎</button>
        </div>
    );
};

export default SearchBar;