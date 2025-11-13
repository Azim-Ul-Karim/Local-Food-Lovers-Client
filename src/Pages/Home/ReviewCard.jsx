import React, { useContext, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { GrRestaurant } from 'react-icons/gr';
import { MdOutlineRateReview } from 'react-icons/md';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

const ReviewCard = ({ review }) => {

    const { user } = useContext(AuthContext);
    const { _id, foodImage, foodName, restaurantName, location, rating, userName } = review;
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToFavorites = () => {

        const favoriteData = {
            reviewId: _id,
            email: user.email,
            foodImage,
            foodName,
            restaurantName,
            location,
            rating,
            userName,
            addedAt: new Date()
        };

        fetch('https://local-food-lovers-server-liard.vercel.app/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(favoriteData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Already added!') {
                    toast.error('Already in Favorites!');
                } else {
                    toast.success('Added to Favorites!');
                    setIsFavorite(true);
                }
            })
    };

    return (
        <div className='bg-[#ecf3d4] rounded-md overflow-hidden'>
            <div className='relative'>
                <img src={foodImage} className='w-full h-52 object-cover' alt={foodName} />

                <div className='absolute top-2 left-2 bg-white/70 text-sm font-semibold px-2 py-1 rounded-md shadow-md flex items-center gap-1'>
                    ⭐ {rating}
                </div>

                <button
                    onClick={handleAddToFavorites}
                    className='absolute top-2 right-2 bg-white/70 p-1.5 rounded-full cursor-pointer'
                    title='Add to Favorites'
                >
                    <FaHeart className={isFavorite ? 'text-red-700' : 'text-red-500'} />
                </button>
            </div>
            <div className='p-3'>
                <h3 className='text-[#6f5f02] font-bold text-lg'>{foodName}</h3>
                <div className='space-y-1 my-3 text-sm'>
                    <div className='flex items-center gap-3'>
                        <GrRestaurant></GrRestaurant>
                        <p className='font-semibold'>{restaurantName}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <CiLocationOn></CiLocationOn>
                        <p>{location}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <MdOutlineRateReview></MdOutlineRateReview>
                        <p>{userName}</p>
                    </div>
                </div>
                <Link to={`/review-details/${_id}`} className='btn bg-[#c5e0c9] font-semibold w-full'>View Details</Link>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    );
};

export default ReviewCard;