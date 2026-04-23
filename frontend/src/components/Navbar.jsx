import React, { use, useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import { ThemeContext } from '../context/ThemeContext.jsx'


const Navbar = () => {

    const { user, setShowLogin, credit, logout } = useContext(AppContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const handleThemeToggle = () => {
        console.log('Current theme:', theme);
        toggleTheme();
        console.log('Theme toggled');
    };

  return (
    <div className='flex items-center justify-between mb-8'>
        <Link to="/"><img src={assets.logo} alt="Logo" className="w-32 sm:w-32 lg:w-40"/></Link>

    <div className='flex items-center gap-3'>
        {/* Theme Toggle Button */}
        <button
            onClick={handleThemeToggle}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>

    <div>
        {user ? (
            <div className="flex items-center gap-2 sm:gap-5">
                <button onClick={()=>navigate('/buy')}className="flex items-center gap-2
                bg-blue-100 dark:bg-blue-900
                px-4 py-2 sm:px-6  sm:py-3 rounded-full
                hover:scale-105 transition duration-700
                text-sm">
                    <img className='w-5' src={assets.credit_star} alt="credit_star" />
                    <p className='text-xs sm:text-sm font-medium
                    text-gray-600 dark:text-gray-300'>
                        Credits left: {credit}
                    </p>
                </button>
                <p className='text-gray-600 dark:text-gray-300
                max-sm:hidden pl-4'>
                    Hi, {user.name}
                </p>
                <div className='relative group'>
                    <img className='w-10 drop-shadow' src={assets.profile_icon} alt="user_icon" />
                    <div className='absolute hidden group-hover:block
                    top-0 right-0 z-10 text-black dark:text-white rounded pt-12'>
                        <ul className='list-none m-0 p-4
                        bg-white dark:bg-gray-800 rounded-md border dark:border-gray-700 text-sm'>
                            <li onClick={() => navigate('/profile')} className='py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100 dark:hover:bg-gray-700'>Profile</li>
                            <li onClick={() => navigate('/settings')} className='py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100 dark:hover:bg-gray-700'>Settings</li>
                            <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100 dark:hover:bg-gray-700'>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex items-center gap-2 sm:gap-5">
                <p onClick={() => navigate('/buy')} className='cursor-pointer text-gray-800 dark:text-gray-200'>Pricing</p>
                <button onClick={() => setShowLogin(true)} className="bg-zinc-800 dark:bg-zinc-700
                text-white px-7 py-2 sm:px-10 text-sm
                rounded-full font-medium 
                hover:bg-zinc-700 dark:hover:bg-zinc-600
                transition duration-300">Login</button>
                
            </div>
        )}
    </div>
    </div>
    </div>
  )
}

export default Navbar