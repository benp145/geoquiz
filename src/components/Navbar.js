import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const { currentUser, signIn, logOut } = useAuth();

    const handleLogin = () => {
        signIn();
    }

    const handleLogout = () => {
        logOut();
    }



    return (
        <div className="old-timey">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <Link className="navbar-brand" to="/">GeoQuizzer</Link>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/highscores">High Scores</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Quizzes</a>
                            <div className="dropdown-menu" aria-labelledby="dropdownId">
                                <Link className="dropdown-item" to="/quiz/us">United States</Link>
                                <Link className="dropdown-item" to="/quiz/europe">Europe</Link>
                                <Link className="dropdown-item" to="/quiz/southamerica">South America</Link>
                                <Link className="dropdown-item" to="/quiz/africa">Africa</Link>
                                <Link className="dropdown-item" to="/quiz/asia">Asia</Link>
                            </div>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/learn">Learn</Link>
                        </li> */}
                    </ul>
                        {/* <li>
                            <Link className="nav-link" to="/signup" >Sign Up</Link>
                        </li> */}
                        {
                            !currentUser.loggedIn
                                ?
                            <ul class="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a onClick={ handleLogin } href="#" className="nav-link">Login</a>
                                </li>
                            </ul>
                                :
                            <ul class="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <a onClick={handleLogout} href="#" className="nav-link">Logout</a>
                                </li>
                            </ul>  
                        }
                </div>
            </nav>
        </div>
    )
}
