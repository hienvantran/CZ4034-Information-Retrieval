import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Visualization = ({term}) => {
    const [tweets, setTweets] = useState([]);
    // const [noPos, setnoPos] = useState(0);
    // const [noNeg, setnoNeg] = useState(0);
    // const [noNeu, setnoNeu] = useState(0);

    const [sentiment, setSentiment] = useState({
        noPos: 0,
        noNeu: 0,
        noNeg: 0,
    });
    
    
    
    useEffect(() => {
        
        if (term !== '') {
            const onSearchSubmit = async () => {
                const res = await fetch(`http://localhost:8983/solr/CZ4034/spell?debugQuery=true&df=text&indent=true&q.op=AND&q=${term}&rows=12000&wt=json`)
                if (res.status !== 200) return [];
                const tweetsArray = await res.json();
                const tweets = tweetsArray.response.docs;
                setSentiment(s => { s.noNeu = 0; s.noPos = 0; s.noNeg = 0; return s });
                for (let idx in tweets) {
                    const tweet = tweets[idx];
                    
                    if (tweet['sentiment'][0] === 'NEUTRAL') {
                        setSentiment(s => { s.noNeu = s.noNeu + 1; return s });
                    }
                    else if (tweet['sentiment'][0] === 'POSITIVE') {
                        setSentiment(s => { s.noPos = s.noPos + 1; return s });
                    }
                    else {
                        setSentiment(s => { s.noNeg = s.noNeg + 1; return s });
                    }
                    console.log("out");
                };

                setTweets(tweetsArray.response.docs);                
            }
            onSearchSubmit(term);
        }
    }, [term]);
   

    const { noPos, noNeu, noNeg} = sentiment;
    
    return (
        
        <div className='tweet-container'>
            <div>pos/neu/neg: {noPos}/{noNeu}/{noNeg}</div>
            <div style={{ padding: 20 }}>
                <p>This is testing {term}</p>
            </div>
            <div style={{ maxWidth: "650px" }}>

                <Bar
                    data={{
                        // Name of the variables on x-axies for each bar
                        labels: ["Positive", "Neutral", "Negative"],
                        datasets: [
                            {
                                // Label for bars
                                label: "Sentiment Distribution",
                                // Data or value of your each variable
                                data: [noPos, noNeu, noNeg],
                                // Color of each bar
                                backgroundColor: ["aqua", "green", "red"],
                                // Border color of each bar
                                borderColor: ["aqua", "green", "red"],
                                borderWidth: 0.5,
                            },
                        ],
                    }}
                    // Height of graph
                    height={400}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        // The y-axis value will start from zero
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                        legend: {
                            labels: {
                                fontSize: 15,
                            },
                        },
                    }}
                />
            </div>
            

        </div>
    );
};

export default Visualization;