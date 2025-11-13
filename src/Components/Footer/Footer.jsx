import React from 'react';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <section className='bg-linear-to-br from-[#FFF3E0] via-[#f3f5e4] to-[#F3E5F5]'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-16 w-11/12 mx-auto p-4 md:py-8'>
                <div>
                    <Link to="/" className="flex items-center gap-3">
                        <img src="https://i.postimg.cc/MTy3VZsL/LFLN.png" className="w-16 h-8" />
                        <h2 className="font-bold text-xl">
                            <span className="text-[#88a59e]">Local Food </span>
                            <span className="text-[#ce6083]">Lovers </span>
                            <span className="text-[#9bc5ba]">Network</span>
                        </h2>
                    </Link>
                    <p className='mt-3 md:mt-6 text-justify text-gray-500'>
                        Discover, share, and celebrate the best local food experiences in your community.
                        <br />
                        Join our network of food enthusiasts today!
                    </p>
                </div>

                <div>
                    <h3 className='text-lg font-semibold'>
                        Quick Links
                    </h3>
                    <div className='flex flex-col gap-1.5 mt-4 text-gray-500'>
                        <Link to='/'>Home</Link>
                        <Link to='/all-reviews'>All Reviews</Link>
                        <Link to='/login'>Login</Link>
                    </div>
                </div>

                <div>
                    <h3 className='text-lg font-medium'>
                        Follow Us
                    </h3>
                    <div className='flex gap-1.5 mt-4 text-gray-500'>
                        <Link to='https://workspace.google.com/intl/en-US/gmail/'><TfiEmail></TfiEmail></Link>
                        <Link to='https://www.facebook.com/'><FaFacebookF></FaFacebookF></Link>
                        <Link to='https://www.whatsapp.com/'><FaWhatsapp></FaWhatsapp></Link>
                        <Link to='https://www.youtube.com/'><IoLogoYoutube></IoLogoYoutube></Link>
                        <Link to='https://x.com/'><FaXTwitter></FaXTwitter></Link>
                    </div>
                </div>
            </div>
            <div className='mt-4 md:mt-0 pb-4 md:pb-8 text-center'>
                <p>
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-[#88a59e]">Local Food </span> <span className="font-semibold text-[#ce6083]">Lovers </span> <span className="font-semibold text-[#9bc5ba]">Network</span>. All rights reserved.
                </p>
            </div>
        </section>
    );
};

export default Footer;