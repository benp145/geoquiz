import React, { useContext, useEffect, useState, useRef } from 'react'
import { Attempts } from '../components/Attempts';
import { DataContext } from '../context/DataProvider';
import compass from '../svgs/compass.svg'

export const HighScores = () => {
    const [asiaHighScores, setAsiaHighScores] = useState([])
    const [africaHighScores, setAfricaHighScores] = useState([])
    const [europeHighScores, setEuropeHighScores] = useState([])
    const [southAmerHighScores, setSouthAmerHighScores] = useState([])
    const [usHighScores, setUsHighScores] = useState([])

    const makeAsia = async () => {
        const asiaScores = await getHighScores('asia')
        setAsiaHighScores(asiaScores);
    }
    const makeSouthAmerica = async () => {
        const southamericaScores = await getHighScores('southamerica')
        setSouthAmerHighScores(southamericaScores);
    }
    const makeAfrica = async () => {
        const africaScores = await getHighScores('africa')
        setAfricaHighScores(africaScores);
    }
    const makeEurope = async () => {
        const europeScores = await getHighScores('europe')
        setEuropeHighScores(europeScores);
    }
    const makeUs = async () => {
        const usScores = await getHighScores('us')
        setUsHighScores(usScores)
    }
    
    
    
    const { getHighScores } = useContext(DataContext)
    useEffect(() => {
        makeAfrica()
        makeAsia()
        makeUs()
        makeEurope()
        makeSouthAmerica()
    }, [])

    return (
        <div className="container old-timey">
            <img src={compass} alt="compass" className="compass" />
            <h1 className="old-timey-i">
                High Scores
            </h1>
            <hr />
            <h4>
                United States:
            </h4>
                <ul className="list-group">
                    {usHighScores.map(score => <Attempts key={ score.id } a={score.data} aid={score.id}/> ) }
                </ul>
            <h4>
                Europe:
            </h4>
                <ul className="list-group">
                    {europeHighScores.map(score => <Attempts key={ score.id } a={score.data} aid={score.id}/> ) }
                </ul>
            <h4>
                South America:
            </h4>
                <ul className="list-group">
                    {southAmerHighScores.map(score => <Attempts key={ score.id } a={score.data} aid={score.id}/> ) }
                </ul>
            <h4>
                Africa:
            </h4>
            <ul className="list-group">
                {africaHighScores.map(score => <Attempts key={ score.id } a={score.data} aid={score.id}/> ) }
            </ul>
            <h4>
                Asia:
            </h4>
            <ul className="list-group">
                {asiaHighScores.map(score => <Attempts key={ score.id } a={score.data} aid={score.id}/> ) }
            </ul>
        </div>
    )
}
