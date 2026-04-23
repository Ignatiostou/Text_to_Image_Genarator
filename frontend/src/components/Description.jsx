import React from 'react'
import { motion } from 'framer-motion';

const Description = () => {
  return (
    <motion.div 
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{ once: true }}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold text-center dark:text-white'>Create AI Images</h1>
        <p className='text-gray-600 dark:text-gray-400 mt-4 text-center max-w-2xl'>
            Our AI-powered text-to-image generator transforms your ideas into stunning visuals in seconds. 
            Simply enter a description, and watch as our advanced algorithms bring your imagination to life with high-quality images.
        </p>
    </motion.div>
  )
}

export default Description