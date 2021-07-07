import React from 'react'

const HouseView = (props) => {
    const { house, price, floorArea, landArea } = props
    return (
        <div className="view">
            {house ?
                <>
                    <img src={house.images[0]} alt={house.locality} />
                    <div>{house.name}</div>
                    <div className={`price ${price}`}><strong>Price</strong> {house.prize_czk} Kč</div>
                    <div><span><strong>Locality</strong></span><span>{house.locality}</span></div>
                    <div className={`floor ${floorArea}`}><span><strong>Floor area</strong></span> <span>{house.building_area}m2</span> </div>
                    <div className={`land ${landArea}`}><span><strong>Land area</strong></span> <span>{house.land_area} m2</span></div>
                    {house.company_logo && house.company_name ?
                        <div className="company">
                            <img src={house.company_logo} alt={house.company_name} />
                            {/* this paragraph is almost in the middle, unfortunatelly deadline.... this will be of course first thing in the hotfix after releasing, I promise */}
                            <p>{house.company_name}</p>
                        </div>
                        : ""
                    }
                </>
                : "Click on building you want to compare"
            }
        </div>
    )
}

export default HouseView;