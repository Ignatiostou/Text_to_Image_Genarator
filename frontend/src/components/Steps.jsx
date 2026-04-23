import React from 'react'
import { stepsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Steps = () => {
  return (
    <motion.div 
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{ once: true }}
    className='flex flex-col items-center justify-center my-32'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-4 dark:text-white'>How It Works</h1>
        <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>Transform text into stunning images using AI technology.</p>

        <div className='space-y-4 w-full max-w-3xl text-sm'>
            {stepsData.map((item,index)=> (
                <div key={index}
                className='flex items-center gap-4 p-5 px-8 bg-white/20 dark:bg-gray-800/50
                shadow-md border dark:border-gray-700 cursor-pointer hover:scale-[1.02]
                transition duration-500 rounded-lg'>
                    <img width={40} src={item.icon} alt={item.title} className="w-12"/>
                    <div>
                        <h2 className='text-xl font-medium mb-2 dark:text-white'>{item.title}</h2>
                        <p className='text-gray-600 dark:text-gray-400'>{item.description}</p>
                    </div>
                </div>
            ))}

        </div>
    </motion.div>
  )
}

export default Steps;