import React from 'react'

const Sort = () => {
    return (
        <>
            <h1 className="mx-3 my-5">Sort by...</h1>
            <div className="container-fluid mx-3">
                <div className="row mt-5">
                    <div className="col-md-2">
                        <button className="btn btn-warning w-100 mb-4">Time</button>
                        <button className="btn btn-warning w-100 mb-4">Retweets</button>
                        <button className="btn btn-warning w-100 mb-4">Likes</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sort;