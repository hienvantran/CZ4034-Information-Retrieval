import React, { useEffect, useState} from 'react';

const UpdateTwt = ({ onUpdateTweets }) => {
    // const [index, setIndex] = useState([]);
    // submit a new search
    // useEffect(() => {
    //     if (index !== []) {
    //         onUpdateTweets(index);
    //     }
    //     else {
    //         onUpdateTweets(index);
    //     }
    // }, [index]);
    const [isChecked, setIsChecked] = useState(false);
    const [checkedState, setCheckedState] = useState(
        [false, false, false, false, false, false]
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, idx) =>
            idx === position ? !item : item
        );
        
        setCheckedState(updatedCheckedState);
    };

    // const addIndex = (newIndex) => setIndex(state => [...state, newIndex])
    const updateTweets = () => {
        console.log("checking updateTweets");
        console.log(`Checked state: ${checkedState}`);
        const updatedIndex = [];

        checkedState.forEach((state, index) => {
            if (state == true) {
                updatedIndex.push(index)
            }
        })

        onUpdateTweets(updatedIndex);
        setCheckedState([false, false, false, false, false, false]);
    }
    return (
        <>
            
            <div class="vertical-menu">
                <div class="VaccineTitle">Update Tweets</div>
                <input type="checkbox" id="general" name="general" value="General" checked={checkedState[5]} onChange={() => handleOnChange(5)}></input>
                <label for="general">General</label><br></br>
                <input type="checkbox" id="pfizer" name="pfizer" value="Pfizer" checked={checkedState[0]} onChange={() => handleOnChange(0)}></input>
                <label for="pfizer">Pfizer</label><br></br>
                <input type="checkbox" id="moderna" name="moderna" value="Morderna" checked={checkedState[1]} onChange={() => handleOnChange(1)}></input>
                <label for="moderna">Morderna</label><br></br>
                <input type="checkbox" id="covaxin" name="covaxin" value="Covaxin" checked={checkedState[2]} onChange={() => handleOnChange(2)}></input>
                <label for="covaxin">Covaxin</label><br></br>
                <input type="checkbox" id="sinovac" name="sinovac" value="Sinovac" checked={checkedState[3]} onChange={() => handleOnChange(3)}></input>
                <label for="sinovac">Sinovac</label><br></br>
                <input type="checkbox" id="sputnik" name="sputnik" value="Sputnik" checked={checkedState[4]} onChange={() => handleOnChange(4)}></input>
                <label for="sputnik">Sputnik</label><br></br>
                <button onClick={updateTweets}>
                    Update Tweets
                </button>
            </div>
        </>
    )
}
export default UpdateTwt;