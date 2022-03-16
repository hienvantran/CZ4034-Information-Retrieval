import React from 'react'


const category = () => {

    return (
        <>

            <h1>Type Of Vaccine(s)</h1>
            <div className="container-fluid mx-2">
                <div className="row mt-5 mx-2">
                    <div className="col-md-3">
                        <button className="btn btn-warning w-100 mb-4">Pfizer</button>
                        <button className="btn btn-warning w-100 mb-4">Morderna</button>
                        <button className="btn btn-warning w-100 mb-4">Sinopharm</button>
                        <button className="btn btn-warning w-100 mb-4">Novavax</button>
                        <button className="btn btn-warning w-100 mb-4">All Vaccines</button>
                    </div>
                    {/* <div className="col-md-9">
                        
                        </div> */}
                </div>
            </div>

        </>
    )
}
export default category;

