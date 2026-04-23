import React, { useContext } from 'react'
import {assets,plans} from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const BuyCredit = () => {



  const {user}=useContext(AppContext);
  return (
    <motion.div 
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{ once: true }}
    className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 dark:border-gray-600 px-10 py-2 rounded-full mb-6 dark:text-white'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10 dark:text-white'>Choose a plan</h1>

      <div className='flex flex-wrap justify-center gap-4 text-left'>
        {plans.map((item,index)=>(
          <div key={index} className='border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800
          max-w-md p-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
            <img src={assets.logo_icon} alt="lock_icon" className='w-8 mx-auto mb-4'/>
            <h2 className='text-2xl font-semibold mb-2 dark:text-white'>{item.id}</h2>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>{item.desc}</p>
            <p className='text-3xl font-bold mb-6 dark:text-white'>${item.price}/{item.credits} credits</p>
            <button className='bg-black dark:bg-blue-600 text-white px-6 py-3 rounded-full
            hover:bg-gray-800 dark:hover:bg-blue-700 transition duration-300'>{user? 'Purchase' : 'Get Started'}</button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit