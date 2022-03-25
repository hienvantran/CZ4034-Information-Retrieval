import React, { useEffect, useState } from 'react';


const Category = ({ clearResults, onCatSubmitted }) => {
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
                
            
            
            
        </>
    )
}
export default Category;