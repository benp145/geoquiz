import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import us from '../svgs/us.svg'
import eu from '../svgs/europe.svg'
import as from '../svgs/asia.svg'
import af from '../svgs/africa.svg'
import sa from '../svgs/southamerica.svg'
import compass from '../svgs/compass.svg'
import { Attempts } from '../components/Attempts'
import { DataContext } from '../context/DataProvider'


export const Profile = () => {
    const { myAttempts, myAttemptsAll, getAttemptsProfile, getAttemptsProfileAll } = useContext(DataContext)
    const [all, setAll] = useState(false)
    function toggle() {
        setAll(!all)
    }

    
    useEffect(async () => {
        await getAttemptsProfile()
        console.log(myAttempts)
    }, [all])
    useEffect(async () => {
            await getAttemptsProfileAll()
    }, [all])

    return (
        <React.Fragment>
        <div class="container old-timey">
            <img src={compass} alt="compass" className="compass" />
            <h1 className='old-timey-i'>My Profile</h1>
            <hr />
            <h4>My Quizes</h4>
            <div class="card-deck row">
                    <div class="card">
                        <img class="card-img-top" src={us} alt="us" />
                        <div class="card-body">
                            <h4 class="card-title"><Link to="/quiz/us">United States</Link></h4>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src={eu} alt="us" />
                        <div class="card-body">
                            <h4 class="card-title"><Link to="/quiz/europe">Europe</Link></h4>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src={af} alt="us" />
                        <div class="card-body">
                            <h4 class="card-title"><Link to="/quiz/africa">Africa</Link></h4>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src={as} alt="us" />
                        <div class="card-body">
                            <h4 class="card-title"><Link to="/quiz/asia">Asia</Link></h4>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src={sa} alt="us" />
                        <div class="card-body">
                            <h4 class="card-title"><Link to="/quiz/southamerica">South America</Link></h4>
                        </div>
                    </div>
                </div>
            <hr />
                <h4>My Attempts:</h4>
                
                {all ? 
                    <div>
                        <ul className="list-group">
                            {myAttemptsAll.map(attempt => <Attempts key={attempt.id} a={attempt.data} aid={attempt.id}/> ) }
                        </ul>
                        <Link onClick={toggle}to="/profile">Hide Attempts </Link>
                    </div>
                
                :
                
                    <div>
                        <ul className="list-group">
                            {myAttempts.map(attempt => <Attempts key={attempt.id} a={attempt.data} aid={attempt.id}/> ) }
                        </ul>
                        <Link onClick={toggle}to="/profile">View All My Attempts</Link>
                    </div>
                
                }
            
            
            
                
        </div>
        
    </React.Fragment>
    )
}
