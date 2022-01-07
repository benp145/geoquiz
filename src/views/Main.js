import React from 'react';
import { Route, Routes } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Quiz } from './Quiz';
import { Home } from './Home';
import { Profile } from './Profile'
import { HighScores } from './HighScores';
import { AttemptSingle } from './AttemptSingle';
import { Learn } from './Learn';
import { LearnMap } from './LearnMap';


export const Main = () => {
    return (
        <React.Fragment className>
            <header>
                <Navbar />
            </header>

            <main>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/quiz/:id' element={<Quiz />} />
                    <Route exact path='/attempt/:id' element={<AttemptSingle />} />
                    {/* <Route exact path='/learn/:id' element={<LearnMap />} /> */}
                    <Route exact path='/profile' element={<Profile />} />
                    <Route exact path='/highscores' element={<HighScores />} />
                    {/* <Route exact path='/learn' element={<Learn />} /> */}


                </Routes>
            </main>
        </React.Fragment>
    )
}
