import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup'
import LoadingBar from 'react-top-loading-bar'
import Profile from '../Pages/Profile'
import PrivateRouter from '../Components/PrivateRouter'
import CreateListing from '../Pages/CreateListing'
import UpdateListing from '../Pages/UpdateListing'
import Listing from '../Pages/Listing'
import SearchingListing from '../Pages/SearchingListing'

// Admin pages
import AdminHome from '../admin/AdminHome'
import AdminSignIn from '../admin/AdminSignIn'
import AdminSignUp from '../admin/AdminSignUp'
import AdminPrivateRoute from '../Components/AdminPrivateRoute'
import User from '../admin/User'

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
                {/* Public Routes */}
                <Route path="/" element={<Home setProgress={setProgress} />} />
                <Route path="/about" element={<About setProgress={setProgress} />} />
                <Route path="/signin" element={<Signin setProgress={setProgress} />} />
                <Route path='/signup' element={<Signup setProgress={setProgress} />}></Route>
                <Route path='/listing/:id' element={<Listing setProgress={setProgress}></Listing>}></Route>
                <Route path='/searchingListing' element={<SearchingListing setProgress={setProgress}></SearchingListing>}></Route>
                {/* User Private Routes */}
                <Route element={<PrivateRouter></PrivateRouter>}>
                    <Route path='/profile' element={<Profile setProgress={setProgress}></Profile>}></Route>
                    <Route path='/createListing' element={<CreateListing setProgress={setProgress}></CreateListing>}></Route>
                    <Route path='/updateListing/:id' element={<UpdateListing setProgress={setProgress}></UpdateListing>}></Route>
                </Route>
                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/home" />} />
                <Route path="/admin/signin" element={<AdminSignIn setProgress={setProgress} />} />
                <Route path="/admin/signup" element={<AdminSignUp setProgress={setProgress} />} />

                {/* Protected Admin Routes */}
                {/* <Route element={<AdminPrivateRoute />}> */}
                    <Route path="/admin/home" element={<AdminHome setProgress={setProgress} />} />
                    <Route path="/admin/createListing" element={<CreateListing setProgress={setProgress} />} />
                    <Route path='/admin/listing/:id' element={<Listing setProgress={setProgress}></Listing>}></Route>
                    {/* <Route path='/admin/users' element={<User setProgress={setProgress}></User>}></Route> */}
                {/* </Route> */}
            </Routes>
        </div>
    )
}