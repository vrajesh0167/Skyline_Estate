import React, { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebase from '../Firebase'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing(props) {
    const setProgress = props.setProgress;
    const fileRef = useRef(null);
    const [fileCount, setFileCount] = useState(0);
    const [files, setFiles] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        imageUrls: [],
        Name: '',
        description: '',
        address: '',
        type: 'rent',
        parking: false,
        furnished: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,

    });
    // console.log(formData);
    const [ImageUploadError, setImageUploaderror] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files;
        setFiles(selectedFile);
        setFileCount(selectedFile.length);
    }

    useEffect(() => {
        setProgress(10);
        setTimeout(() => {
            setProgress(100);
        }, 500);
    }, []);

    const ImagesUploadHandler = (e) => {
        e.preventDefault();
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            const UploadedImages = [];
            // console.log(UploadedImages);

            for (let i = 0; i < files.length; i++) {
                // console.log(files[i]);
                UploadedImages.push(storaImage(files[i]));
            }

            Promise.all(UploadedImages).then((urls) => {
                // console.log("urls:- ", urls);
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploaderror(true);
                setUploading(false);
            }).catch((err) => {
                console.log(err);
                setImageUploaderror('Image uploaded failed (10 MB max per image)');
                setUploading(false);
            })
        } else {
            setImageUploaderror("You can upload 6 images per listing")
            setUploading(false);
        }
    }   

    const storaImage = (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(firebase);
            // console.log(storage);
            const fileName = new Date().getTime() + file.name;
            // console.log(fileName);
            const storageRef = ref(storage, fileName);
            // console.log(storageRef);
            const uploadTask = uploadBytesResumable(storageRef, file);
            // console.log(uploadTask);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + Math.round(progress) + '% done');
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        })
    }

    const imageRemoveHandler = (index) => {
        const updateImageUrls = formData.imageUrls.filter((_, i) => i !== index)
        setFormData({
            ...formData,
            imageUrls: updateImageUrls
        });
        setFileCount(updateImageUrls.length);
    }

    const changeHandler = (e) => {
        if (e.target.id === 'rent' || e.target.id === 'sale') {
            setFormData({ ...formData, type: e.target.id })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({ ...formData, [e.target.id]: e.target.checked });
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'checkboxs') {
            setFormData({ ...formData, [e.target.id]: e.target.value});
        }
        if(e.target.id === 'description'){
            setFormData({ ...formData, description: e.target.value});
        }
    }

    const FormSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) {
                return setError("You must be upload to least one image")
            }
            if (+formData.regularPrice < +formData.discountPrice) {
                return setError("Discount Price must be less then regular price")
            }

            setLoading(true);

            const res = await fetch('/api/create/listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData, userRef: currentUser._id
                })
            });
            const data = await res.json();
            console.log(data);
            if(data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    return (
        <div className=' max-w-4xl shadow-xl mx-auto p-3'>
            <h1 className=' text-center text-3xl font-semibold text-slate-700 my-7'>Create a Listing</h1>
            <form action="" method='post' className=' flex sm:flex-row flex-col gap-4' onSubmit={FormSubmitHandler}>
                <div className=' flex flex-col gap-4 flex-1'>
                    <input type="text" name="Name" id="Name" required placeholder='Name' className=' border-2 p-3 rounded-lg' value={formData.Name} onChange={changeHandler} />
                    <textarea type='text' id="description" onChange={changeHandler} value={formData.description}  required placeholder='Description' className=' border-2 p-3 rounded-lg' />
                    <input type="text" name="address" id="address" required placeholder='Address' className=' border-2 p-3 rounded-lg' value={formData.address} onChange={changeHandler} />

                    <div className=' flex gap-6 flex-wrap'>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='sale' className=' w-5' checked={formData.type === 'sale'} onChange={changeHandler} />
                            <span>Sell</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='rent' className=' w-5' checked={formData.type === 'rent'} onChange={changeHandler} />
                            <span>Rent</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='parking' className=' w-5' checked={formData.parking} onChange={changeHandler} />
                            <span>Parking spot</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='furnished' className=' w-5' checked={formData.furnished} onChange={changeHandler} />
                            <span>Furnished</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='offer' className=' w-5' checked={formData.offer} onChange={changeHandler} />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className=' flex gap-6 flex-wrap'>
                        <div className=' flex items-center gap-2'>
                            <input type="number" id='bedrooms' name='bedrooms' min={1} max={10} required className=' border-2 border-gray-300 p-3 rounded-lg' value={formData.bedrooms} onChange={changeHandler} />
                            <p>Beds</p>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <input type="number" id='bathrooms' name='bathrooms' min={1} max={10} required className=' border-2 border-gray-300 p-3 rounded-lg' value={formData.bathrooms} onChange={changeHandler} />
                            <p>Bath</p>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <input type="number" id='regularPrice' name='regularPrice' min={50} max={10000000} required className=' border-2 border-gray-300 p-3 rounded-lg' value={formData.regularPrice} onChange={changeHandler} />
                            <div className=' flex flex-col items-center'>
                                <p>Regular Price</p>
                                {
                                    formData.type === 'rent' ? (
                                        <span className=' text-xs'>($ / Year)</span>
                                    ) : ('')
                                }
                            </div>
                        </div>
                        {
                            formData.offer === true ? (
                                <div className=' flex items-center gap-2'>
                                    <input type="number" id='discountPrice' name='discountPrice' min={0} max={100} required className=' border-2 border-gray-300 p-3 rounded-lg' value={formData.discountPrice} onChange={changeHandler} />
                                    <div className=' flex flex-col items-center'>
                                        <p>Discounted Price</p>
                                        <span className=' text-xs'>($ / Year)</span>
                                    </div>
                                </div>
                            ) : ('')
                        }
                    </div>
                </div>

                <div className=' flex flex-col gap-4 flex-1'>
                    <p className=' font-semibold'>Images: <span className=' text-gray-500 font-normal'>The first image will be the cover (max 6)</span></p>

                    <div className=' flex  gap-3'>
                        <input type="file" name="image" id="image" ref={fileRef} hidden accept='image/*' multiple className=' border-2 p-3 rounded-lg w-full' onChange={handleFileChange} />
                        <p className='  w-full border-2 items-center flex p-3'>
                            <i className="ri-folder-upload-fill text-2xl text-sky-600 cursor-pointer" onClick={() => fileRef.current.click()}></i>
                            {fileCount === 1 ? (
                                <span>{files[0].name}</span>
                            ) : (
                                <span>{fileCount} files selected</span>
                            )}
                        </p>

                        <button disabled={uploading} type='submit' onClick={ImagesUploadHandler} className=' p-3 text-lg font-semibold uppercase border-2 border-sky-600 bg-white text-sky-600 rounded-lg hover:bg-sky-600 hover:text-white transition-all'>{uploading ? "Uploading" : "Upload"}</button>
                    </div>
                    <p className=' text-rose-600 font-semibold'>
                        {ImageUploadError ? (
                            <span>{ImageUploadError}</span>
                        ) : ''}
                    </p>
                    {
                        formData.imageUrls.length > 0 ? (
                            <div className=' h-80 overflow-y-scroll'>
                                {
                                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
                                        return (
                                            <div key={url} className=' flex justify-between items-center p-3 border-2 border-gray-300'>
                                                <img src={url} alt="Listing Image" className=' w-20 h-20 object-contain rounded-lg' />
                                                <button type='button' onClick={() => imageRemoveHandler(index)} className=' border-2 border-red-600 text-red-600 bg-white py-2 px-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all'>Delete</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : ''
                    }
                    <button disabled={loading} type=' submit' className=' p-3 w-full border-2 border-sky-600 rounded-lg text-lg font-semibold bg-sky-600 text-white hover:bg-white hover:text-sky-600'>{loading ? "Creating..." : "Create Listing"}</button>

                    {error && <p className='text-rose-600 font-semibold'>{typeof error === 'object' ? error.message : error}</p>}
                </div>
            </form >
        </div >
    )
}
