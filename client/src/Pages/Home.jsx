import React, { useEffect, useState } from 'react'
import { Link, } from 'react-router-dom'
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
import homeRev6 from '../assets/images/main-home-img-1.jpg';
import Cart from '../Components/Cart';

export default function Home(props) {
  const setProgress = props.setProgress;
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
        // console.log('listing :- ', data);
        // Slice the first 4 items from the data array
        const slicedData = data.listings.slice(0,);
        setListingData({ ...data, listings: slicedData });
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
              <Link to={'/searchingListing'} className='text-sm sm:text-lg font-bold'>
                <button className=' bg-slate-600 text-gray-300 py-2 px-5 border-2 border-slate-600 rounded-lg hover:bg-white hover:text-slate-600 transition-all'>Let's Start now...</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* real estate section (Home_section2) */}
      <div className='my-24 container mx-auto'>
        <div className=' mb-12'>
          <h2 className=' text-3xl xl:text-5xl font-semibold text-slate-600'>Our choice of <br className=' lg:block hidden' /> popular <span className=' font-bold text-gray-700'>real estate</span></h2>
        </div>
        <div className=' real_estate grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {
            Array.isArray(listingData.listings) &&
            listingData.listings.map((item) => (
              <Cart key={item._id} listing={item} user={listingData.user}></Cart>
            ))
          }
        </div>
        <div className=' text-center mt-14'>
          <Link to={'/searchingListing'}>
            <button className=' bg-sky-600 text-white text-lg font-semibold py-3 px-5 rounded-lg border-2 border-sky-600 hover:bg-white hover:text-sky-600 transition-all'>Browse More Properties</button>
          </Link>
        </div>
      </div>

      {/* home_section3 */}
      <div className=' home_section3 py-24  lg:ps-20 px-10 container mx-auto'>
        <div className=' grid grid-cols-1 lg:grid-cols-2 grid-flow-row'>
          <div className='home_img relative'>
            <img src={homeRev6} alt="homerev-6" className=' object-cover rounded-lg relative z-10 h-full' />
            {/* <div className='home_img relative'></div> */}
          </div>
          <div className=' ps-12 lg:pt-0 pt-14'>
            <h2 className=' text-3xl xl:text-5xl font-semibold text-slate-600'>Modern spaces and <br className=' lg:block hidden' /><span className=' font-bold text-gray-700'>premium</span> design</h2>
            <p className=' text-lg font-normal text-gray-500 mt-8'>Lorem ipsum dolor sit amet, minimum inimicus quo no, at vix primis viderere vituperatoribus. In corpora argumentum.</p>
            <ul className=' mt-8'>
              <li className=' text-lg font-normal text-gray-500'><i className="ri-arrow-right-double-fill"></i> Mea omnium explicari</li>
              <li className=' text-lg font-normal text-gray-500'><i className="ri-arrow-right-double-fill"></i> His no legere feugaitoer</li>
              <li className=' text-lg font-normal text-gray-500'><i className="ri-arrow-right-double-fill"></i> illum idquem</li>
            </ul>
            <Link to={'/searchingListing'}>
              <button className=' bg-yellow-400 border-2 border-yellow-400 mt-8 py-3 px-5 rounded-lg text-lg font-semibold text-white hover:text-yellow-400 hover:bg-white transition-all'>Search Property</button>
            </Link>
          </div>
        </div>
      </div>

      {/* home_section4 */}
      <div className=' container py-24 mx-auto'>
        <div className=' mb-16'>
          <h2 className=' text-3xl xl:text-5xl font-semibold text-slate-600'>How It works? <br className=' lg:block hidden' /> Find a <span className=' font-bold text-gray-700'>perfect home</span></h2>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className=' pe-5 pb-2 flex flex-col items-end md:border-e-2 border-gray-400 '>
            <div className=''>
              <div>
                <i className="ri-home-office-fill text-5xl text-slate-700 "></i>
              </div>
              <h3 className=' mt-4 text-2xl font-bold text-slate-600'>Find real estate</h3>
              <p className=' text-lg font-normal text-gray-500 mt-1'>Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.</p>
            </div>
          </div>
          <div className=' pe-5 pb-2 flex flex-col items-end lg:border-e-2 border-gray-400'>
            <div className=''>
              <div>
                <i className="icofont icofont-home text-5xl text-slate-700"></i>
              </div>
              <h3 className=' mt-4 text-2xl font-bold text-slate-600'>Meet relator</h3>
              <p className=' text-lg font-normal text-gray-500 mt-1'>Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.</p>
            </div>
          </div>
          <div className=' pe-5 pb-2 flex flex-col items-end md:border-e-2 border-gray-400'>
            <div className=''>
              <div>
                <i className="ri-file-text-line text-5xl text-slate-700"></i>
              </div>
              <h3 className=' mt-4 text-2xl font-bold text-slate-600'>Documents</h3>
              <p className=' text-lg font-normal text-gray-500 mt-1'>Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.</p>
            </div>
          </div>
          <div className=' pe-5 pb-2 flex flex-col items-end'>
            <div className=' '>
              <div>
                <i className="icofont icofont-key text-5xl text-slate-700"></i>
              </div>
              <h3 className=' mt-4 text-2xl font-bold text-slate-600'>Take the keys</h3>
              <p className=' text-lg font-normal text-gray-500 mt-1'>Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
