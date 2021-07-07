import React from 'react';
import { useEffect } from 'react';

const House = (props) => {
    const { house, setHouseView, classHighlight } = props;
    // console.log(classHighlight);
    function showView(e) {
        setHouseView(e);
    }



    return (
        <div onClick={(e) => showView(house)} className={`house ${classHighlight}`}>
            {house ?
                <>
                    <img src={house.images[0]} alt={house.locality} />
                    <p>{house.locality}</p>
                </>
                : "loading"
            }
        </div>
    )
}

export default House;


