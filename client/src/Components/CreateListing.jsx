import React, { useEffect, useRef, useState } from 'react'

export default function CreateListing(props) {
    const setProgress = props.setProgress;
    const fileRef = useRef(null);
    const [fileCount, setFileCount] = useState(0);

    const handleFileChange = (e) => {
        const files = e.target.files;
        setFileCount(files.length);
    }

    useEffect(() => {
        setProgress(10);
        setTimeout(() => {
            setProgress(100);
        }, 500);
    }, []);

    return (
        <div className=' max-w-4xl shadow-xl mx-auto p-3'>
            <h1 className=' text-center text-3xl font-semibold text-slate-700 my-7'>Create a Listing</h1>
            <form action="" method='post' className=' flex sm:flex-row flex-col gap-4'>
                <div className=' flex flex-col gap-4 flex-1'>
                    <input type="text" name="name" id="name" required placeholder='Name' className=' border-2 p-3 rounded-lg' />
                    <textarea type='text' name="description" id="description" required placeholder='Description' className=' border-2 p-3 rounded-lg' ></textarea>
                    <input type="text" name="address" id="address" required placeholder='Address' className=' border-2 p-3 rounded-lg' />

                    <div className=' flex gap-6 flex-wrap'>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='sale' className=' w-5' />
                            <span>Sell</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='rent' className=' w-5' defaultChecked />
                            <span>Rent</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='parking' className=' w-5' />
                            <span>Parking spot</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='furnished' className=' w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" id='offer' className=' w-5' />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className=' flex gap-6 flex-wrap'>
                        <div className=' flex items-center gap-2'>
                            <input type="number" id='bedrooms' name='bedrooms' min={1} max={10} required className=' border-2 border-gray-300 p-3 rounded-lg' defaultValue={1} />
                            <p>Beds</p>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <input type="number" id='bathrooms' name='bathrooms' min={1} max={10} required className=' border-2 border-gray-300 p-3 rounded-lg' defaultValue={1} />
                            <p>Bath</p>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <input type="number" id='regularPrice' name='regularPrice' min={50} max={10000000} required className=' border-2 border-gray-300 p-3 rounded-lg' defaultValue={0} />
                            <div className=' flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className=' text-xs'>($ / Month)</span>
                            </div>
                        </div>
                        <div className=' flex items-center gap-2'>
                            <input type="number" id='discountorice' name='discountorice' min={50} max={10000000} required className=' border-2 border-gray-300 p-3 rounded-lg' defaultValue={0} />
                            <div className=' flex flex-col items-center'>
                                <p>Discounted Price</p>
                                <span className=' text-xs'>($ / Month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' flex flex-col gap-4 flex-1'>
                    <p className=' font-semibold'>Images: <span className=' text-gray-500 font-normal'>The first image will be the cover (max 6)</span></p>

                    <form className=' flex  gap-3'>
                        <input type="file" name="image" id="image" ref={fileRef} hidden accept='image/*' multiple className=' border-2 p-3 rounded-lg w-full' onChange={handleFileChange} />
                        <p className='  w-full border-2 items-center flex p-3'>
                            <i className="ri-folder-upload-fill text-2xl text-sky-600 cursor-pointer" onClick={() => fileRef.current.click()}></i>
                            <span>{fileCount} file(s) selected</span>
                        </p>

                        <button type='submit' className=' p-3 text-lg font-semibold uppercase border-2 border-sky-600 bg-white text-sky-600 rounded-lg hover:bg-sky-600 hover:text-white transition-all'>Upload</button>
                    </form>

                    <button type=' submit' className=' p-3 w-full border-2 border-sky-600 rounded-lg text-lg font-semibold bg-sky-600 text-white hover:bg-white hover:text-sky-600'>Create Listing</button>
                </div>
            </form>
        </div>
    )
}
