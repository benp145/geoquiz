import React, { useContext, useState, useEffect } from 'react';
import { useMatch } from 'react-router';
import { Europe } from '../components/Europe';
import { SouthAmerica } from '../components/SouthAmerica';
import { Us } from '../components/Us';
import {Africa} from '../components/Africa'
import { Asia } from '../components/Asia';
import { QuizContext } from '../context/QuizProvider';
import { DataContext } from '../context/DataProvider';
import { serverTimestamp } from '@firebase/firestore';
import { useAuth } from '../context/AuthProvider';
import { Timer } from '../components/Timer';
import { Attempts } from '../components/Attempts';
import { Link } from 'react-router-dom';

export const Quiz = () => {

    const { currentUser } = useAuth()
    const [startTime, setStartTime] = useState(0)
    const match = useMatch("/quiz/:id");
    const id = match.params.id;
    const { gameStatus, currentCountry, correct, setCountryList, initialCountryDict, timeElapsed,
        setGameStatus, setCorrect, setCurrentCountry, countryDict, setCountryDict } = useContext(QuizContext)
    const { addAttempt, getHighScores } = useContext(DataContext)
    const [highScores, sethighScores] = useState([])

    const initialCountryList = initialCountryDict[id];

    const makeScores = async () => {
        const scores = await getHighScores(id)
        sethighScores(scores);
    }
    

    useEffect(async () => {
        console.log(gameStatus)
        if (gameStatus === 'done' && currentUser.loggedIn) {
            const attempt = {
                mapId: id,
                results: countryDict,
                startTime: startTime,
                timeElapsed: timeElapsed,
                correct: correct,
                total: initialCountryList.length,
                user: currentUser.username,
            }
            console.log(attempt)
            await addAttempt(attempt)
            makeScores()
        

        }
        if (gameStatus === 'active') {
            for (const country of initialCountryList) {
                console.log(country)
                let countryId = country.replaceAll(' ', '_').toLocaleLowerCase();
                document.getElementById(countryId).classList.remove('correct', 'incorrect');
                document.getElementById(countryId).innerHTML = ''
                console.log(document.getElementById(countryId))
            }
        }
        // return () => {
        //     cleanup
        // }
    }, [gameStatus])

    useEffect(() => {
        console.log("new Quiz")
        setCountryList(initialCountryList)
        setGameStatus('before')
        setCountryDict({})
        // return () => {
        //     cleanup
        // }
    }, [id])

    useEffect(() => {
        for (const country of initialCountryList) {
            let countryId = country.replaceAll(' ', '_').toLocaleLowerCase();
            document.getElementById(countryId).classList.remove('correct', 'incorrect');
            document.getElementById(countryId).innerHTML = ''
        }
    }, [])
    

    function startQuiz() {
        // setStartTime(serverTimestamp())
        const time = serverTimestamp()
        setStartTime(time)
        setCountryList(initialCountryList)
        setGameStatus('active')
        setCorrect(0)
        setCurrentCountry(initialCountryList[Math.floor(Math.random() * initialCountryList.length)])
        
    }

    // if (gameStatus === 'done') {
    //     const attempt = {
    //         id: id,
    //         results: countryDict,
    //         time: startTime,
    //         user: 1
    //     }
    //     addAttempt(attempt)
        
    // }
    


    return (
        <React.Fragment>
                {id === 'us' &&
                    <Us />
                }
                {id === 'europe' &&
                    <Europe />
                }
                {id === 'southamerica' &&
                    <SouthAmerica />
                }
                {id === 'africa' &&
                    <Africa />
                }
                {id === 'asia' &&
                    <Asia />
                }
            <div className="container old-timey">
                {!currentUser.loggedIn ? <div>Make sure to sign in to save your results!</div> : null}
                {gameStatus === 'before' &&
                    <div><button onClick={startQuiz}type="button" className="btn old-timey">Press to Start Quiz</button></div>
                }
                {gameStatus !== 'before' &&
                    <Timer />
                }
                {gameStatus === 'active' &&
                    <div>
                        <span className="locate">Locate This {id === 'us' ? 'State' : 'Country'}: {currentCountry}</span>
                        {/* <Timer /> */}
                    </div>
                }
                {gameStatus === 'done' &&
                    <div>
                        Nice job! You correctly identified {correct} out of {initialCountryList.length} {id === 'us' ? 'states!' : 'countries!'} <br />
                        {/* <Timer /> */}
                        <button onClick={startQuiz} type="button" className="btn old-timey">Press to Take Quiz Again!</button>
                        <Link to="/"  className="btn old-timey">Home</Link>
                        <h4>
                            High Scores:
                        </h4>
                        <ul className="list-group">
                            {highScores.map(score => <Attempts key={ score.id } a={score.data} aid={score.id}/> ) }
                        </ul>
                    </div>
                }
                
                
                
            </div>
        </React.Fragment>
    )
}
