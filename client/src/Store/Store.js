import {configureStore} from '@reduxjs/toolkit'
import Userslice from './User/Userslice'

export const Store = configureStore({
    reducer: {
        user: Userslice
    }
})