import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup'
import LoadingBar from 'react-top-loading-bar'
import Profile from '../Pages/Profile'
import PrivateRouter from '../Components/PrivateRouter'
import CreateListing from '../Pages/CreateListing'
import UpdateListing from '../Pages/UpdateListing'

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
                <Route element={<PrivateRouter></PrivateRouter>}>
                    <Route path='/profile' element={<Profile setProgress={setProgress}></Profile>}></Route>
                    <Route path='/createListing' element={<CreateListing setProgress={setProgress}></CreateListing>}></Route>
                    <Route path='/updateListing/:id' element={<UpdateListing setProgress={setProgress}></UpdateListing>}></Route>
                </Route>
            </Routes>
        </div>
    )
}
