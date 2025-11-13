import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { GrRestaurant } from 'react-icons/gr';
import { MdDateRange, MdOutlineRateReview } from 'react-icons/md';
import { useLoaderData } from 'react-router';

const ReviewDetails = () => {

    const review = useLoaderData();
    const { foodImage, foodName, restaurantName, location, rating, userName, reviewText, dateAdded } = review;
    const stars = '⭐'.repeat(Math.round(rating));
    const formattedDate = new Date(dateAdded).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

    return (
        <div className='flex flex-col md:flex-row items-center gap-10 w-8/10 mx-auto my-6 md:my-15'>
            <div className='w-1/2'>
                <img src={foodImage} className='object-cover w-full rounded-md h-100' />
            </div>

            <div className='w-1/2 space-y-4'>
                <h2 className='font-bold text-[#6f5f02] text-lg md:text-2xl lg:text-3xl mb-5'>{foodName}</h2>

                <div className='space-y-1 text-[#468d03]'>
                    <div className='flex items-center gap-3'>
                        <GrRestaurant></GrRestaurant>
                        <p className='font-semibold text-lg'>{restaurantName}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <CiLocationOn></CiLocationOn>
                        <p>{location}</p>
                    </div>
                </div>

                <p>{stars}</p>

                <div className='flex gap-3'>
                    <MdOutlineRateReview size={22}></MdOutlineRateReview>
                    <p>{reviewText}</p>
                </div>

                <div className='text-gray-500 space-y-1'>
                    <div className='flex items-center gap-3'>
                        <FaRegUserCircle></FaRegUserCircle>
                        <p>{userName}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <MdDateRange></MdDateRange>
                        <p>{formattedDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;