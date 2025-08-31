import React from 'react'
import { BsGithub } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";



const Footer = () => {
  return (
    <>
    <div className='flex gap-1 justify-center items-center absolute w-full md:relative bottom-0 border-t-1 border-gray-300'>
        <p className='text-center text-gray-500 text-[6px] md:text-sm'>
            &copy; {new Date().getFullYear()} Travlink. All rights reserved.
        </p>
        <div className='flex gap-1.5 justify-center'>
            <a href="https://github.com/asfnsa"> <BsGithub className='h-2 w-2 md:h-4 md:w-4 text-gray-500 hover:text-gray-700 transition' /></a>
            <a href="https://www.instagram.com/a__asfnsa/"> <FaInstagram className='h-2 w-2 md:h-4 md:w-4 text-gray-500 hover:text-gray-700 transition' /></a>
        </div>
    </div>
    </>
  )
}

export default Footer