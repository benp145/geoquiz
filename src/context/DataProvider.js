import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { collection, getDocs, getFirestore, addDoc, getDoc, orderBy, query, where, limit, getDocFromCache, doc } from "@firebase/firestore";
import firebase from '../firebase';
import { AuthContext } from './AuthProvider';


export const DataContext = createContext();

export const DataProvider = (props) => {
    const [attempts, setAttempts] = useState([])
    const [myAttempts, setMyAttempts] = useState([])
    const [myAttemptsAll, setMyAttemptsAll] = useState([])
    const [attemptsLoaded, setAttemptsLoaded] = useState('LOADING')
    const { currentUser } = useContext(AuthContext)
    // console.log(firebase)

    const db = getFirestore(firebase);

    const getAttemptsProfile = async () => {
        const _name = await currentUser.username
        const q = query(collection(db, 'attempts'), where('user', '==', _name), orderBy('startTime', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const newAttempts = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data().user)
            newAttempts.push({
                id: doc.id,
                data: doc.data()
            })
        })
        setMyAttempts(newAttempts)
        console.log('setting attempts')
        setAttemptsLoaded('LOADED')
    }
    const getAttemptsProfileAll = async () => {
        const _name = await currentUser.username
        const q = query(collection(db, 'attempts'), where('user', '==', _name), orderBy('startTime', 'desc'));
        const querySnapshot = await getDocs(q);
        const newAttempts = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data().user)
            newAttempts.push({
                id: doc.id,
                data: doc.data()
            })
        })
        setMyAttemptsAll(newAttempts)
        setAttemptsLoaded('LOADED')
    }

    const getAttemptsHome = async () => {
        const q = query(collection(db, 'attempts'), orderBy('startTime', 'desc'), limit(10));
        // const q = query(collection(db, 'attempts'), where('timeElapsed' === '0'));
        const querySnapshot = await getDocs(q);
        const newAttempts = [];
        querySnapshot.forEach((doc) => {
            // console.log(doc.id)
            newAttempts.push({
                id: doc.id,
                data: doc.data()
            })
        })
        setAttempts(newAttempts)
        setAttemptsLoaded('LOADED')
    }

    const getAttemptById = async (attemptId) => {
        const docRef = doc(collection(db, 'attempts', attemptId));
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log(docSnap.data())
        } else {
            console.log('no document')
        }
    }

    const getHighScores = async (c) => {
        const q = query(collection(db, 'attempts'), where('mapId', '==', c), orderBy('correct', 'desc'), orderBy('timeElapsed'), limit(5));
        const querySnapshot = await getDocs(q);
        const highScores = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
            highScores.push({
                id: doc.id,
                data: doc.data()})
        })
        console.log(highScores)
        return highScores
    }

    const addAttempt = async (attemptData) => {
        console.log('adding attempt')
        // addDoc(collection(db, 'attempts'), attemptData)
        const docRef = await addDoc(collection(db, 'attempts'), attemptData)
        const doc = await getDoc(docRef)
        setAttempts([{ ...doc.data(), id: docRef.id }, ...attempts])
    }

    useEffect(() => {
        getAttemptsHome();
    }, [getAttemptsHome])

    // useEffect(() => {
    //     getAttemptsProfile();
    // }, [getAttemptsProfile])
    // useEffect(() => {
    //     getAttemptsProfileAll();
    // }, [getAttemptsProfileAll])


    // // API functionality
    // const [queryState, setQueryState] = useState([]);
    // const [keyState, setKeyState] = useState([]);

    // const throttling = useRef(false)
    // const handleThrottleSearch = (elmt) => {
    //     if (throttling.current) {
    //         return
    //     }
    //     // if (!inputRef.current.value.trim()) {
    //     //     setQueryState([])
    //     //     setKeyState([])
    //     // }
    //     throttling.current = true
    //     setTimeout(() => {
    //         throttling.current = false
    //         fetch(`https://restcountries.com/v3.1/name/${elmt.target.id}`)
    //             .then(async response => {
    //                 if (!response.ok) {
    //                 console.log("Something went wrong!")
    //                 } else {
    //                     const data = await response.json()
    //                     setQueryState(data.query.pages)
    //                     setKeyState(Object.keys(data.query.pages))
    //             }
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }, 800)
    //     console.log(keyState)
    // }



    const values = {
        addAttempt, attempts, getAttemptsProfile, getAttemptsHome, getHighScores, attemptsLoaded, getAttemptsProfileAll, myAttempts, myAttemptsAll
    }


    return (
        <DataContext.Provider value={values}>
            { props.children }
        </DataContext.Provider>
    )
}
