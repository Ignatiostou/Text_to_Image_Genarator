import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Login');
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
                
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    toast.success('Login successful!');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
                
                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    toast.success('Account created successfully!');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

  return (
    <div
    
      className="fixed top-0 left-0 w-full 
    h-full flex items-center justify-center 
    bg-black bg-opacity-50"
    >
      <motion.form
      onSubmit={onSubmitHandler}
      initial={{opacity:0.2, y:100}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.5}}
        className="relative bg-white dark:bg-gray-800 
        p-10 rounded-xl text-slate-500 dark:text-gray-300 min-w-[300px] sm:min-w-[400px]"
      >
        <h1 className="text-center text-2xl font-semibold mb-4 dark:text-white">{state}</h1>
        <p className="text-center mb-6">
          Welcome back! Please sign in to continue
        </p>
        {state !== 'Login' && <div className="border dark:border-gray-600 px-6 py-2 flex items-center gap-2 rounded-full mt-4 mb-4">
          <img src={assets.profile_icon} alt="User Icon" className="w-6" />
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            className="outline-none text-sm flex-1"
            placeholder="Full Name"
            required
          />
        </div>}

        <div className="border dark:border-gray-600 px-6 py-2 flex items-center gap-2 rounded-full mt-4 mb-4">
          <img src={assets.email_icon} alt="User Icon" className="w-4" />
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm flex-1 bg-transparent dark:text-white"
            placeholder="Email"
            required
          />
        </div>

        <div className="border dark:border-gray-600 px-6 py-2 flex items-center gap-2 rounded-full mt-4 mb-4">
          <img src={assets.lock_icon} alt="User Icon" className="w-4" />
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            className="outline-none text-sm flex-1 bg-transparent dark:text-white"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-right text-blue-600  cursor-pointer">
          Forgot password?
        </p>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-full mt-4">
          {state==='Login' ? 'Login' : 'Create account'}
        </button>

        {state==='Login' ? <p className="mt-5 text-center">
          Don't have an account?
          <span className="text-blue-600 cursor-pointer" onClick={()=>setState('Sign Up')}>Sign up</span>
        </p>:
         <p className="mt-5 text-center">
          Already have an account?
          <span className="text-blue-600 cursor-pointer" onClick={()=>setState('Login')}>Login</span>
        </p>}

        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="close_icon" className="w-6
        absolute top-4 right-4 cursor-pointer"/>
      </motion.form>
    </div>
  );
};

export default Login;
