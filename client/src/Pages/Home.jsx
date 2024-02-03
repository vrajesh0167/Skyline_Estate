import React, { useEffect, useState } from 'react'
import { Link, } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
// import images dor swiper slide
import homeRev1 from '../assets/images/home-rev-img-1.jpg';
import homeRev2 from '../assets/images/home-rev-img-2.jpg';
import homeRev3 from '../assets/images/home-rev-img-3.jpg';
import homeRev4 from '../assets/images/home-rev-img-4.jpg';
import homeRev5 from '../assets/images/home_img_2.png';
// import property1 from '../assets/images/main-home-property.jpg';
// import property2 from '../assets/images/main-home-property2.jpg';
// import property3 from '../assets/images/main-home-property3.jpg';
import Cart from '../Components/Cart';

export default function Home(props) {
  const setProgress = props.setProgress;
  const { currentUser } = useSelector((state) => state.user);
  const [listingData, setListingData] = useState([]);
  // console.log(listingData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/create/allListing',);
        const data = await res.json();
        if (data.status === false) {
          console.log(data.message);
          return;
        }
        console.log('listing :- ', data);
        setListingData(data);
      } catch (error) {
        console.log("getAllListing failed :- ", error);
      } finally {
        setProgress(100)
      }
    }

    setProgress(10);

    fetchData();
  }, [])

  return (
    <div>
      <div className=' px-4 '>
        <div className=' h-screen flex justify-center items-center relative'>
          <Swiper loop={true} effect={'fade'} autoplay={{ delay: 3000, pauseOnMouseEnter: true }} modules={[EffectFade, Pagination, Autoplay]}>
            <SwiperSlide>
              <div className='swiper-slide-content'>
                <img src={homeRev1} alt="homw-rev-img1" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-slide-content'>
                <img src={homeRev2} alt="home-rev-img2" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-slide-content'>
                <img src={homeRev3} alt="home-rev-img3" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-slide-content'>
                <img src={homeRev4} alt="home-rev-img4" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-slide-content'>
                <img src={homeRev5} alt="home_img_2" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
          </Swiper>
          <div className=' home_section max-w-7xl mx-auto p-3 absolute top-1/4 left-1/4 sm:top-1/2 sm:left-1/2 z-10' >
            <div className=' flex flex-col gap-5 text-center'>
              <h1 className=' my-7 text-3xl lg:text-5xl 2xl:text-6xl font-extrabold text-gray-300 drop-shadow-lg  '>Find your next <span className=' text-gray-400'>perfect</span><br className=' md:block hidden' />place with ease</h1>
              <p className=' text-gray-200 text-sm sm:text-lg font-semibold'>Sahand Estate will help you find your home fast, easy and comfortable. <br className=' md:block hidden' /> Our expert support are always available.</p>
              <Link className='text-sm sm:text-lg font-bold'>
                <button className=' bg-slate-600 text-gray-300 py-2 px-5 border-2 border-slate-600 rounded-lg hover:bg-white hover:text-slate-600 transition-all'>Let's Start now...</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* real estate section (Home_section2) */}
      <div className='home_section2 my-24 container mx-auto'>
        <div className=' mb-12'>
          <h2 className=' text-3xl xl:text-5xl font-semibold text-slate-600'>Our choice of <br className=' lg:block hidden' /> popular <span className=' font-bold text-gray-700'>real estate</span></h2>
        </div>
        <div className=' grid grid-cols-3 grid-rows-subgrid gap-4'>
          {/* <div className=' estate'> */}
          {
            Array.isArray(listingData.listings) &&
            listingData.listings.map((item) => (
              <Cart key={item._id} listing={item} user={listingData.user}></Cart>
            ))
          }
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
