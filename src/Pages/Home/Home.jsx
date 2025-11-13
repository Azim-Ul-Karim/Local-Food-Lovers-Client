import React from 'react';
import TopRated from './TopRated';
import Slider from './Slider';
import { Link } from 'react-router';

const topRatedPromise = fetch('https://local-food-lovers-server-liard.vercel.app/featured-reviews')
    .then(res => res.json());

const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>

            <title>Home | Local Food Lovers Network</title>

            <Slider></Slider>

            <section className="my-16">
                <div className="text-center mb-12">
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-600'>
                        Top Rated Foods
                    </h1>
                    <p className='text-gray-400 mt-4'>
                        Discover the most loved dishes in town
                    </p>
                </div>
                <TopRated topRatedPromise={topRatedPromise}></TopRated>
                <div className='flex justify-center mt-6'>
                    <Link
                        to="/all-reviews"
                        className='px-5 py-2 btn bg-[#859053] text-white'
                    >
                        Show All Reviews
                    </Link>
                </div>
            </section>

            <section className="my-16 bg-linear-to-r from-orange-50 to-yellow-50 py-8 rounded-2xl">
                <div className="text-center mb-10">
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-700'>
                        Popular Restaurants
                    </h2>
                    <p className='text-gray-400 mt-4'>Trending spots food lovers are raving about</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" className='h-52 w-full' />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Spice Garden</h3>
                            <p className="text-gray-400 mb-3">Asian Fusion</p>
                            <p className="text-gray-700">Famous for their signature Thai curry and modern Asian dishes</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" className='h-52 w-full' />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Burger Junction</h3>
                            <p className="text-gray-400 mb-3">American</p>
                            <p className="text-gray-700">Best gourmet burgers and craft beers in the city</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="https://i.postimg.cc/j2GPLrZ5/Aes.jpg" className='h-52 w-full' />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Dolce Vita</h3>
                            <p className="text-gray-400 mb-3">Italian</p>
                            <p className="text-gray-700">Authentic Italian cuisine with handmade pasta and wood-fired pizza</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-16">
                <div className="text-center mb-10">
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
                        Explore by Category
                    </h2>
                    <p className='text-gray-400 mt-2'>Find your next favorite food experience</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {
                        [
                            { name: 'Street Food', icon: '🌮' },
                            { name: 'Fine Dining', icon: '🍷' },
                            { name: 'Desserts', icon: '🍰' },
                            { name: 'Vegetarian', icon: '🥗' },
                            { name: 'Seafood', icon: '🐟' },
                            { name: 'Breakfast', icon: '☕' },
                            { name: 'Asian', icon: '🥢' },
                            { name: 'Cafés', icon: '🏪' }
                        ].map((category, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-100">
                                <div className="text-4xl mb-3">{category.icon}</div>
                                <h3 className="font-bold text-gray-800">{category.name}</h3>
                            </div>
                        ))
                    }
                </div>
            </section>

        </div>
    );
};

export default Home;