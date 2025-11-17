import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border rounded-3xl border-gray-500'>
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-gray-500'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h - [2px] bg-gray-700'></p>
            <p className='playwrite-mx-guides-regular font-medium text-sm md:text-base'> Our Best Sellers</p>
          </div>
        <h1 className=' almendra-display-regular text-3xl sm:py-3 lg:text-5xl leading - relaxed'> Latest Arrivals</h1>
        <div className='flex items-center gap-2'>
          <p className='playwrite-mx-guides-regular font-semibold text-sm md:text-base'>Shop In </p>
          <p className='w-8 md:w-11 h - [1px] bg-gray-700'></p>
        </div> 
        </div>
        </div>
        <img  className='w-full md:w-1/2 rounded-3xl' src={assets.hero_img} />
    </div>
  )
}
export default Hero
