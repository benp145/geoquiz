import React, { useState, createContext, useRef } from 'react';


export const QuizContext = createContext();

export const QuizProvider = (props) => {
    

    // const initialCountryList = ['Colombia', 'Venezuela', 'Ecuador', 'Peru', 'Brazil', 'Bolivia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay', 'Suriname', 'Guyana', 'French Guiana']
    const [countryList, setCountryList] = useState([]);
    const [countryDict, setCountryDict] = useState({})
    const [currentCountry, setCurrentCountry] = useState(null);
    const [gameStatus, setGameStatus] = useState('before');
    const [correct, setCorrect] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    

    const initialCountryDict = {
        'southamerica': ['Colombia', 'Venezuela', 'Ecuador', 'Peru', 'Brazil', 'Bolivia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay', 'Suriname', 'Guyana', 'French Guiana'],
        'us': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
            'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
            'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
        'europe': ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
            'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco',
            'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
            'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City', 'Kosovo'],
        'africa': ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Central African Republic', 'Chad', 
            'Democratic Republic of the Congo', 'Republic of the Congo', 'Ivory Coast', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon',
            'The Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Morocco', 'Mozambique',
            'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Senegal', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania',
            'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe', 'Western Sahara'],
        'asia': ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'India', 'Indonesia', 'Iran',
            'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea',
            'Oman', 'Pakistan', 'Philippines', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Tajikistan', 'Thailand', 'Timor-Leste',
            'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen', 'Papua New Guinea'],
    }


    
    
    const handleClick = (elmt) => {
        if (!elmt.target.classList.contains('correct') && !elmt.target.classList.contains('incorrect') && gameStatus=='active') {
            console.log(elmt.target.id)
            let newDict = { ...countryDict };
            // console.log(currentCountry)
            // console.log(countryList)
            // console.log(countryDict)
            if (countryList.length === 1) {
                elmt.target.classList.add('correct');
                elmt.target.innerHTML += '<title>' + currentCountry + '</title>';
                setGameStatus('done')
                newDict[currentCountry] = 'correct'
                setCountryDict(newDict)
            }
            let countryId = currentCountry.replaceAll(' ', '_').toLocaleLowerCase();
            if (elmt.target.id === countryId) {
                console.log('correct', countryId, elmt.target.id)
                elmt.target.classList.add('correct')
                elmt.target.innerHTML += '<title>' + currentCountry + '</title>';
                setCorrect(correct + 1)
                newDict[currentCountry] = 'correct'
            }
            else {
                console.log('incorrect', countryId, elmt.target.id)
                document.getElementById(countryId).classList.add('incorrect');
                document.getElementById(countryId).innerHTML += '<title>' + currentCountry + '</title>';
                newDict[currentCountry] = 'incorrect'
            };
            
            const newList = countryList.filter(function (country) {
                return country !== currentCountry
            })
            setCountryList(newList);
            setCurrentCountry(newList[Math.floor(Math.random() * newList.length)]);
            setCountryDict(newDict);
        }
    };

    const values = {
        countryList, setCountryList, countryDict, setCountryDict, currentCountry, setCurrentCountry, gameStatus, setGameStatus,
        correct, setCorrect, handleClick, initialCountryDict, setTimeElapsed, timeElapsed
    }


    return (
        <QuizContext.Provider value={values}>
            { props.children }
        </QuizContext.Provider>
    )
}
