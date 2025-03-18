import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const location = useLocation();
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    // mobile media
    const [isActive, setIsActive] = useState(false);

    const toggleNav = () => {
        setIsActive(!isActive);
    };

    // Check if the current route is the signup page
    const isSignUpPage = location.pathname === '/signup';

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm', searchTerm);
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [])

    return (
        <div className=' sticky top-0 right-0 left-0 z-50'>
            <header className=' bg-slate-200 shadow-md '>
                <div className=' max-w-7xl flex justify-between items-center mx-auto sm:p-3 p-4'>
                    <Link to='/admin/home' className=' md:text-2xl text-lg font-bold'>
                        <h1><span className=' text-slate-500'>Skyline</span><span className=' text-slate-700'>Estate</span></h1>
                    </Link>
                    <div className=' flex gap-4'>
                        <ul className={` flex gap-4 Nav-menu ${isActive ? 'active' : ''}`}>
                            <NavLink to="/admin/home" className='nav-link text-xl font-semibold relative' onClick={toggleNav}>Home</NavLink>
                            <NavLink to="/admin/users" className='nav-link text-xl font-semibold relative' onClick={toggleNav}>Users</NavLink>
                            <NavLink to="/admin/createListing" className='nav-link text-xl font-semibold relative' onClick={toggleNav}>Add Listing</NavLink>
                            {/* <NavLink to='/about' className='nav-link text-xl font-semibold relative' onClick={toggleNav}>About Us</NavLink> */}
                        </ul>
                        <div className=' flex gap-4'>
                            {
                                currentUser ? (
                                    <NavLink to={'/profile'} className='nav-link relative'>
                                        <img src={currentUser.avatar} alt="Profile" className=' rounded-3xl bg-cover w-7 h-7 border-2 border-slate-500' />
                                    </NavLink>
                                ) : (
                                    <div>
                                        <NavLink to='/signin' className='nav-link md:text-xl text-lg font-semibold relative'>Sign In</NavLink>
                                    </div>
                                )
                            }
                            <button className={`nav-res ${isActive ? 'active' : ''} border-none cursor-pointer bg-transparent`} onClick={toggleNav}>
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header >
        </div >
    )
}

export default AdminHeader
