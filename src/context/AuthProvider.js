import { browserLocalPersistence, getAuth, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithPopup, signOut } from "@firebase/auth";
import { doc, setDoc, getFirestore } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebase";
import { Firestore } from "@firebase/firestore";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ loggedIn: false });

    const db = getFirestore()
    
    let auth = getAuth();
    let provider = new GoogleAuthProvider();

    function logOut() {
        signOut(auth)
            .then(() => {
                setCurrentUser({ loggedIn: false });
                console.log('User logged out successfully')
            })
            .catch((error) => {
                console.log(error)
                console.log('There was an error logging out.')
            })
    }

    function signIn() {
        return setPersistence(auth, browserLocalPersistence)
            .then(() => {
                signInWithPopup(auth, provider)
                    .then(result => {
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;

                        console.log(credential)
                        console.log(token)
                    })
            })
            .catch( err => console.error( err ) )
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if ( user )
            {
                
                const userRef = doc(db, 'users', user.uid);
                setDoc(userRef, { email: user.email, username: user.displayName }, { merge: true });
                
                setCurrentUser({
                    id: user.uid,
                    username: user.displayName,
                    image: user.photoURL,
                    email: user.email,
                    loggedIn: true
                })
            }
        });
    }, [])

    const values = { signIn, logOut, currentUser };
    
    return (
        <AuthContext.Provider value={values}>
            { children }
        </AuthContext.Provider>
    )
} 