import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <div>
            <div className=' max-w-lg mx-auto p-3'>
                <h1 className=' text-center text-3xl font-semibold text-slate-700 my-7'>Sign UP</h1>
                <form action="" className=' flex flex-col gap-4'>
                    <input type='text' name='username' id='username' placeholder='Username' className=' border p-3 rounded-lg' />
                    <input type='email' name='email' id='email' placeholder='Email' className=' border p-3 rounded-lg' />
                    <input type='password' name='password' id='password' placeholder='Password' className=' border p-3 rounded-lg' />
                    <button className=' sign-btn border-2 border-sky-600 uppercase rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 transition-all relative z-10'>Sign Up</button>
                    <button className=' sign-btn-g border-2 border-sky-600 uppercase rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 transition-all relative z-10'>Sign Up With Google</button>
                </form>
                <div className=' text-center mt-5 '>
                    <p className=' text-lg font-medium'>Have an account ? <span className=' ms-2 font-semibold text-blue-500 hover:underline'><Link to='/signin'>Sign in</Link></span></p>
                </div>
            </div>
        </div>
    )
}
