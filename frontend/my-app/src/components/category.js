import React from 'react'

const Category = () => {
    return (
        <>
            <h2>Type Of Vaccine(s)</h2>
            
                <div className="row mt-5">
                    <button className="btn btn-warning w-100 mb-4">All Vaccines</button>
                    <button className="btn btn-warning w-100 mb-4">Pfizer</button>
                    <button className="btn btn-warning w-100 mb-4">Morderna</button>
                    <button className="btn btn-warning w-100 mb-4">Covaxin</button>
                    <button className="btn btn-warning w-100 mb-4">Sinovac</button>
                    <button className="btn btn-warning w-100 mb-4">Sputnik</button>
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