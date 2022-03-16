import React from 'react';

const Tweets = (props) => {
    const sortMode = props.sortMode;
    const query = props.query;
    
    const posts = [
        { id: '1', name: 'This first post is about React' },
        { id: '2', name: 'This next post is about Preact' },
        { id: '3', name: 'We have yet another React post!' },
        { id: '4', name: 'This is the fourth and final post' },
    ];

    const filterPosts = (posts, query) => {
        if (!query) {
            return posts;
        }

        return posts.filter((post) => {
            const postName = post.name.toLowerCase();
            return postName.includes(query);
        });
    };

    const filteredPosts = filterPosts(posts, query);

    if (sortMode) {
        filteredPosts.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }

    return (
        <ul>
            {filteredPosts.map(post => (
                <li key={post.key}>{post.name}</li>
            ))}
        </ul>
    );
};

export default Tweets;