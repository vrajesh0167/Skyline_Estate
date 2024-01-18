import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebase from '../Firebase';
import { userUpdateFail, userUpdateStart, userUpdateSuccess } from '../Store/User/Userslice';

export default function Profile(props) {
    const setProgress = props.setProgress;
    const { currentUser, error } = useSelector((state) => state.user);
    // console.log(currentUser);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    // console.log(filePerc);
    const [isFileUploadError, setIsFileUploadError] = useState(false)
    const [formData, setFormData] = useState({});
    // console.log(formData);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    
    const dispatch = useDispatch()

    useEffect(() => {
        setProgress(10);
        setTimeout(() => {
            setProgress(100);
        }, 500);
    }, [])

    useEffect(() => {
        if (file) {
            fileUploadHandler(file);
        }
    }, [file]);

    const fileUploadHandler = (file) => {
        const storage = getStorage(firebase);
        // console.log(file.name);
        const fileName = new Date().getTime() + file.name;
        // console.log(fileName);
        const storageRef = ref(storage, fileName);
        // console.log(storageRef);
        const uploadTask = uploadBytesResumable(storageRef, file);
        // console.log(uploadTask);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(`Upload is ${progress}% done`);
            setFilePerc(Math.round(progress));
        },
            (error) => {
                setIsFileUploadError(true);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL });
                });
            }
        )
    }

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        dispatch(userUpdateStart())
        try {
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();
            console.log("updateData :-", data);
            if (data.success === false) {
                dispatch(userUpdateFail(data.message));
                return;
            }
            dispatch(userUpdateSuccess(data));
            setIsUpdateSuccess(true);
        } catch (error) {
            dispatch(userUpdateFail(error.message));
            console.log(error.message);
        }
    }

    return (
        <div className=' p-3 max-w-lg mx-auto shadow-xl rounded-lg'>
            <h1 className=' text-center my-7 text-3xl font-semibold text-slate-700'>Profile</h1>
            <form action="" method='post' onSubmit={SubmitHandler}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} accept='image/*' hidden />
                <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className=' w-28 h-28 rounded-full bg-cover mx-auto mb-5 cursor-pointer' title='Change Profile' />
                <p className=' text-sm text-center mb-6'>
                    {
                        isFileUploadError ? (
                            <span className=' text-red-500'>Image Upload error(image must be less then 10 Mb)</span>
                        ) : (
                            filePerc > 0 && filePerc < 100 ? (
                                <span className=' text-green-500'>{filePerc}% uploaded</span>
                            ) : (
                                filePerc === 100 ? (
                                    <span className=' text-green-500'>Image Uploaded Succesfully !</span>
                                ) : ""
                            )
                        )
                    }
                </p>

                <input type="text" name='username' id='username' defaultValue={currentUser.username} onChange={changeHandler} placeholder='Username' autoComplete="username" className=' w-full rounded-lg p-3 my-2' />
                <input type="email" name='email' id='email' defaultValue={currentUser.email} onChange={changeHandler} placeholder='Email' autoComplete="email" className=' w-full rounded-lg p-3 my-2' />
                <input type="password" name='password' id='password' defaultValue={currentUser.password} onChange={changeHandler} placeholder='Password' autoComplete="current-password" className=' w-full rounded-lg p-3 my-2' />

                <button type='submit' className=' border-2 w-full border-sky-600  rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 hover:bg-white transition-all relative z-10 my-2'>Update</button>
            </form>

            <p className=' text-base font-medium text-center text-red-600'>{error ? error : ''}</p>

            <p className=' text-base font-medium text-center text-green-500'>{isUpdateSuccess ? "Your profile update successfully." : ''}</p>

            <div className='flex justify-between mt-5'>
                <button className='bg-red-700 text-white p-3 rounded-lg border-2 border-red-700 hover:text-red-700 hover:bg-white transition-all'>Delete Account</button>
                <button className='bg-red-700 text-white p-3 rounded-lg border-2 border-red-700 hover:text-red-700 hover:bg-white transition-all'>Sign Out</button>
            </div>
        </div>
    )
}
