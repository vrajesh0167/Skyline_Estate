import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import aboutImg1 from '../assets/images/about-us-img1.jpg'
import aboutImg2 from '../assets/images/about-us-img3.jpg'

export default function About(props) {
  const setProgress = props.setProgress

  useEffect(() => {
    setProgress(10)
    setTimeout(() => {
      setProgress(100)
    }, 500)
  }, [])

  return (
    <div>
      <div className='about_title_section mx-5 rounded-lg'>
        <div className=' container about_title flex items-center mx-auto'>
          <h2 className=' text-6xl sm:text-7xl text-white font-semibold'>About Us</h2>
        </div>
      </div>

      {/* vision_section */}
      <div className=' pt-24 pb-12 '>
        <div className=' container mx-auto grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-5'>
          <div>
            <img src={aboutImg1} alt="about img us" className=' object-cover w-full rounded-lg' />
          </div>
          <div className=' lg:ps-12 flex justify-center flex-col'>
            <h2 className=' text-4xl sm:text-5xl font-semibold mb-3'>Vision</h2>
            <p className=' text-lg sm:text-xl font-normal text-gray-500 mb-9'>Mazim saepe instructior mel ei, sanctus assueverit per at, ad eam veri putent nonumes. Id duo modo quidam maluisset, ut mel tractatos intellegat. Ea electram repudiandae qui. Ea soluta meliore accumsan vel, est veniam populo ea. Mel habeo elitr dissentiunt id, oratio fabulas lobortis te pri.</p>
            <Link to={'/searchingListing'}>
              <button className=' bg-yellow-500 py-3 px-5 rounded-lg border-2 border-yellow-500 text-white font-semibold text-lg hover:bg-white hover:text-yellow-500 transition-all'>view more</button>
            </Link>
          </div>
        </div>
      </div>

      {/* mision_section */}
      <div className=' pb-24 pt-12 '>
        <div className=' container mx-auto grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-5'>
          <div className=' lg:ps-12 flex justify-center flex-col'>
            <h2 className=' text-4xl sm:text-5xl font-semibold mb-3'>Mission</h2>
            <p className=' text-lg sm:text-xl font-normal text-gray-500 mb-9'>Repudiandae qui ea soluta meliore accumsan vel, est veniam populo ea. Mel habeo nonumes. Id duo modo quidam maluisset, ut tractatos intellegat. Ea electram Mazim saepe instructior mel ei, sanctus assueverit per at, mel dissentiunt id, oratio fabulas lobortis te pri probo dolore vix vero.</p>
            <Link to={'/searchingListing'}>
              <button className=' bg-yellow-500 py-3 px-5 rounded-lg border-2 border-yellow-500 text-white font-semibold text-lg hover:bg-white hover:text-yellow-500 transition-all'>view more</button>
            </Link>
          </div>
          <div>
            <img src={aboutImg2} alt="about img us" className=' object-cover w-full rounded-lg' />
          </div>
        </div>
      </div>

      {/* about_last section */}
      <div className='about_last_section mx-5 rounded-lg'>
        <div className=' container about_last mx-auto flex flex-col justify-center'>
          <h2 className=' text-4xl sm:text-7xl font-semibold text-white max-w-2xl'>Premium Houses and Apartments</h2>
          <p className=' text-lg text-white font-semibold mt-3'>* Save your time and easily rent or sell your property</p>
        </div>
      </div>
    </div>
  )
}
