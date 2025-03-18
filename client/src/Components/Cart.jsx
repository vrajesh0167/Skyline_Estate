import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link, useLocation } from 'react-router-dom';

export default function Cart(props) {

    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");
    // console.log('props.listing:', props.listing);
    // console.log('props.user:', props.user);

    const { _id, imageUrls, Name, description, address, type, regularPrice, discountPrice, bedrooms, userRef, bathrooms } = props.listing;
    // console.log(imageUrls);
    const DisLestPrice = Number(regularPrice) - Number(discountPrice);
    const DisplayImage = imageUrls.slice(0, 3);

    return (
        <div className=' estate items-stretch'>
            <div className=' w-full relative'>
                <Swiper pagination={{ clickable: true, }} spaceBetween={20} modules={[Pagination]} slidesPerView={1} slidesPerGroup={1}>
                    {
                        DisplayImage.map((urls) => (
                            <SwiperSlide key={urls}>
                                <Link to={`${isAdmin ? `/admin/listing/${_id}` : `/listing/${_id}`}`}>
                                    <img src={urls} alt="real estate" className=' object-cover rounded-lg w-full h-80' />
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div className='type absolute top-4 left-0 z-10 '>
                    <p className=' text-lg font-semibold py-1 px-4 '>{type === 'rent' ? 'For Rent' : 'Sell'}</p>
                </div>
                {props.user.map(user => (
                    userRef === user._id && (
                        <div className='profile absolute bottom-6 left-9 z-10 ps-4 flex items-center'>
                            <div className=' absolute left-0 top-1/2 ' style={{ transform: 'translate(-50%, -50%' }}>
                                <img key={user._id} src={user.avatar} alt="avatar" className='rounded-full w-14 h-14 border-2 border-slate-400' />
                            </div>
                            <span className='username py-1 px-4 font-semibold'> {user.username}</span>
                        </div>
                    )
                ))}
            </div>
            <div className=' p-4 shadow-lg rounded-b-lg'>
                <p className=' text-base font-semibold text-slate-600 mt-3'><i className="ri-map-pin-fill text-lg text-green-600" /> {address}</p>
                <h2 className=' text-3xl font-bold text-slate-600 mb-3 '>
                    <Link to={`${isAdmin ? `/admin/listing/${_id}` : `/listing/${_id}`}`} className=' relative'>{Name}</Link>
                </h2>
                <p className=' text-lg font-normal text-gray-500 line-clamp-3'>{description}</p>
                <hr className=' border-1 text-slate-800' />
                <div className=' flex justify-between'>
                    <h3 className=' text-3xl font-semibold'>{DisLestPrice.toLocaleString('en-US')}$</h3>
                    <div>
                        <ul className=' flex gap-4 sm:flex-wrap flex-col sm:flex-row'>
                            <li className=' text-lg font-semibold text-slate-600'><i className="ri-hotel-bed-fill text-green-700 text-lg"></i>{bedrooms}  Bed</li>
                            <li className=' text-lg font-semibold text-slate-600'><i className="icofont icofont-bathtub text-green-700 text-xl"></i>{bathrooms}  bath</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
