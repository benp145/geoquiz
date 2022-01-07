import React, { useEffect, useContext } from 'react';
import { useMatch } from 'react-router';
import { Africa } from '../components/Africa';
import { Asia } from '../components/Asia';
import { Europe } from '../components/Europe';
import { SouthAmerica } from '../components/SouthAmerica';
import { Us } from '../components/Us';
import { DataContext } from '../context/DataProvider';
import { QuizContext } from '../context/QuizProvider';

export const LearnMap = () => {

    const match = useMatch("/learn/:id");
    const id = match.params.id;
    // const { initialCountryDict } = useContext(DataContext)
    const { initialCountryDict, setGameStatus, gameStatus } = useContext(QuizContext)

    useEffect(() => {
        setGameStatus('learn')
        console.log(initialCountryDict)
        const countryList = initialCountryDict[id];

        countryList.forEach((country) => {
            let countryId = country.replaceAll(' ', '_').toLocaleLowerCase();
            document.getElementById(countryId).innerHTML += '<title>' + country + '</title>';
        })
        
    }, [])

    return (
        <React.Fragment>
            <span className="subtitle old-timey">Click on a country to learn about it!</span>
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
        </React.Fragment>
    )
}
