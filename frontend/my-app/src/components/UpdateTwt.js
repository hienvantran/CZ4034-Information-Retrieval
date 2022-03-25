import React from 'react'

const UpdateTwt = () => {
    return (
        <>
            
            <div class="vertical-menu">
                <div class="VaccineTitle">Update Tweets</div>
                {/* <input type="checkbox" id="all_vaccines" name="all_vaccines" value="All"></input>
                <label for="all_vaccines"> All</label><br></br> */}
                <input type="checkbox" id="pfizer" name="pfizer" value="Pfizer"></input>
                <label for="pfizer">Pfizer</label><br></br>
                <input type="checkbox" id="moderna" name="moderna" value="Morderna"></input>
                <label for="moderna">Morderna</label><br></br>
                <input type="checkbox" id="covaxin" name="covaxin" value="Covaxin"></input>
                <label for="covaxin">Covaxin</label><br></br>
                <input type="checkbox" id="sinovac" name="sinovac" value="Sinovac"></input>
                <label for="sinovac">Sinovac</label><br></br>
                <input type="checkbox" id="sputnik" name="sputnik" value="Sputnik"></input>
                <label for="sputnik">Sputnik</label><br></br>
            </div>
            {/* <h2>Update Tweets</h2>
            <div className="row mt-5">
                <button className="btn btn-warning w-100 mb-4">All Vaccines</button>
                <button className="btn btn-warning w-100 mb-4">Pfizer</button>
                <button className="btn btn-warning w-100 mb-4">Morderna</button>
                <button className="btn btn-warning w-100 mb-4">Covaxin</button>
                <button className="btn btn-warning w-100 mb-4">Sinovac</button>
                <button className="btn btn-warning w-100 mb-4">Sputnik</button>
                
            </div> */}

        </>
    )
}
export default UpdateTwt;