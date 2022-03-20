import React from 'react';
import { Label, Card, Icon } from 'semantic-ui-react'

import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";


import '../styles/tweets.css'
const Tweets = ({ tweet }) => {
    return (
        <div className='tweet-container'>
            <div style={{ padding: 20 }}>
                
                <Card key={tweet.tweet_id} style={{ width: '100%' }}>
                    <Card.Content>
                        <Card.Header>{tweet.username}</Card.Header>
                            <Card.Description>
                            {tweet.text}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Label>
                            <RepeatIcon fontSize="small" />
                            Sentiment
                        </Label>
                        <Label>
                            <RepeatIcon fontSize="small" />
                            {tweet.retweet_count}
                        </Label>
                        <Label>
                            <FavoriteBorderIcon fontSize="small" />
                            {tweet.like_count}
                        </Label>
                    </Card.Content>
                    <div className="post__footer">
                        <div>
                            <Icon name="calendar check outline" />
                            {tweet.creation_date_time}
                        </div>
                        <div>Tweet id: {tweet.tweet_id}</div>
                        
                    </div>
                    
                </Card>
                
            </div>
            
        </div>
    );
};

export default Tweets;