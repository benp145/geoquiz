import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

export const Attempts = (props) => {
    const a = props.a
    const aid = props.aid
    const mapDict = {
        'us': 'United States',
        'europe': 'Europe',
        'southamerica': 'South America',
        'asia': 'Asia',
        'africa': 'Africa',
    }

    // console.log(key)

    return (
        <li className="list-group-item">
            <p>
                <Link to={{ pathname: `/attempt/${aid}` }}>
                    {mapDict[a.mapId]}
                </Link>
                : {a.correct}/{a.total} in {(a.timeElapsed%60 < 10) ? `${Math.floor(a.timeElapsed/60)}:0${a.timeElapsed%60}` : `${Math.floor(a.timeElapsed/60)}:${a.timeElapsed%60}`}
            </p>
            <p>
                <cite>&mdash; { a.user } </cite>
                <span className="float-right">
                    <small>{ moment( a.startTime.toDate() ).fromNow() }</small>
                </span>
            </p>
        </li>
    )
}
