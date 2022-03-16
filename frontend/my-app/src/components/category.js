import React from 'react'


const category = () => {

    return (
        <>

            <h1 className="mx-3 my-5">Type Of Vaccine(s)</h1>
            <div className="container-fluid mx-3">
                <div className="row mt-5">
                    <div className="col-md-2">
                        <button className="btn btn-warning w-100 mb-4">Pfizer</button>
                        <button className="btn btn-warning w-100 mb-4">Morderna</button>
                        <button className="btn btn-warning w-100 mb-4">All Vaccines</button>
                    </div>
                </div>
            </div>
            <h1 className="mx-1 my-5">Emotion or Sentiment</h1>
            <div className="container-fluid mx-3">
                <div className="row mt-5">
                    <div className="col-md-2">
                        <button className="btn btn-warning w-100 mb-4">Emotion</button>
                        <button className="btn btn-warning w-100 mb-4">Sentiment</button>
                        <button className="btn btn-warning w-100 mb-4">All</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default category;

