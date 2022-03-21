import React,{ useState } from 'react'
import { Button } from 'semantic-ui-react';

const Category = () => {
    const [bg, changeBGColor] = React.useState(1);
    return (
        
        <>
            {/* <h2>Type Of Vaccines</h2> */}
            
                {/* <div className="row mt-5">
                    <button className="btn btn-warning w-100 mb-4">All Vaccines</button>
                    <button className="btn btn-warning w-100 mb-4">Pfizer</button>
                    <button className="btn btn-warning w-100 mb-4">Morderna</button>
                    <button className="btn btn-warning w-100 mb-4">Covaxin</button>
                    <button className="btn btn-warning w-100 mb-4">Sinovac</button>
                    <button className="btn btn-warning w-100 mb-4">Sputnik</button>
                </div> */}
                

                <div class="vertical-menu">
                <div class="Title">Vaccine Type</div>
                
                    <ul>
                        <li><a class="Vaccine" onClick={() => changeBGColor(1)} style={{backgroundColor: bg === 1 ? "#727272" : "rgb(189, 188, 188)"}} href="#">All</a></li>
                        <li><a class="Vaccine" onClick={() => changeBGColor(2)} style={{backgroundColor: bg === 2 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Pfizer</a></li>
                        <li><a class="Vaccine" onClick={() => changeBGColor(3)} style={{backgroundColor: bg === 3 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Morderna</a></li>
                        <li><a class="Vaccine" onClick={() => changeBGColor(4)} style={{backgroundColor: bg === 4 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Covaxin</a></li>
                        <li><a class="Vaccine" onClick={() => changeBGColor(5)} style={{backgroundColor: bg === 5 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Sinovac</a></li>
                        <li><a class="Vaccine" onClick={() => changeBGColor(6)} style={{backgroundColor: bg === 6 ? "#727272" : "rgb(189, 188, 188)"}} href="#">Sputnik</a></li>
                    </ul>
                </div>
                
            
            <h2>Emotion or Sentiment</h2>
            
                <div className="row mt-5">
                    
                        <button className="btn btn-warning w-100 mb-4">Emotion</button>
                        <button className="btn btn-warning w-100 mb-4">Sentiment</button>
                        <button className="btn btn-warning w-100 mb-4">All</button>
                    
                </div>
            
        </>
    )
}
export default Category;