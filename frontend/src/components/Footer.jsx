import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='w-full flex items-center justify-between py-6 mt-20 px-6 md:px-28 bg-gray-100 dark:bg-gray-800'>
        <div className='flex items-center gap-6'>
            <img src={assets.logo} alt="Logo" className="w-32 sm:w-32 lg:w-40"/>
            <div className='border-l border-gray-400 dark:border-gray-600 h-8'></div>
            <p className='text-gray-600 dark:text-gray-400 text-sm max-sm:hidden'>
                &copy; 2026 Text to Image Generator. All rights reserved.
            </p>
        </div>
        <div className='flex gap-6'>
            <img src={assets.facebook_icon} alt="facebook_icon" className='w-8 cursor-pointer hover:opacity-75 transition'/>
            <img src={assets.twitter_icon} alt="twitter_icon" className='w-8 cursor-pointer hover:opacity-75 transition'/>
            <img src={assets.instagram_icon} alt="instagram_icon" className='w-8 cursor-pointer hover:opacity-75 transition'/>
        </div>
    </div>
  )
}

export default Footer;