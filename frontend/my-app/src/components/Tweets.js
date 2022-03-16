import React from 'react';

const Tweets = (props) => {
    const mode = props.mode;
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

    return (
        <ul>
            {filteredPosts.map(post => (
                <li key={post.key}>{post.name}</li>
            ))}
        </ul>
    );
};

export default Tweets;