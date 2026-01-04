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

            <section className="my-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
                        🍽️ Authentic Reviews
                    </div>
                    <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
                        ⭐ Trusted Ratings
                    </div>
                    <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
                        ❤️ Favorite Your Best Picks
                    </div>
                </div>
            </section>

            <section className="my-16 bg-base-100">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What Food Lovers Say</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-5 shadow-lg rounded bg-green-50">“Amazing platform!”</div>
                    <div className="p-5 shadow-lg rounded bg-green-50">“Found my favorite restaurant.”</div>
                    <div className="p-5 shadow-lg rounded bg-green-50">“Love the reviews system.”</div>
                </div>
            </section>

            <section className="my-16 bg-[#f5f0d1] py-10 rounded-xl text-center">
                <h2 className="text-2xl font-bold mb-4">Subscribe for Food Updates</h2>
                <input type="email" placeholder="Your email" className="input input-bordered" />
                <button className="btn bg-[#d7d3af] ml-2">Subscribe</button>
            </section>

            <section className="my-16 text-center bg-[#f8faf0] py-12 rounded-xl">
                <h2 className="text-3xl font-bold mb-7">Ready to Explore Local Foods?</h2>
                <Link to="/all-reviews" className="btn bg-[#decdad]">Explore Reviews</Link>
            </section>

            <section className="my-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                    Frequently Asked Questions
                </h2>

                <div className="max-w-3xl mx-auto space-y-4">
                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="checkbox" />
                        <div className="collapse-title font-semibold">
                            Is Local Food Lovers free to use?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, users can explore and read reviews completely free.</p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="checkbox" />
                        <div className="collapse-title font-semibold">
                            Can I add my own food reviews?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, registered users can add and manage their reviews.</p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow bg-base-100 shadow">
                        <input type="checkbox" />
                        <div className="collapse-title font-semibold">
                            How does favorite system work?
                        </div>
                        <div className="collapse-content">
                            <p>You can save any food review to your favorites list.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-16 bg-base-200 py-12 rounded-xl p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                    How Local Food Lovers Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Register</h3>
                        <p>Create an account to join our food lover community.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Explore</h3>
                        <p>Browse foods and restaurants reviewed by users.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Review</h3>
                        <p>Share your own food experience and ratings.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-2">Favorite</h3>
                        <p>Save your favorite foods for quick access.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;