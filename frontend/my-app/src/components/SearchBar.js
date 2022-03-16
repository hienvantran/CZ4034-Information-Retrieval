import React, { useState } from 'react'


const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <form action="/" method="get">
    <label htmlFor="header-search">
      <span className="visually-hidden">Search blog posts</span>
    </label>
    <input
      value={searchQuery}
      onInput={e => setSearchQuery(e.target.value)}
      type="text"
      id="header-search"
      placeholder="Search tweets..."
      name="s"
    />
    <button className = "search-button" type="submit" title="Search">🔎</button>
  </form>
);

export default SearchBar;