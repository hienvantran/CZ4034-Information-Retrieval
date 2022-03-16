import React from 'react'
import './App.css'
import { useState } from 'react';
import SearchBar from './components/SearchBar'
import Category from './components/category';

const filterPosts = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
    });
};

const posts = [
    { id: '1', name: 'This first post is about React' },
    { id: '2', name: 'This next post is about Preact' },
    { id: '3', name: 'We have yet another React post!' },
    { id: '4', name: 'This is the fourth and final post' },
];

function App() {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(posts, searchQuery);

    return (

        <div classname='main'>
            <div className='search'>
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.key}>{post.name}</li>
                ))}
            </ul>
            <>
                <Category/>
            </>
        </div>

    );
} export default App;
