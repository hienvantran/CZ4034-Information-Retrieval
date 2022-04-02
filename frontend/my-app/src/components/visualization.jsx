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
    const [img, setImg] = useState();
    const [loading, setLoading] = useState(true);


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
                fetch(`/visualization/`, {
                    'method': 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(tweets)
                })
                    .then(response => response.json()).then(data => {
                        console.log(data);
                        setSentiment({
                            noPos: data.positive,
                            noNeu: data.neutral,
                            noNeg: data.negative,
                        });
                        setImg(data.img)
                        setLoading(false);
                    })
                    .catch(error => {
                        // add error handling here
                        setLoading(false);
                        console.log(error);
                    })

                setTweets(tweets);                
            }
            onSearchSubmit(term);
        }
    }, [term]);
   

    const { noPos, noNeu, noNeg} = sentiment;
    if (loading) return (
        <h2>Loading...</h2>
    );
    
    if (!loading) return (
        
        <div className='tweet-container'>
            <h4>Sentiment Distribution</h4>
            <p>Stats: pos/neu/neg: {noPos}/{noNeu}/{noNeg}</p>
            
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
            <div style={{ padding: "1em" }}>
                <h4>WordCloud</h4>
                <img src={`data:image/png;base64,${img}`} width={650} height={250} alt='Word Cloud' />
            </div>
            
            

        </div>
    );
};

export default Visualization;