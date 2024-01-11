import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Header() {
    const location = useLocation();
    const { currentUser } = useSelector((state) => state.user)

    // Check if the current route is the signup page
    const isSignUpPage = location.pathname === '/signup';

    return (
        <div>
            <header className=' bg-slate-200 shadow-md '>
                <div className=' max-w-7xl flex justify-between items-center mx-auto p-3'>
                    <Link to='/' className=' md:text-2xl text-lg font-bold'>
                        <h1><span className=' text-slate-500'>Skyline</span><span className=' text-slate-700'>Estate</span></h1>
                    </Link>
                    <form action="" className=' relative bg-slate-100 rounded-lg'>
                        <input type="text" name="search" id="search" autoComplete='off' className=' md:w-80 sm:w-64 w-24 bg-transparent text-xs sm:text-base border rounded-lg font-medium py-2.5 px-4 focus:outline-none focus:border-cyan-800 transition' placeholder="Search..." />
                        <i className="ri-search-line absolute sm:top-3 top-2 right-2 sm:right-3"></i>
                    </form>
                    <ul className=' flex gap-4'>
                        <NavLink to="/" className='nav-link text-xl font-semibold relative hidden md:block'>Home</NavLink>
                        <NavLink to='/about' className='nav-link text-xl font-semibold relative hidden md:block'>About Us</NavLink>
                        {
                            currentUser ? (
                                <Link to={'/profile'}>
                                    <img src={currentUser.avatar} alt="Profile" className=' rounded-3xl bg-cover w-7 h-7 border-2 border-slate-500' />
                                </Link>
                            ) : (
                                <div>
                                    {
                                        isSignUpPage ? (
                                            <NavLink to='/signup' className='nav-link md:text-xl text-lg font-semibold relative' > Sign Up</NavLink>
                                        ) : (
                                            <NavLink to='/signin' className='nav-link md:text-xl text-lg font-semibold relative'>Sign In</NavLink>
                                        )
                                    }
                                </div>
                            )
                        }

                    </ul>
                </div>
            </header >
        </div >
    )
}
