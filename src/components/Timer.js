import React, { useState, useEffect, useContext, useRef } from 'react';
import { QuizContext } from '../context/QuizProvider';

export const Timer = (props) => {
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(true)
    const { setTimeElapsed, gameStatus } = useContext(QuizContext)
    const secondsRef = useRef(0)

    function stop() {
        setIsActive(false)
    }

    function reset() {
        setSeconds(0)
        setIsActive(true)
    }

    useEffect(() => {
        if (gameStatus === 'done') {
            // await setTimeElapsed(seconds)
            stop()
        } else if (gameStatus === 'active') {
            reset()
        }
            
        
    }, [gameStatus])

    // useEffect(() => {
    //     if (seconds !== 0) {
    //         setTimeElapsed(seconds)
    //         // console.log(seconds)
    //     }
    // }, [seconds])

    useEffect(() => {
        // console.log(seconds)
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                setTimeElapsed(seconds)
            }, 1000);
        } 
        return () => clearInterval(interval)
    }, [isActive, seconds])

    return (
        <React.Fragment>
            <span >
                <div className="time">{(seconds % 60 < 10) ? `${Math.floor(seconds / 60)}:0${seconds % 60}` : `${Math.floor(seconds / 60)}:${seconds % 60}`}</div>
            </span>
        </React.Fragment>
    )
}


