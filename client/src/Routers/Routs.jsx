import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup'

export default function Routs() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signin" element={<Signin />} />
                <Route path='/signup' element={<Signup />}></Route>
            </Routes>
        </div>
    )
}
