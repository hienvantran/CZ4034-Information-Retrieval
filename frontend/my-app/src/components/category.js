import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';

const Category = ({ onSearchSubmit, clearResults }) => {
    const [bg, changeBGColor] = React.useState(1);
    const [term, setTerm] = useState('');

    const [currentRadioValue, setCurrentRadioValue] = useState()

    const handleRadioChange = (e) => {
        setCurrentRadioValue(e.target.value);
    };

    // submit a new search
    useEffect(() => {
        if (term !== '') {
            onSearchSubmit(term);
        }
        else {
            clearResults();
            setTerm('*:*');
            onSearchSubmit(term);
        }
    }, [term]);


    return (
        
        <>
                <div class="vertical-menu">
                    <div class="VaccineTitle">Vaccine Type</div>
                
                    <ul>
                        <li><a class="Vaccine"
                        onClick={() => {
                            changeBGColor(1);
                            setTerm('');
                            
                        }}
                        style={{ backgroundColor: bg === 1 ? "#727272" : "rgb(189, 188, 188)" }} href="#">All</a></li>
                        <li><a class="Vaccine" 
                            onClick={() => {
                                changeBGColor(2);
                                setTerm('pfizer');
                            }} 
                            style={{backgroundColor: bg === 2 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Pfizer</a></li>
                        <li><a class="Vaccine" 
                            onClick={() => {
                                changeBGColor(3);
                                setTerm('moderna');
                            }} 
                            style={{backgroundColor: bg === 3 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Moderna</a></li>
                        <li><a class="Vaccine" 
                            onClick={() => {
                                changeBGColor(4);
                                setTerm('covaxin');
                            }} 
                            style={{backgroundColor: bg === 4 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Covaxin</a></li>
                        <li><a class="Vaccine" 
                            onClick={() => 
                            {
                                changeBGColor(5);
                                setTerm('sinovac');
                            }}
                            style={{backgroundColor: bg === 5 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Sinovac</a></li>
                        <li><a class="Vaccine" 
                            onClick={() => {
                                changeBGColor(6);
                                setTerm('sputnik');
                            }} 
                            style={{backgroundColor: bg === 6 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Sputnik</a></li>
                    </ul>
                </div>
                
            
            
                <div class="SentimentTitle">Sentiment</div>           
                <div className="row mt-5">
                    
                  
                        {/* <button className="btn btn-warning w-100 mb-4">Emotion</button>
                        <button className="btn btn-warning w-100 mb-4">Sentiment</button>
                        <button className="btn btn-warning w-100 mb-4">All</button> */}

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
export default Category;