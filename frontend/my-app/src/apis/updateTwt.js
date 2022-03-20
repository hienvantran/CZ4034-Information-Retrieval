import _ from 'lodash';

export const updateTwt = _.memoize(async () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{
            "tweet_id": 1.50289E+18,
            "user_id": 1.45505E+18,
            "username": "AndrewTRei1",
            "text": "I will correctly remind people yet again that the only country's vaccine that's worse than China's is Russia's Sputnik vaccine",
            "like_count": 2,
            "retweet_count": 1,
            "location": "No location",
            "creation_date_time": "2008-01-01T00:00:00Z"

        }])
    };
    const res = await fetch(`http://localhost:8983/solr/CZ4034/update/json?commit=true`, requestOptions);
    
    if (res.status !== 200) return [];
    const tweetsArray = await res.json();
    console.log("this is result: " + JSON.stringify(tweetsArray.response.docs));
    return (tweetsArray.response.docs);
});
