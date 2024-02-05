import React, { useEffect, useState } from 'react'
import Cart from '../Components/Cart';

export default function SearchingListing(props) {
    const setProgress = props.setProgress;
    const [listingData, setListingData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/create/allListing');
                const data = await res.json();
                if(data.success === false){
                    console.log(error);
                    return;
                }
                // console.log('listing :- ', data);
                setListingData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setProgress(100)
            }
        }

        setProgress(10);

        fetchData();
    }, [])
    return (
        <div className=' searching_section'>
            <div className=' border-e-2 p-9 lg:min-h-screen h-auto'>
                <form action="" className=' flex flex-col gap-7'>
                    <div className=' flex items-center gap-3'>
                        <label htmlFor="searchterm" className=' text-slate-500 text-lg font-semibold whitespace-nowrap'>Search Term : </label>
                        <input type="text" name='searchterm' id='searchterm' className=' w-full p-3 rounded-lg font-semibold text-slate-500 focus:outline-none focus:outline-slate-500 focus:outline-2 ' placeholder='Search...' />
                    </div>
                    <div className=' flex items-center gap-2'>
                        <label className=' text-slate-500 text-lg font-semibold whitespace-nowrap'>Type : </label>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='all' id='all' className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Rent & Sale</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='rent' id='rent' className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Rent </span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='sale' id='sale' className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Sale </span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='offer' id='offer' className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Offer </span>
                        </div>
                    </div>
                    <div className=' flex items-center gap-2'>
                        <label className=' text-slate-500 text-lg font-semibold whitespace-nowrap'>Amenities : </label>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='parking' id='parking' className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Parking </span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='furnished' id='furnished' className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Furnished </span>
                        </div>
                    </div>
                    <div className=' flex items-center gap-2'>
                        <label className=' text-slate-500 text-lg font-semibold whitespace-nowrap'>Sort : </label>
                        <select name="sort_order" id="sort_order" className=' p-3 focus:outline-none rounded-lg'>
                            <option value="Latest">Latest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Price high to low">Price high to low</option>
                            <option value="Price low to high">Price low to high</option>
                        </select>
                    </div>
                    <button className=' bg-sky-600 border-2 border-sky-600 rounded-lg text-white p-3 text-lg font-semibold uppercase hover:bg-white hover:text-sky-600 transition-all'>Search</button>
                </form>
            </div>
            <div className=' p-4 '>
                <div className=' my-9'>
                    <h2 className=' text-3xl xl:text-4xl font-semibold text-slate-600'>Listing <span className=' font-bold text-gray-700'>result : </span></h2>
                </div>
                <div className=' real_estate grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {
                        Array.isArray(listingData.listings) &&
                        listingData.listings.map((item) => (
                            <Cart key={item._id} listing={item} user={listingData.user}></Cart>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
