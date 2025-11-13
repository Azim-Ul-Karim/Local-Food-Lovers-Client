import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { GrRestaurant } from 'react-icons/gr';

const MyFavorites = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/favorites?email=${user.email}`)
                .then(res => res.json())
                .then(data => setFavorites(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleDelete = id => {
        fetch(`http://localhost:3000/favorites/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setFavorites(prev => prev.filter(fav => fav._id !== id));
            });
    };

    return (
        <div className='w-11/12 mx-auto my-6 md:my-15 min-h-screen'>

            <title>My Favorites | Local Food Lovers Network</title>

            <h2 className='text-2xl md:text-3xl font-bold text-center mb-10 text-[#5f756a]'>
                My Favorites
            </h2>

            {favorites.length === 0 ? (
                <p className='text-center text-gray-600'>No favorites added yet.</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {
                        favorites.map(fav => (
                            <div key={fav._id} className='bg-[#ecf3d4] rounded-md p-3 shadow-md'>
                                <img src={fav.foodImage} className='w-full h-45 object-cover rounded-md' />
                                <h3 className='font-bold mt-3 mb-2'>{fav.foodName}</h3>
                                <div className='flex items-center gap-3'>
                                    <GrRestaurant></GrRestaurant>
                                    <p className='font-semibold text-sm text-gray-600'>{fav.restaurantName}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(fav._id)}
                                    className='btn btn-sm bg-[#874242] text-white mt-3 w-full'
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default MyFavorites;
