import React, { useState, useCallback, } from 'react';
import { Grid } from 'semantic-ui-react';
import './styles/App.css'

import { getSearch } from './apis/getSearch';
import SearchBar from './components/SearchBar'
import Category from './components/Category';
import Sort from './components/Sort';
import Tweets from './components/Tweets';
import UpdateTwt from './components/UpdateTwt';


function App() {
    const [tweets, setTweets] = useState([]);
    const [numTweets, setnumTweets] = useState(0);
    const [spellcheck, setspellcheck] = useState('');

    const onSearchSubmit = useCallback(async term => {
        const tweetsArray = await getSearch(term.toLowerCase());
        setnumTweets(tweetsArray.response.numFound);
        setTweets(tweetsArray.response.docs);
        console.log("check suggestion");
        console.log(tweetsArray.spellcheck.suggestions[1]);
        let spell = '';

        if (typeof tweetsArray.spellcheck.suggestions[1] !== 'undefined')
        {
            for (let i = 0, len = tweetsArray.spellcheck.suggestions[1].suggestion.length, maxFreq = 0; i < len; i++) {
            
            if (maxFreq < tweetsArray.spellcheck.suggestions[1].suggestion[i].freq)
            {
                maxFreq = tweetsArray.spellcheck.suggestions[1].suggestion[i].freq;
                spell = tweetsArray.spellcheck.suggestions[1].suggestion[i].word;
            }
            
        }}
        console.log("this is a spellcheck " + spell);
        setspellcheck(spell);
    });

    const clearResults = useCallback(() => setTweets([]));

    const renderedTweets = tweets.map((tweet, i) => {
        return <Tweets tweet={tweet} key={i} />
    })
    const spellCheckSection = spellcheck !== '' ? <div>Do you mean {spellcheck}?</div> : <></>;

    return (
        <div className='main'>
            <SearchBar onSearchSubmit={onSearchSubmit} clearResults={clearResults} />
            <div>{spellCheckSection}</div>
            <Grid container spacing={2} columns={16}>
                <Grid.Column width={3}>
                    <Category onSearchSubmit={onSearchSubmit} clearResults={clearResults} />
                </Grid.Column>
                <Grid.Column width={10} className='main-content'>
                    <div>There are total of {numTweets} results</div>
                    {renderedTweets}
                </Grid.Column>
                <Grid.Column width={3} >
                    <Sort />
                    <UpdateTwt />
                </Grid.Column>
            </Grid>
           
           
            
            
            
        </div>
    );
}
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
export default App;
