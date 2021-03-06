import React, { useState, useCallback, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import './styles/App.css'

import { getSearch } from './apis/getSearch';
import SearchBar from './components/SearchBar'
import Category from './components/category';
import Filter from './components/filter';
import Sort from './components/Sort';
import Tweets from './components/Tweets';
import Visualization from './components/visualization';
import UpdateTwt from './components/UpdateTwt';


function App() {
    const [loading, setLoading] = useState(false);
    const [tweets, setTweets] = useState([]);
    const [numTweets, setnumTweets] = useState(0);
    const [spellcheck, setspellcheck] = useState('');

    const [searchTerm, setsearchTerm] = useState('*:*');
    const [catTerm, setcatTerm] = useState('');
    const [sort, setSort] = useState('');

    const [filterFlag, setfilterFlag] = useState(false);
    const [filter, setFilter] = useState('');
    const [filterTweets, setFilterTweets] = useState([]);

    const [updateIndex, setupdateIndex] = useState([]);
    const [visualizeTab, setVisualizeTab] = useState(false);
    const [term, setTerm] = useState('*:*');

    const handleOnChange = () => {
        setVisualizeTab(!visualizeTab);
    };

    const onSearchSubmit = useCallback(async () => {
        setfilterFlag(false);
        let query = searchTerm + ' ' + catTerm;

        
        if (query === ' ' || query === '')  query = '*:*';
        console.log("new query ", query.toLowerCase());
        setTerm(query);
        let params = {
            'term': query.toLowerCase(),
            'sort': sort
        };
        const tweetsArray = await getSearch(params);
        setnumTweets(tweetsArray.response.numFound);
        setTweets(tweetsArray.response.docs);

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

        setspellcheck(spell);
    }, [catTerm, sort, searchTerm],
    );

    const clearResults = useCallback(() => setTweets([]));

    useEffect(() => {
        console.log("use Effect " + updateIndex);
        for (let index in updateIndex) {
            fetch('/update/' + index).then(res => {
                res.json();
                setLoading(false);
                window.location.reload(false);
            }).catch(error => {
                setLoading(false);
                console.log(error)
            });
        }
    }, [updateIndex]);

    useEffect(() => {
        console.log("use Effect " + loading);
        setLoading(loading);
        
    }, [loading]);

    useEffect(() => {
        setSort(sort);
        console.log("use Effect " + sort);
        onSearchSubmit();
    }, [sort])

    useEffect(() => {
        console.log("use Effect " + catTerm);
        setcatTerm(catTerm);
        onSearchSubmit();
    }, [catTerm])

    useEffect(() => {
        console.log("use Effect " + searchTerm);
        setsearchTerm(searchTerm);
        onSearchSubmit();
    }, [searchTerm])

    useEffect(() => {
        console.log("use Effect " + filter);
        console.log(filterFlag)
        setFilter(filter);
        console.log(tweets.filter((tweet, i) => tweet.sentiment[0] === filter))
        setFilterTweets(tweets.filter((tweet, i) => tweet.sentiment[0] === filter));
        // onSearchSubmit();
    }, [filter])

    
    const renderedTweets = tweets.map((tweet, i) => {
        return <Tweets tweet={tweet} key={i} />
    })

    const renderedFilterTweets = filterTweets.map((tweet, i) => {
        return <Tweets tweet={tweet} key={i} />
    })


    const spellCheckSection = spellcheck !== '' ? <div>Do you mean {spellcheck}?</div> : <></>;
    

    return (
        <div className='main'>
            <SearchBar onSearchSubmit={setsearchTerm} clearResults={clearResults} />
            <div>{spellCheckSection}</div>
            <Grid container spacing={2} columns={16}>
                <Grid.Column width={3}>
                    <Category clearResults={clearResults} onCatSubmitted={setcatTerm} />
                    <Filter flag={filterFlag} onFlag={setfilterFlag} onFilterSubmit={setFilter} />
                </Grid.Column>
                <Grid.Column width={10} className='main-content'>
                    <span style={{ fontWeight: 'bold' }}>There are total of {numTweets} results - <em style={{ fontWeight: 'lighter' }}>Visualize by checking the checkbox</em></span>
                    
                    <input type="checkbox" id="general" name="general" value="General" checked={visualizeTab} onChange={() => handleOnChange()} style={{ float: 'right' }} ></input>
                    
                    {(!visualizeTab) ? (loading? <div>Loading...</div>:((!filterFlag) ? renderedTweets : renderedFilterTweets) ) : <Visualization term={term} />} 
                </Grid.Column>
                <Grid.Column width={3} >
                    <Sort clearResults={clearResults} onSortSubmitted={setSort} />
                    <br />
                    <UpdateTwt onUpdateTweets={setupdateIndex} onLoading={setLoading}/>
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
