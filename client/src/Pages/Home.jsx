import React, { useEffect, useState } from 'react'
import { Link, } from 'react-router-dom'
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

export default function Home(props) {
  const setProgress = props.setProgress;
  const [listingData, setListingData] = useState([]);
  // console.log(listingData);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [formDataError, setFormDataError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [newslatter, setNewslatter] = useState('');
  const [newslatterSuccess, setNewslatterSuccess] = useState(false);
  const [newslatterError, setNewslatterError] = useState(null);
  const [uploading, setUploading] = useState(false);

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
        const slicedData = data.listings.slice(0,6);
        setListingData({ ...data, listings: slicedData });
      } catch (error) {
        console.log("getAllListing failed :- ", error);
      } finally {
        setProgress(100)
      }
    }

    setProgress(10);

    fetchData();
  }, []);

  // enquiry for this
  const onchangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const enquirySubmitHandler = async (e) => {
    e.preventDefault();
    if (formData.name === '' && formData.email === '' && formData.phone === '') {
      return setFormDataError('Please fill out this field.');
    }
    setLoading(true);
    try {
      const res = await fetch('/api/enquiry/enquiryregister', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setFormData(data);
        setEnquirySuccess(true);
        setLoading(false);
        setFormData({
          ...formData,
          name: '',
          email: '',
          phone: '',
        });
      }, 2000);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  //sign to newslatter
  const newsLatterHandler = async (e) => {
    e.preventDefault();
    if (newslatter === '') {
      return setNewslatterError('Please fill out this field.');
    }
    setUploading(true);
    try {
      const res = await fetch('/api/newslatter/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: newslatter })
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setError(data.message);
        setUploading(false);
        return;
      }
      setTimeout(() => {
        setNewslatter(data);
        setNewslatterSuccess(true);
        setUploading(false);
        setNewslatter('');
      }, 2000);
    } catch (error) {
      setError(error);
      setUploading(false);
    }
  }

  return (
    <div>
      <div className=' px-4'>
        <div className=' h-screen flex justify-center items-center relative rounded-lg overflow-hidden'>
          <Swiper loop={true} effect={'fade'} autoplay={{ delay: 3000, pauseOnMouseEnter: true }} modules={[EffectFade, Pagination, Autoplay]}>
            <SwiperSlide>
              <div className='swiper-slide-content rounded-lg'>
                <img src={homeRev1} alt="homw-rev-img1" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-slide-content rounded-lg'>
                <img src={homeRev2} alt="home-rev-img2" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-slide-content rounded-lg'>
                <img src={homeRev3} alt="home-rev-img3" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-slide-content rounded-lg'>
                <img src={homeRev4} alt="home-rev-img4" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='swiper-slide-content rounded-lg'>
                <img src={homeRev5} alt="home_img_2" className=' w-full object-cover rounded-lg h-screen' />
              </div>
            </SwiperSlide>
          </Swiper>
          <div className=' home_section max-w-7xl mx-auto p-3 absolute top-1/4 left-1/4 sm:top-1/2 sm:left-1/2 z-10' >
            <div className=' flex flex-col gap-5 text-center'>
              <h1 className=' my-7 text-3xl lg:text-5xl 2xl:text-6xl font-extrabold text-gray-300 drop-shadow-lg  '>Find your next <span className=' text-gray-400'>perfect </span><br className=' md:block hidden' />place with ease</h1>
              <p className=' text-gray-200 text-sm sm:text-lg font-semibold'>Sahand Estate will help you find your home fast, easy and comfortable. <br className=' md:block hidden' /> Our expert support are always available.</p>
              <Link to={'/searchingListing'} className='text-sm sm:text-lg font-bold'>
                <button className=' bg-slate-600 text-gray-300 py-2 px-5 border-2 border-slate-600 rounded-lg hover:bg-white hover:text-slate-600 transition-all'>Let's Start now...</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* real estate section (Home_section2) */}
      <div className='my-24 container mx-auto px-4'>
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
      <div className=' home_section3 py-24  lg:ps-20 sm:px-10 px-4 container mx-auto'>
        <div className=' grid grid-cols-1 lg:grid-cols-2 grid-flow-row'>
          <div className='home_img relative'>
            <img src={homeRev6} alt="homerev-6" className=' object-cover rounded-lg relative z-10 h-full' />
          </div>
          <div className=' sm:ps-12 lg:pt-0 pt-14'>
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
      <div className=' container py-24 mx-auto px-4'>
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

      {/* home section 4  */}
      <div className=' mx-4 home_section4 py-24 rounded-lg'>
        <div className=' container mx-auto'>
          <div className=' grid lg:grid-cols-2 grid-cols-1 grid-rows-1 lg:gap-0 gap-5 lg:p-0 p-5'>
            <div className=' lg:pe-24'>
              <div className=' flex flex-col items-center lg:items-start lg:justify-center h-full'>
                <h2 className=' mb-3 text-5xl 2xl:text-7xl font-semibold text-white '>Discover a new <br className=' hidden lg:block' /> way of living</h2>
                <p className=' text-white text-sm sm:text-lg font-semibold'>* Feugait scriptorem qui ea, quo admodum eloquentiam eu. Te malis tibique eum. Ne magna assum everti.</p>
              </div>
            </div>
            <div className=' lg:ps-24 lg:pe-11'>
              <div className=' formdiv rounded-lg'>
                <h3 className=' text-3xl font-semibold text-gray-700 '>Make an enquiry</h3>
                <p className=' mt-2 mb-7 text-gray-500 text-lg font-semibold'>Save your time and easily rent or sell your property with the lowest commission on the real estate market.</p>
                <form className=' flex flex-col gap-5' onSubmit={enquirySubmitHandler}>
                  <div>
                    <input type="text" id='name' value={formData.name} onChange={onchangeHandler} className=' p-3 w-full rounded-sm text-lg font-semibold focus:outline-none ' placeholder='Your name*' />
                    <p className=' text-lg text-red-700 font-semibold'>{formDataError}</p>
                  </div>
                  <div>
                    <input type="email" id='email' value={formData.email} onChange={onchangeHandler} className=' p-3 w-full rounded-sm text-lg font-semibold focus:outline-none ' placeholder='Your email*' />
                    <p className=' text-lg text-red-700 font-semibold'>{formDataError}</p>
                  </div>
                  <div>
                    <input type="text" id='phone' value={formData.phone} onChange={onchangeHandler} className=' p-3 w-full rounded-sm text-lg font-semibold focus:outline-none ' placeholder='Your phone number* ' />
                    <p className=' text-lg text-red-700 font-semibold'>{formDataError}</p>
                  </div>
                  <div>
                    <button type='submit' disabled={loading} className=' bg-orange-500 border-2 border-orange-500 text-white text-lg py-2 px-4 rounded-lg hover:bg-white hover:text-orange-500 transition-all'>{loading ? 'Loading...' : "Make an enquiry"}</button>
                  </div>
                </form>
              </div>
              {enquirySuccess ? (
                <div className=' bg-orange-500 mt-4 p-3 rounded-md text-lg text-white'>Thank you for your message. It has been sent.</div>
              ) : error !== null ? (
                <div className=' bg-orange-500 mt-4 p-3 rounded-md text-lg text-white'>{error}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* home section 5 */}
      <div className=' container mx-auto py-24 px-4'>
        <div className=' grid lg:grid-cols-2 grid-cols-1 row-auto lg:gap-5 gap-8'>
          <div className=' pe-28'>
            <div className=' flex flex-col justify-center'>
              <div className=' mb-5'>
                <div className=' mb-10'>
                  <h1 className=' text-5xl xl:text-5xl font-semibold text-slate-600'>Our expert will help you <br className=' lg:block hidden' /> make <span className=' font-bold text-gray-700'> the renovation</span></h1>
                </div>
              </div>

              <div className=' flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-5 mb-10'>
                <div>
                  <i className="ri-home-office-fill text-5xl text-slate-700 "></i>
                </div>
                <div>
                  <h3 className=' text-slate-700 text-3xl font-semibold mb-2'>Find inspiration</h3>
                  <p className=' text-gray-500 text-lg 2xl:text-xl font-semibold'>Sumo petentium ut per, at his wisim utinam adipis cing. Est e graeco quod suavitate vix ad praesent.</p>
                </div>
              </div>
              <div className=' flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-5 mb-10'>
                <div>
                  <img src={homePlan} alt="home plan" className=' object-cover to-slate-700' />
                </div>
                <div>
                  <h3 className=' text-slate-700 text-3xl font-semibold mb-2'>Find architect/designer</h3>
                  <p className=' text-gray-500 text-lg 2xl:text-xl font-semibold'>Sumo petentium ut per, at his wisim utinam adipis cing. Est e graeco quod suavitate vix ad praesent.</p>
                </div>
              </div>
              <div className=' flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-5 mb-10'>
                <div>
                  <img src={renovation} alt="home plan" className=' object-cover to-slate-700' />
                </div>
                <div>
                  <h3 className=' text-slate-700 text-3xl font-semibold mb-2'>Begin renovation</h3>
                  <p className=' text-gray-500 text-lg 2xl:text-xl font-semibold'>Sumo petentium ut per, at his wisim utinam adipis cing. Est e graeco quod suavitate vix ad praesent.</p>
                </div>
              </div>
            </div>
          </div>

          <div className=' grid md:grid-cols-2 grid-cols-1 grid-flow-row md:grid-rows-2 gap-5 md:p-10'>
            <div className=' md:row-start-1 md:row-span-2 md:col-start-1 md:col-span-1 md:flex md:items-center md:justify-center'>
              <img src={homeMain4} alt='home main img 4' className=' object-cover rounded-lg w-full md:h-5/6 h-full' />
            </div>
            <div className=' md:row-start-1 md:row-span-1 md:col-start-2 md:col-span-1'>
              <img src={homeMain5} alt='home main img 5' className=' object-cover rounded-lg h-full w-full' />
            </div>
            <div className=' md:row-start-2 md:row-span-1 md:col-start-2 md:col-span-1'>
              <img src={homeMain6} alt='home main img 6' className=' object-cover rounded-lg h-full w-full' />
            </div>
          </div>

        </div>
      </div>

      {/* home_section6 */}
      <div className=' home_section6 py-24  lg:ps-20 sm:px-10 px-4 container mx-auto p-3'>
        <div className=' grid grid-cols-1 lg:grid-cols-2 grid-flow-row'>
          <div className='home_img relative'>
            <img src={homeRev7} alt="homerev-6" className=' object-cover rounded-lg relative z-10 h-full' />
          </div>
          <div className=' flex flex-col justify-center sm:ps-12 lg:pt-0 pt-14'>
            <h2 className=' text-3xl xl:text-5xl font-semibold text-slate-600'>Explore your home <br className=' lg:block hidden' /><span className=' font-bold text-gray-700'>loan options</span></h2>
            <p className=' text-lg font-normal text-gray-500 mt-8'>Lorem ipsum dolor sit amet, minimum inimicus quo no, at vix primis viderere vituperatoribus. In corpora argumentum. Vix ferri dicam contentiones ne, ex appetere salutatus</p>

            <Link to={'/searchingListing'}>
              <button className=' bg-yellow-400 border-2 border-yellow-400 mt-8 py-3 px-5 rounded-lg text-lg font-semibold text-white hover:text-yellow-400 hover:bg-white transition-all'>Search Property</button>
            </Link>
          </div>
        </div>
      </div>

      {/* home_section 7 */}
      <div className=' mx-4 home_section7 py-44 rounded-lg'>
        <div className=' container mx-auto'>
          <div className=' grid lg:grid-cols-2 grid-cols-1 grid-rows-1 lg:gap-0 gap-5 lg:p-0 p-5'>
            <div className=' lg:pe-24'>
              <div className=' flex flex-col items-center lg:items-start lg:justify-center h-full'>
                <h2 className=' mb-4 text-5xl 2xl:text-7xl font-semibold text-white '>Find a home that <br className=' hidden lg:block' /> truly suits you</h2>
                <p className=' text-white text-sm sm:text-lg font-semibold'>* Feugait scriptorem qui ea, quo admodum lorem.</p>
              </div>
            </div>
            <div className=' lg:ps-24 lg:pe-11'>
              <div className=' formdiv rounded-lg'>
                <h3 className=' text-3xl font-semibold text-gray-700 '>Sign to newsletter</h3>
                <p className=' mt-2 mb-7 text-gray-500 text-lg font-semibold'>Save your time and easily rent or sell your property with the lowest commission on the real estate market.</p>
                <form className=' flex flex-col gap-5' onSubmit={newsLatterHandler}>
                  <div>
                    <input type="email" id='newslatter' value={newslatter} onChange={(e) => setNewslatter(e.target.value)} className=' p-3 w-full rounded-sm text-lg font-semibold focus:outline-none ' placeholder='Your email*' />
                    <p className=' text-lg text-red-700 font-semibold'>{newslatterError}</p>
                  </div>
                  <div>
                    <button type='submit' disabled={uploading} className=' bg-orange-500 border-2 border-orange-500 text-white text-lg py-2 px-4 rounded-lg hover:bg-white hover:text-orange-500 transition-all'>{uploading ? 'Loading...' : "Sign up"}</button>
                  </div>
                </form>
              </div>
              {newslatterSuccess ? (
                <div className=' bg-orange-500 mt-4 p-3 rounded-md text-lg text-white'>Thank you for your message. It has been sent.</div>
              ) : error !== null ? (
                <div className=' bg-orange-500 mt-4 p-3 rounded-md text-lg text-white'>{error}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
