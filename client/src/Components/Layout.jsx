import React from 'react'
import Header from './Header'
import Routs from '../Routers/Routs'
import { useLocation } from 'react-router-dom';
import AdminHeader from './AdminHeader';

export default function Layout() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");
    return (
        <div>
            {isAdmin ? <AdminHeader /> : <Header />}
            <div>
                <Routs></Routs>
            </div>
        </div>
    )
}
