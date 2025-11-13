import React from 'react';
import { useNavigate } from 'react-router';

const PathError = () => {

    const navigate = useNavigate();

    return (
        <section className='bg-linear-to-br from-yellow-100 via-pink-100 to-purple-100'>

            <title>Error - 404</title>

            <div className='flex flex-col items-center text-center min-h-screen'>
                <img src="https://i.postimg.cc/hGcj0Rt0/error-404.png" className='my-10 p-4' />
                <h1 className='mt-10 font-semibold text-3xl md:text-4xl lg:text-5xl'>
                    Oops ! Page Not Found !!!
                </h1>
                <button className='my-20 font-semibold text-white bg-linear-to-r from-[#a424627f] to-[#729096e4] px-8 py-2 rounded-lg cursor-pointer' onClick={() => navigate(-1)}>
                    Go Back!
                </button>
            </div>
        </section>
    );
};

export default PathError;