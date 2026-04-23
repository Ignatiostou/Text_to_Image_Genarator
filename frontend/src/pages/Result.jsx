import React from "react";
import { assets } from "../assets/assets";
import { useState, useContext } from "react";
import { motion } from 'framer-motion';
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setisImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (input) {
      const image = await generateImage(input);
      if (image) {
        setisImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };



  return (
    <motion.form 
    onSubmit={onSubmitHandler}
     initial={{opacity:0.2, y:100}}
     transition={{duration:1}}
     whileInView={{opacity:1, y:0}}
     viewport={{ once: true }}
    className="flex flex-col justify-center items-center mt-10 gap-10">
      <div>
        <div className="relative">
          <img src={image} alt="sample_img_1" className="max-w-sm rounded" />
          <span className=  {`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? "w-full transition-all duration-[10s]" : "w-0"}` }/>
        </div>
        <p className={!loading ? "hidden" : "block dark:text-white"}>Loading...</p>
      </div>
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-200 dark:bg-gray-700 text-white text-sm p-0.5 mt-10 rounded-full">
          <input onChange={e=>setInput(e.target.value)} value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="bg-zinc-900 dark:bg-blue-600 px-10 sm:px-16 py-3 rounded-full hover:bg-zinc-800 dark:hover:bg-blue-700 transition"
          >
            Generate
          </button>
        </div>
      )}
      {isImageLoaded && 
      <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
        <p onClick={()=>setisImageLoaded(false)}
          className="bg-transparent border border-zinc-900 dark:border-gray-600
      text-black dark:text-white px-8 py-3 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Generate Another
        </p>
        <a
          href={image}
          download
          className="bg-zinc-900 dark:bg-blue-600 px-8 py-3 rounded-full cursor-pointer hover:bg-zinc-800 dark:hover:bg-blue-700 transition"
        >
          Download
        </a>
      </div>
      }
    </motion.form>
  );
};

export default Result;
