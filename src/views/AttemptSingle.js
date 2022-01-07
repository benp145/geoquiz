import { doc, getDoc, getFirestore } from '@firebase/firestore';
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useMatch } from 'react-router';
import { Africa } from '../components/Africa';
import { Asia } from '../components/Asia';
import { Europe } from '../components/Europe';
import { SouthAmerica } from '../components/SouthAmerica';
import { Us } from '../components/Us';
import { DataContext } from '../context/DataProvider';

export const AttemptSingle = () => {
    const match = useMatch("/attempt/:id");
    const id = match.params.id;
    const [attemptState, setAttemptState] = useState({});
    const [result, setResult] = useState({})
    const [attemptLoadedState, setAttemptLoadedState] = useState("LOADING")
    const db = getFirestore()
    const docRef = doc(db, 'attempts', id);
    // const { initialCountryDict } = useContext(DataContext)
    

    const getAttempt = useCallback(
        async () => {
            const docSnapshot = await getDoc(docRef);
            setAttemptState(docSnapshot.data())
            setAttemptLoadedState('LOADED')
            
            return docSnapshot.data()['results']
        },
        [docRef],
    )

    const colorMap = useCallback(
        async () => {
            const result = await getAttempt();
            for (const country in result) {
                let countryId = country.replaceAll(' ', '_').toLocaleLowerCase();
                document.getElementById(countryId).classList.add(result[country]);
                document.getElementById(countryId).innerHTML += '<title>' + country + '</title>';
            }
        }
    ) 
    
   

    useEffect(() => {
        
        // getAttempt();
        colorMap();
    }, [getAttempt])
    

    // useEffect(() => {
    //     if (result !== {}) {
    //         for (const country in result) {
    //             let countryId = country.replaceAll(' ', '_').toLocaleLowerCase();
    //             document.getElementById(countryId).classList.add(result[country]);
    //             document.getElementById(countryId).innerHTML += '<title>' + country + '</title>';
    //         }
    //     }
    // }, [result])

    return (
        <React.Fragment>
            {attemptState['mapId'] === 'us' &&
                <Us />
            }
            {attemptState.mapId === 'europe' &&
                <Europe />
            }
            {attemptState.mapId === 'southamerica' &&
                <SouthAmerica />
            }
            {attemptState.mapId === 'africa' &&
                <Africa />
            }
            {attemptState.mapId === 'asia' &&
                <Asia />
            }
            {/* <div>Quiz date { attemptState.sta .\tTime} seconds</div> */}
            <div class="container old-timey">
                <div>Score: { attemptState.correct}/{attemptState.total} </div>
                <div>Quiz completed in {(attemptState.timeElapsed%60 < 10) ? `${Math.floor(attemptState.timeElapsed/60)}:0${attemptState.timeElapsed%60}` : `${Math.floor(attemptState.timeElapsed/60)}:${attemptState.timeElapsed%60}`}
                </div>
            </div>
        </React.Fragment>
    )
}
