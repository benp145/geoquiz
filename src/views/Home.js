import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import us from '../svgs/us.svg'
import eu from '../svgs/europe.svg'
import as from '../svgs/asia.svg'
import af from '../svgs/africa.svg'
import sa from '../svgs/southamerica.svg'
import compass from '../svgs/compass.svg'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { DataContext } from '../context/DataProvider'
import { Attempts } from '../components/Attempts'

export const Home = () => {
    const { currentUser } = useContext(AuthContext)
    const { attempts, getAttemptsHome, attemptsLoaded } = useContext(DataContext)
    

    useEffect(async () => {
        await getAttemptsHome();
        console.log(attempts)
    }, [])
    
    return (
        <React.Fragment>
            <div className="container old-timey">
                <img src={compass} alt="compass" className="compass" />
                <h1 className="old-timey-i">GeoQuizzer</h1>
                <span className="subtitle">Put your geographical knowledge to the test!</span>
                <h3>
                { currentUser.loggedIn ? `Welcome back, ${currentUser.username}!` : null }
                </h3>
                <hr />
                <h4>Quizzes</h4>
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
                <h4>Recent Attempts:</h4>
                
                    <ul className="list-group">
                        {attempts.map(attempt => <Attempts key={attempt.id} a={attempt.data} aid={attempt.id}/> ) }
                    </ul>
                
            </div>
            
        </React.Fragment>
    )
}
