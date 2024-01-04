import React from 'react'
import Header from './Header'
import Routs from '../Routers/Routs'

export default function Layout() {
    return (
        <div>
            <Header></Header>
            <div>
                <Routs></Routs>
            </div>
        </div>
    )
}
