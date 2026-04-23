import React from 'react'
import {assets} from '../assets/assets';
import {motion} from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const {user,setShowLogin,showLogin}=useContext(AppContext);
    const navigate=useNavigate();



    const onClickHandler=()=>{
        if(user){
            navigate('/result');
        }
        else{
            setShowLogin(true);
        }
    }






  return (
    <motion.div className='w-full flex flex-col 
    items-center justify-center text-center my-20'
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{ once: true }}
    >
        <motion.div className='text-stone-500 dark:text-gray-300 inline-flex text-center items-center 
        gap-2 bg-white dark:bg-gray-800
        px-4 py-2 rounded-full 
        mb-5 border border-neutral-500 dark:border-gray-600'
        initial={{opacity:0, y:-50}}
        animate={{opacity:1, y:0}}
        transition={{ delay:0.4, duration:0.5 }}
        >
            <p>Generate Stunning Images from Text with AI Power</p>
            
            <img src={assets.star_icon} alt="star_icon" />
        </motion.div>
        <motion.h1 className='text-4xl max-w-[300px] 
        sm:text-7xl sm:max-w-[590px] 
        mx-auto mt-10 text-center font-bold dark:text-white'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{ delay:0.5, duration:2 }}
        >Turn text to <span className='text-blue-500'>image</span>
        
        </motion.h1>

        <motion.p className='text-gray-600 dark:text-gray-400 mt-6 max-w-[600px]'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{ delay:0.6, duration:0.8 }}
        >
        Experience the future of image creation with our AI-powered text-to-image generator. 
        Transform your ideas into stunning visuals in seconds.
        </motion.p>

        {!showLogin && <motion.button onClick={onClickHandler} className='sm:mt-8 mt-6
        bg-black dark:bg-blue-600
        px-6 py-3 rounded-full text-white
        hover:bg-gray-800 dark:hover:bg-blue-700
        transition duration-300 flex items-center gap-3'
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{ delay:{duration:0.5},opacity:{delay:0.8,duration:1 }}}
        > 
            Genereate Images
            <img className='h-6'src={assets.star_group} alt="star_group" />
        </motion.button>}
        
    </motion.div>
  )
}

export default Header