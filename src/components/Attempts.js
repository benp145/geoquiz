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
                    <small>{moment(a.startTime.toDate()).fromNow()}</small>
                    {/* not sure why but sometimes records get added to the firebase with a start time of 0 rather than a servertimestamp. This can break this page, since .toDate() doesn't work on
                    integers. So far I've just deleted the bad records to make it work again, but I'm not sure how to stop them from being added. It will usually only break the profile page
                    when you hit view all, because it won't be included in either of the querys that limit it by ten and are sorted by starTime. It's also possible that it will affect the 
                    High Scores page. */}
                </span>
            </p>
        </li>
    )
}

