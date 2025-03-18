import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
import Cart from '../Components/Cart';
// import images dor swiper slide
import homeRev1 from '../assets/images/home-rev-img-1.jpg';
import homeRev2 from '../assets/images/home-rev-img-2.jpg';
import homeRev3 from '../assets/images/home-rev-img-3.jpg';
import homeRev4 from '../assets/images/home-rev-img-4.jpg';
import homeRev5 from '../assets/images/home_img_2.png';
import homeRev6 from '../assets/images/main-home-img-1.jpg';
// home section 5 icons
import homePlan from '../assets/images/town-plan.png';
import renovation from '../assets/images/renovation.png';
import homeMain4 from '../assets/images/main-home-img-4.jpg';
import homeMain5 from '../assets/images/main-home-img-5.jpg';
import homeMain6 from '../assets/images/main-home-img-6.jpg';
// home section 6 images
import homeRev7 from '../assets/images/main-home-img-2.jpg';

const AdminHome = (props) => {
    const setProgress = props.setProgress;
    const [listingData, setListingData] = useState([]);
    // scroll to top
    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        ScrollToTop();

        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(location.search);
                const searchQuary = urlParams.toString();
                const res = await fetch(`/api/create/searchlistings?${searchQuary}`);
                const data = await res.json();
                if (data.success === false) {
                    return;
                }
                // console.log('listing :- ', data);
                setListingData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setProgress(100);
            }
        }

        setProgress(10);

        fetchData();
    }, [setProgress, location.search]);
    return (
        <div>
            <div className='my-24 container mx-auto px-4'>
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

export default AdminHome
