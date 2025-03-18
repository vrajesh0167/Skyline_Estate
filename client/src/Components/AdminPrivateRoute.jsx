import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminPrivateRoute = () => {
    const isAdminAuthenticated = !!localStorage.getItem('adminToken') // Example check

    return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/signin" />
}

export default AdminPrivateRoute
