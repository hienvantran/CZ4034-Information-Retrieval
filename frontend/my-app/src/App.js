import React from 'react'
import './App.css'
import { useState } from 'react';
import SearchBar from './components/SearchBar'
import Category from './components/Category';
import Sort from './components/Sort';
import Tweets from './components/Tweets';


function App() {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');

    return (
        <div classname='main'>
            <div className='search'>
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>
                <Tweets
                    sortMode={0}
                    query={searchQuery}
                />
            <>
                <Category/>
            </>
            <>
                <Sort/>
            </>
        </div>
    );
}

export default App;
