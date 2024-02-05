import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';    
import { useParams } from 'react-router-dom';
import { EffectFade, Navigation, Autoplay } from 'swiper/modules';


export default function Listing(props) {
    const setProgress = props.setProgress;
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [listing, setListing] = useState(null);
    // console.log(listing);

    const DisLestPrice = Number(listing && listing.regularPrice) - Number(listing && listing.discountPrice);


    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/create/getlisting/${id}`)
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    console.log(data.message);
                }
                setListing(data);
                setError(null);
            } catch (error) {
                console.log(error.message);
                setError(true);
            } finally {
                setProgress(100)
            }
        }

        setProgress(10);

        fetchData();
    }, [setProgress, id]);
    return (
        <div>
            {
                error === true ? (
                    <p className=' text-rose-600 font-semibold'>{error}</p>
                ) : listing !== null ? (
                    <div>
                        <Swiper navigation={true} loop={true} effect={'fade'}  autoplay={{ delay: 3000, pauseOnMouseEnter: true }} modules={[EffectFade, Navigation, Autoplay]} >
                            {
                                listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                        <img src={url} alt="" className=' object-cover w-full h-screen' />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className=' max-w-4xl mx-auto flex flex-col p-5 mt-9 shadow-xl rounded-lg'>
                            <div >
                                <h2 className=' text-3xl font-bold text-slate-600'>
                                    {capitalizeFirstLetter(listing.Name)} <span>- ${DisLestPrice}</span> {
                                        listing.type === 'rent' ? (
                                            <span className=' text-lg'>/ Year</span>
                                        ) : ('')
                                    }
                                </h2>
                                <p className=' text-base font-semibold text-slate-600 mt-3'><i className="ri-map-pin-fill text-lg text-green-600" /> {listing.address}</p>
                                <div className=' flex gap-4 mt-1'>
                                    <button className=' text-lg font-semibold py-2 px-4 bg-red-700 text-white border-2 border-red-700 rounded-lg hover:bg-white hover:text-red-700 transition-all'>For {capitalizeFirstLetter(listing.type)}</button>
                                    {
                                        listing.offer === true ? (
                                            <button className=' text-lg font-semibold py-2 px-4 bg-green-700 text-white border-2 border-green-700 rounded-lg hover:bg-white hover:text-green-700 transition-all'>${listing.discountPrice} Discount</button>
                                        ) : ('')
                                    }
                                </div>
                                <p className=' text-lg text-slate-600 font-semibold mt-2'>Description - <span className=' font-normal'>{listing.description}</span></p>
                                <ul className=' flex gap-4 flex-wrap'>
                                    <li className=' text-lg font-semibold text-slate-600'><i className="ri-hotel-bed-fill text-green-700 text-lg"></i> {listing.bedrooms} Bed</li>
                                    <li className=' text-lg font-semibold text-slate-600'><i className="icofont icofont-bathtub text-green-700 text-xl"></i> {listing.bathrooms} Bath</li>
                                    <li className=' text-lg font-semibold text-slate-600'><i class="ri-parking-box-line text-green-700 text-xl"></i> {listing.parking} { listing.parking === true ? 'Parking Shot' : 'Not Parking shot'}</li>
                                    <li className=' text-lg font-semibold text-slate-600'><i class="ri-sofa-fill text-green-700 text-xl"></i> {listing.furnished} { listing.furnished === true ? 'Furnished' : 'Not Furnished'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : ''
            }
        </div>
    )
}
