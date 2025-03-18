import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebase from '../Firebase';
import { UserOutStart, userOutFail, userOutSuccess, userUpdateFail, userUpdateStart, userUpdateSuccess } from '../Store/User/Userslice';
import { Link, useLocation } from 'react-router-dom'

export default function Profile(props) {
    const setProgress = props.setProgress;
    const { currentUser, error, loading } = useSelector((state) => state.user);
    // console.log(currentUser);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    // console.log(filePerc);
    const [isFileUploadError, setIsFileUploadError] = useState(false)
    const [formData, setFormData] = useState({});
    // console.log(formData);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    // Show Listing state
    const [showListingError, setShowListingError] = useState(false);
    const [userListings, setUserListing] = useState([]);
    // console.log(userListings);

    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

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

    // onChange Handler
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    // submit Handler
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

    // signout Handler
    const signOutHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(UserOutStart());

            const res = await fetch(`/api/user/signout/${currentUser._id}`, {
                method: 'DELETE',
            })
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                dispatch(userOutFail(data.message));
                return;
            }
            dispatch(userOutSuccess());
            setFormData({});
        } catch (error) {
            dispatch(userOutFail(error.message));
            console.log(error);
        }
    }

    // Delete Handler
    const deleteHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(UserOutStart());

            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                dispatch(userOutFail(data.message));
                return;
            }
            dispatch(userOutSuccess());
        } catch (error) {
            dispatch(userOutFail(error.message));
        }
    }

    const showListingHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/create/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowListingError(data.message);
                return;
            }
            setUserListing(data);
        } catch (error) {
            console.log(error);
            setShowListingError(error);
        }
    }

    const deleteListingHandler = async (listingId) => {
        try {
            const res = await fetch(`/api/create/delete/${listingId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setUserListing((prev) => prev.filter((listing) => listing._id !== listingId))
        } catch (error) {
            console.log(error);
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

                <button disabled={loading} type='submit' className=' border-2 w-full border-sky-600  rounded-lg p-3 bg-sky-600 text-white  text-lg font-medium hover:text-sky-600 hover:bg-white transition-all relative z-10 my-2'>{loading ? "Updating..." : "Update"}</button>
            </form>

            <button className=' border-2 border-sky-600 w-full p-3 rounded-lg bg-sky-600 text-white text-lg font-medium hover:text-sky-600 hover:bg-white transition-all '><Link to={'/createListing'}>Create Listing</Link></button>

            <p className=' text-base font-medium text-center text-red-600'>{error ? error : ''}</p>

            <p className=' text-base font-medium text-center text-green-500'>{isUpdateSuccess ? "Your profile update successfully." : ''}</p>

            <div className='flex justify-between mt-5'>
                <button className='bg-red-700 text-white p-3 rounded-lg border-2 border-red-700 hover:text-red-700 hover:bg-white transition-all' onClick={deleteHandler}>Delete Account</button>
                <button className='bg-red-700 text-white p-3 rounded-lg border-2 border-red-700 hover:text-red-700 hover:bg-white transition-all' onClick={signOutHandler}>Sign Out</button>
            </div>

            {/* show listing button and listing */}
            <div className=' text-center mt-5'>
                <button className=' bg-sky-600 py-1 px-3 text-white font-semibold border-2 border-sky-600 rounded-lg hover:bg-white hover:text-sky-600 transition-all ' onClick={showListingHandler}>Show Listing</button>
            </div>
            <p className=' text-red-700 font-medium'>{showListingError ? showListingError : ''}</p>
            {
                userListings.length > 0 ? (
                    <div className=' mt-5 flex flex-col gap-4'>
                        <h1 className=' my-7 text-3xl text-center font-semibold text-slate-700'>Your listings</h1>

                        {
                            userListings.map((listing) => (
                                <div key={listing._id} className=' flex items-center justify-between border-2 p-2 '>
                                    <Link to={`${isAdmin ? `/admin/listing/${listing._id}` : `/admin/listing/${listing._id}`}`}>
                                        <img src={listing.imageUrls[0]} alt="listing image" className=' object-contain w-24 h-20 rounded-lg' />
                                    </Link>
                                    <Link to={`${isAdmin ? `/admin/listing/${listing._id}` : `/admin/listing/${listing._id}`}`} className=' flex-1 text-lg font-semibold text-slate-700 ms-2 truncate'>
                                        <p>{listing.Name}</p>
                                    </Link>
                                    <div className=' flex flex-col gap-2 text-center'>
                                        <Link to={`/updateListing/${listing._id}`}>
                                            <button className=' py-1 px-2 bg-sky-600 text-white border border-sky-600 rounded-lg hover:text-sky-600 hover:bg-white transition-all'>Edit</button>
                                        </Link>
                                        <button onClick={() => deleteListingHandler(listing._id)} className=' py-1 px-2 bg-red-700 text-white border border-red-700 rounded-lg hover:text-red-700 hover:bg-white transition-all'>Delete</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : ''
            }

        </div>
    )
}
