import React from 'react'
import { Link } from 'react-router-dom'
import us from '../svgs/us.svg'
import eu from '../svgs/europe.svg'
import as from '../svgs/asia.svg'
import af from '../svgs/africa.svg'
import sa from '../svgs/southamerica.svg'
import compass from '../svgs/compass.svg'

export const Learn = () => {
    return (
        <React.Fragment>
            <div className="container old-timey">
                <img src={compass} alt="compass" className="compass" />
                <h1 className="old-timey-i">Learn Mode</h1>
                <span className="subtitle">Click on the region you would like to learn about!</span>
                <hr />
                <div class="card-deck row">
                    <div class="card">
                        <img class="card-img-top" src={eu} alt="us" />
                        <div class="card-body">
                            <h4 class="card-title"><Link to="/learn/europe">Europe</Link></h4>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src={af} alt="us" />
                        <div class="card-body">
                            <h4 class="card-title"><Link to="/learn/africa">Africa</Link></h4>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src={as} alt="us" />
                        <div class="card-body">
                            <h4 class="card-title"><Link to="/learn/asia">Asia</Link></h4>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src={sa} alt="us" />
                        <div class="card-body">
                            <h4 class="card-title"><Link to="/learn/southamerica">South America</Link></h4>
                        </div>
                    </div>
                </div>
                
            </div>
        </React.Fragment>
    )
}
