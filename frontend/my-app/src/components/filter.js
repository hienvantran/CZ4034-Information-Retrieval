import React, { useEffect, useState } from 'react';


const Filter = ({ flag, onFlag, onFilterSubmit }) => {

    const [currentRadioValue, setCurrentRadioValue] = useState()

    const handleRadioChange = (e) => {
        setCurrentRadioValue(e.target.value);
        onFlag(true);
    };

    // submit a new search
    useEffect(() => {
        if (currentRadioValue !== '') {
            onFilterSubmit(currentRadioValue);
            
        }
    }, [currentRadioValue]);

    useEffect(() => {
        if (flag === false) {
            setCurrentRadioValue();

        }
    }, [flag]);
    

    return (
        
        <>        
            <div class="SentimentTitle">Sentiment</div>           
            <div className="row mt-5">


            <div>
                    <input
                    id="radio-item-1"
                    name="radio-item-1"
                    type="radio"
                    value="POSITIVE"
                    onChange={handleRadioChange}
                    checked={currentRadioValue === 'POSITIVE'}
                    />
                    <label htmlFor="radio-item-1">Positive</label>
            </div>

            <div>
                    <input
                    id="radio-item-2"
                    name="radio-item-2"
                    type="radio"
                    value="NEUTRAL"
                    onChange={handleRadioChange}
                    checked={currentRadioValue === 'NEUTRAL'}
                    />
                    <label htmlFor="radio-item-2">Neutral</label>
                </div>

                <div>
                    <input
                    id="radio-item-3"
                    name="radio-item-3"
                    type="radio"
                    value="NEGATIVE"
                    onChange={handleRadioChange}
                    checked={currentRadioValue === 'NEGATIVE'}
                    />
                    <label htmlFor="radio-item-3">Negative</label>
                </div>
            
                
                
            </div>
            
        </>
    )
}
export default Filter;