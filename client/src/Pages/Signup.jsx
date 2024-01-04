import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/user/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const signup = await res.json();
            console.log(signup);

            if (signup.success === false) {
                setError(signup.message);
                setLoading(false);
                return;
            }
            // Clear form data on successful sign-up
            setFormData({});

            setError(null);
            setLoading(false);
            navigate('/signin')
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    // console.log(formData);
    return (
        <div>
            <div className=' max-w-lg mx-auto p-3'>
                <h1 className=' text-center text-3xl font-semibold text-slate-700 my-7'>Sign UP</h1>
                <form action="" className=' flex flex-col gap-4' onSubmit={SubmitHandler}>
                    <input type='text' name='username' id='username' onChange={changeHandler} placeholder='Username' className=' border p-3 rounded-lg' />
                    <input type='email' name='email' id='email' onChange={changeHandler} placeholder='Email' className=' border p-3 rounded-lg' />
                    <input type='password' name='password' id='password' onChange={changeHandler} placeholder='Password' autoComplete='true' className=' border p-3 rounded-lg' />
                    <button disabled={loading} className=' sign-btn border-2 border-sky-600 uppercase rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 transition-all relative z-10'>{loading ? "Loading..." : "Sign Up"}</button>
                    <button className=' sign-btn-g border-2 border-sky-600 uppercase rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 transition-all relative z-10'>Sign Up With Google</button>
                </form>
                <div className=' text-center mt-5 '>
                    <p className=' text-lg font-medium'>Have an account ? <span className=' ms-2 font-semibold text-blue-500 hover:underline'><Link to='/signin'>Sign in</Link></span></p>
                </div>
                <div className=' text-center mt-2'>
                    {error && <p className=' text-lg text-red-600'>{error}</p>}
                </div>
            </div>
        </div>
    )
}
