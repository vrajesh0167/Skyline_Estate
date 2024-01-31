import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userCreateFail, userCreateStart, userCreateSuccess, userOutSuccess } from '../Store/User/Userslice';
import Googleauth from '../Components/Googleauth';

export default function Signin(props) {
    const setProgress = props.setProgress

    const [formData, setFormData] = useState({})
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        setProgress(10)
        setTimeout(() => {
            setProgress(100)
        }, 500)
    }, [])

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        // setLoading(true);
        dispatch(userCreateStart())
        try {
            const res = await fetch('/api/auth/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const signin = await res.json();
            console.log(signin);

            if (signin.success === false) {
                // setError(signin.message);
                // setLoading(false);
                dispatch(userCreateFail(signin.message))
                return;
            }
            // Clear form data on successful sign-in
            setFormData({});

            // setError(null);
            // setLoading(false);
            dispatch(userCreateSuccess(signin))
            navigate('/');

        } catch (error) {
            // setError(error.message);
            // setLoading(false);
            dispatch(userCreateFail(error.message));
        }
    }
    return (
        <div>
            <div className=' max-w-lg mx-auto p-3'>
                <h1 className=' text-center text-3xl font-semibold text-slate-700 my-7'>Sign In</h1>
                <form action="" className=' flex flex-col gap-4' onSubmit={SubmitHandler}>
                    <input type='email' name='email' id='email' onChange={changeHandler} placeholder='Username Or Email' className=' border p-3 rounded-lg' />
                    <input type='password' name='password' id='password' autoComplete='off' onChange={changeHandler} placeholder='Password' className=' border p-3 rounded-lg' />
                    <button disabled={loading} className=' sign-btn border-2 border-sky-600 uppercase rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 transition-all relative z-10'>{loading ? "Loading..." : "Sign In"}</button>
                    {/* <button className=' sign-btn-g border-2 border-sky-600 uppercase rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 transition-all relative z-10'>Sign In With Google</button> */}
                </form>
                <Googleauth></Googleauth>
                <div className=' text-center mt-5 '>
                    <p className=' text-lg font-medium'>Don't Have an account ? <span className=' ms-2 font-semibold text-blue-500 hover:underline'><Link to='/signup'>Sign Up</Link></span></p>
                </div>
                <div className=' text-center mt-2'>
                    {error && <p className=' text-lg text-red-600'>{error}</p>}
                </div>
            </div>
        </div>
    )
}
