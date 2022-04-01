import React, { useEffect, useState } from 'react';


const Filter = ({ clearResults, onCatSubmitted }) => {
    const [bg, changeBGColor] = React.useState(1);
    const [term, setTerm] = useState('');

    const [currentRadioValue, setCurrentRadioValue] = useState()

    const handleRadioChange = (e) => {
        setCurrentRadioValue(e.target.value);
    };

    // submit a new search
    useEffect(() => {
        if (term !== '') {
            // onSearchSubmit(term);
            onCatSubmitted(term);
        }
        else {
            clearResults();
            setTerm('');
            // onSearchSubmit(term);
            onCatSubmitted(term);
        }
    }, [term]);

    return (
        
        <>        
            <div class="SentimentTitle">Sentiment</div>           
            <div className="row mt-5">


            <div>
                    <input
                    id="radio-item-1"
                    name="radio-item-1"
                    type="radio"
                    value="radio-1"
                    onChange={handleRadioChange}
                    checked={currentRadioValue === 'radio-1'}
                    />
                    <label htmlFor="radio-item-1">Positive</label>
            </div>

            <div>
                    <input
                    id="radio-item-2"
                    name="radio-item-2"
                    type="radio"
                    value="radio-2"
                    onChange={handleRadioChange}
                    checked={currentRadioValue === 'radio-2'}
                    />
                    <label htmlFor="radio-item-2">
                    Neutral
                    </label>
                </div>

                <div>
                    <input
                    id="radio-item-3"
                    name="radio-item-3"
                    type="radio"
                    value="radio-3"
                    onChange={handleRadioChange}
                    checked={currentRadioValue === 'radio-3'}
                    />
                    <label htmlFor="radio-item-3">
                    Negative
                    </label>
                </div>
            
                
                
            </div>
            
        </>
    )
}
export default Filter;