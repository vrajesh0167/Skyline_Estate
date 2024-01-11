import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Firebase from '../Firebase';
import { userCreateFail, userCreateSuccess } from '../Store/User/Userslice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Googleauth() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {

            const provider = new GoogleAuthProvider();
            const auth = getAuth(Firebase);

            const result = await signInWithPopup(auth, provider);
            console.log(result);

            const res = await fetch("/api/user/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json();
            console.log(data);
            dispatch(userCreateSuccess(data));
            navigate('/');

        } catch (error) {
            dispatch(userCreateFail(error.message));
            return console.log("Could not sign in with google:- ", error);
        }
    }
    return (
        <div>
            <button className=' w-full sign-btn-g border-2 border-sky-600 uppercase rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 transition-all relative z-10 mt-4' onClick={submitHandler}>Sign With Google</button>
        </div>
    )
}
