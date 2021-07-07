import React from 'react'
import House from './House';
import HouseView from './HouseView';
import { useEffect, useState } from 'react';

const HouseBar = () => {
    //used for fetching all the houses
    const [housesAll, setHousesAll] = useState(null);
    //used for houses browsing 
    const [offset, setOffset] = useState(0);
    //this is for creating array of houses with offset
    const [houses, setHouses] = useState({});
    //used for rendering house components ->next step should be consoliding houses+housesList
    const [housesList, setHousesList] = useState([]);
    //those 3 below are used for rendering comparing views = all are the whole objects of house
    const [houseView, setHouseView] = useState(null);
    const [view1, setView1] = useState(null);
    const [view2, setView2] = useState(null);


    //comparing views
    const [price1, setPrice1] = useState("");
    const [price2, setPrice2] = useState("");
    const [floorArea1, setFloorArea1] = useState("");
    const [floorArea2, setFloorArea2] = useState("");
    const [landArea1, setLandArea1] = useState("");
    const [landArea2, setLandArea2] = useState("");

    //fetching all houses
    const url = "https://estate-comparison.codeboot.cz/list.php"
    const fetchHouses = async () => {
        const reponse = await fetch(url);
        const data = await reponse.json();
        setHousesAll(data);
    }

    //creating bar of houses
    const getBar = () => {
        let bar = [];
        let j = offset;
        for (let i = 0; i < 10; i++) {
            if (j === 127) {
                j = 0;
            }
            bar[i] = housesAll[j];
            j++;
        }
        setHouses(bar);
    }

    //after page is loaded calling of the fetching
    useEffect(() => {
        fetchHouses()
    }, [])

    //after fetching is completed or user clicked on browsing buttons creating bar is called
    useEffect(() => {
        housesAll && getBar();
    }, [housesAll, offset])

    useEffect(() => {
        makeHouseComponents()
    }, [houses, view1, view2])
    function handleSubmitPrev(event) {
        let prev = offset - 1
        if (prev < 0) prev = 126;
        setOffset(prev);
    }

    function handleSubmitNext(event) {
        let next = offset + 1;
        if (next > 126) next = 0;
        setOffset(next);
    }

    useEffect(() => {
        if (houseView && !view1) {
            setView1(houseView);
            setHouseView(null);
        } else if (houseView && houseView != view1 && !view2) {
            setView2(houseView);
            setHouseView(null);
        }
        else if (houseView && view1 && view2) {
            setHouseView(null);
            setView1(null);
            setView2(null);
        }
    }, [houseView])

    const makeHouseComponents = () => {
        const list = [];
        for (let i = 0; i < 10; i++) {
            console.log(view1);
            if (view1 == houses[i]) {
                list.push(<House key={i} house={houses[i]} setHouseView={setHouseView} classHighlight="highlight1" />)
            } else if (view2 == houses[i]) {
                list.push(<House key={i} house={houses[i]} setHouseView={setHouseView} classHighlight="highlight2" />)
            } else {
                list.push(<House key={i} house={houses[i]} setHouseView={setHouseView} classHighlight="none" />)
            }

        }
        setHousesList(list);
    }

    //comparison of views

    useEffect(() => {
        if (view1 && view2) {
            if (view1.prize_czk > view2.prize_czk) {
                setPrice2("green");
                setPrice1("red");
            } else if (view1.prize_czk < view2.prize_czk) {
                setPrice2("red");
                setPrice1("green");
            } else {
                setPrice2(null);
                setPrice1(null);
            }
            if (view1.land_area > view2.land_area) {
                setFloorArea1("green");
                setFloorArea2("red");
            } else if (view1.land_area < view2.land_area) {
                setFloorArea1("red");
                setFloorArea2("green");
            } else {
                setFloorArea1(null);
                setFloorArea2(null);
            }

            if (view1.building_area > view2.building_area) {
                setLandArea1("green");
                setLandArea2("red");
            } else if (view1.building_area < view2.building_area) {
                setLandArea1("red");
                setLandArea2("green");
            } else {
                setLandArea1(null);
                setLandArea2(null);
            }
        } else {
            setPrice1(null);
            setPrice2(null);
            setFloorArea1(null);
            setFloorArea2(null);
            setLandArea1(null);
            setLandArea2(null);

        }

    }, [view1, view2])

    return (
        <>
            <div className="house-container">
                <button onClick={(event) => handleSubmitPrev(event)}>Previous</button>
                {houses && houses.length > 0 ?
                    <>
                        {housesList}
                    </>
                    : "Nothing here"
                }
                <button onClick={handleSubmitNext}>Next</button>
            </div>
            <div className="comparison">
                <HouseView house={view1} price={price1} floorArea={floorArea1} landArea={landArea1} />
                <HouseView house={view2} price={price2} floorArea={floorArea2} landArea={landArea2} />
            </div>
        </>
    )
}

export default HouseBar;
