import React, { useEffect, useState } from 'react';

const Sort = ({ clearResults, onSortSubmitted}) => {
    const [bg, changeBGColor] = React.useState(1);
    const [term, setTerm] = useState('');
    // submit a new search
    useEffect(() => {
        if (term !== '') {
            onSortSubmitted(term);
        }
        else {
            clearResults();
            setTerm('');
            onSortSubmitted(term);
        }
    }, [term]);

    return (
        <>
            <div class="vertical-menu">
            <div class="Title">Sort</div>
            <ul>
                <li><a class="VaccineTitle"
                    onClick={() => {
                        changeBGColor(1);
                        setTerm('');

                    }}
                    style={{ backgroundColor: bg === 1 ? "#727272" : "rgb(189, 188, 188)" }} href="#">Relevance</a></li>
                <li><a class="Vaccine"
                    onClick={() => {
                        changeBGColor(2);
                        setTerm('creation_date_time');
                    }}
                    style={{ backgroundColor: bg === 2 ? "#727272" : "rgb(189, 188, 188)" }} href="#">Time</a></li>
                <li><a class="Vaccine"
                    onClick={() => {
                        changeBGColor(3);
                        setTerm('retweet_count');
                    }}
                    style={{ backgroundColor: bg === 3 ? "#727272" : "rgb(189, 188, 188)" }} href="#">Retweet Count</a></li>
                <li><a class="Vaccine"
                    onClick={() => {
                        changeBGColor(4);
                        setTerm('like_count');
                    }}
                    style={{ backgroundColor: bg === 4 ? "#727272" : "rgb(189, 188, 188)" }} href="#">Like Count</a></li>
            </ul>
        </div>

            
        </>
    )
}
export default Sort;
