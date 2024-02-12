import React, { useEffect, useState } from 'react'
import Cart from '../Components/Cart';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner'

export default function SearchingListing(props) {
    const location = useLocation();
    const setProgress = props.setProgress;
    const [listingData, setListingData] = useState([]);
    // console.log(listingData);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort_order: 'createdAt',
        order: 'desc',
    });
    // console.log(formData);


    // scroll to top
    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    //loader
    <Bars
        height="80"
        width="80"
        marging='auto'
        color="#374151"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />

    useEffect(() => {
        ScrollToTop();

        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sort_orderFromUrl = urlParams.get('sort_order');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sort_orderFromUrl || orderFromUrl) {
            setFormData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort_order: sort_orderFromUrl || 'createdAt',
                order: orderFromUrl || 'desc',
            })
        }


        const fetchData = async () => {
            try {
                setLoading(true);
                const searchQuary = urlParams.toString();
                const res = await fetch(`/api/create/searchlistings?${searchQuary}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    setLoading(false);
                    return;
                }
                // console.log('listing :- ', data);
                setListingData(data);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.log(error);
                setLoading(false);
            } finally {
                setProgress(100);
            }
        }

        setProgress(10);

        fetchData();
    }, [setProgress, location.search]);

    const changeHandler = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setFormData({ ...formData, type: e.target.id });
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({ ...formData, [e.target.id]: e.target.checked });
        }
        if (e.target.id === 'searchTerm') {
            setFormData({ ...formData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort_order') {
            const sort_order = e.target.value.split('_')[0] || 'createdAt';
            const order = e.target.value.split('_')[1] || 'desc';
            setFormData({ ...formData, sort_order, order });
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', formData.searchTerm);
        urlParams.set('type', formData.type);
        urlParams.set('parking', formData.parking);
        urlParams.set('furnished', formData.furnished);
        urlParams.set('offer', formData.offer);
        urlParams.set('sort_order', formData.sort_order);
        urlParams.set('order', formData.order);
        const searchQuary = urlParams.toString();
        navigate(`/searchingListing?${searchQuary}`);
    }

    return (
        <div className=' searching_section'>
            <div className=' border-e-2 py-9 px-2 sm:py-9 sm:px-9 lg:min-h-screen h-auto'>
                <form onSubmit={submitHandler} className=' flex flex-col gap-7'>
                    <div className=' flex items-center gap-3'>
                        <label htmlFor="searchterm" className=' text-slate-500 text-lg font-semibold whitespace-nowrap'>Search Term : </label>
                        <input type="text" name='searchTerm' id='searchTerm' value={formData.searchTerm} onChange={changeHandler} className=' w-full p-3 rounded-lg font-semibold text-slate-500 focus:outline-none focus:outline-slate-500 focus:outline-2 ' placeholder='Search...' />
                    </div>
                    <div className=' flex items-center gap-2 flex-wrap'>
                        <label className=' text-slate-500 text-lg font-semibold whitespace-nowrap'>Type : </label>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='all' id='all' checked={formData.type === 'all'} onChange={changeHandler} className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Rent & Sale</span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='rent' id='rent' checked={formData.type === 'rent'} onChange={changeHandler} className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Rent </span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='sale' id='sale' checked={formData.type === 'sale'} onChange={changeHandler} className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Sale </span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='offer' id='offer' checked={Boolean(formData.offer)} onChange={changeHandler} className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Offer </span>
                        </div>
                    </div>
                    <div className=' flex items-center gap-2 flex-wrap'>
                        <label className=' text-slate-500 text-lg font-semibold whitespace-nowrap'>Amenities : </label>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='parking' id='parking' checked={formData.parking} onChange={changeHandler} className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Parking </span>
                        </div>
                        <div className=' flex gap-2'>
                            <input type="checkbox" name='furnished' id='furnished' checked={formData.furnished} onChange={changeHandler} className=' w-5' />
                            <span className=' text-lg text-slate-500 font-medium whitespace-nowrap'> Furnished </span>
                        </div>
                    </div>
                    <div className=' flex items-center gap-2'>
                        <label className=' text-slate-500 text-lg font-semibold whitespace-nowrap'>Sort : </label>
                        <select name="sort_order" id="sort_order" defaultValue={'createdAt_desc'} onChange={changeHandler} className=' p-3 focus:outline-none rounded-lg'>
                            <option value="createdAt_asc">Oldest</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="regularprice_desc">Price high to low</option>
                            <option value="regularprice_asc">Price low to high</option>
                        </select>
                    </div>
                    <button type='submit' className=' bg-sky-600 border-2 border-sky-600 rounded-lg text-white p-3 text-lg font-semibold uppercase hover:bg-white hover:text-sky-600 transition-all'>Search</button>
                </form>
            </div>
            <div className=' p-4 '>
                <div className=' my-9'>
                    <h2 className=' text-3xl xl:text-4xl font-semibold text-slate-600'>Listing <span className=' font-bold text-gray-700'>result : </span></h2>
                </div>
                <div className=' p-3'>
                    {!loading && listingData.listings < 1 && (
                        <p className=' text-center text-2xl font-semibold text-gray-500 '>Listing not found</p>
                    )}
                    {
                        loading ? (
                            <div className=' flex justify-center'>
                                <Bars/>
                            </div>
                        ) : (
                            <div className=' real_estate grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                                {
                                    Array.isArray(listingData.listings) &&
                                    listingData.listings.map((item) => (
                                        <Cart key={item._id} listing={item} user={listingData.user}></Cart>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
