import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup'
import LoadingBar from 'react-top-loading-bar'
import Profile from '../Pages/Profile'

export default function Routs() {
    const [progress, setProgress] = useState(0)

    return (
        <div>
            <LoadingBar
                color='rgb(100 116 139)'
                height={5}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <Routes>
                <Route path="/" element={<Home setProgress={setProgress}/>} />
                <Route path="/about" element={<About setProgress={setProgress}/>} />
                <Route path="/signin" element={<Signin setProgress={setProgress}/>} />
                <Route path='/signup' element={<Signup setProgress={setProgress}/>}></Route>
                <Route path='/profile' element={<Profile setProgress={setProgress}></Profile>}></Route>
            </Routes>
        </div>
    )
}
