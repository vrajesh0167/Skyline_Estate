import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebase from '../Firebase';

export default function Profile(props) {
    const setProgress = props.setProgress;
    const { currentUser } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    // console.log(filePerc);
    const [isFileUploadError, setIsFileUploadError] = useState(false)
    const [formData, setFormData] = useState({});
    // console.log(formData);

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
                setFormData({...formData, avatar: downloadURL});
            });
        }
        )
    }

    return (
        <div className=' p-3 max-w-lg mx-auto shadow-xl rounded-lg'>
            <h1 className=' text-center my-7 text-3xl font-semibold text-slate-700'>Profile</h1>
            <form action="" method='post'>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} accept='image/*' hidden />
                <img  onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className=' w-28 h-28 rounded-full bg-cover mx-auto mb-5 cursor-pointer' title='Change Profile' />
                <p className=' text-sm text-center mb-6'>
                    {
                        isFileUploadError ? (
                            <span>Image Upload error(image must be less then 10 Mb)</span>
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

                <input type="text" name='username' id='username' defaultValue={currentUser.username} placeholder='Username' className=' w-full rounded-lg p-3 my-2' />
                <input type="email" name='email' id='email' defaultValue={currentUser.email} placeholder='Email' className=' w-full rounded-lg p-3 my-2' />
                <input type="password" name='password' id='password' defaultVal ue={currentUser.password} placeholder='Password' className=' w-full rounded-lg p-3 my-2' />

                <button className=' border-2 w-full border-sky-600  rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 hover:bg-white transition-all relative z-10 my-2'>Update</button>
            </form>

            <div className='flex justify-between mt-5'>
                <button className='bg-red-700 text-white p-3 rounded-lg border-2 border-red-700 hover:text-red-700 hover:bg-white transition-all'>Delete Account</button>
                <button className='bg-red-700 text-white p-3 rounded-lg border-2 border-red-700 hover:text-red-700 hover:bg-white transition-all'>Sign Out</button>
            </div>
        </div>
    )
}
