import React, { useEffect, useState } from 'react';
import ReviewCard from '../Home/ReviewCard';

const AllReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        const value = e.target.search.value.trim();
        setLoading(true);

        try {
            const res = await fetch(`https://local-food-lovers-server-liard.vercel.app/reviews?search=${value}`);
            const data = await res.json();
            setReviews(data);
            setSearch(value);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetch('https://local-food-lovers-server-liard.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className='w-11/12 mx-auto my-10'>

            <title>All Reviews | Local Food Lovers Network</title>

            <h2 className="text-3xl font-bold text-center mb-8 text-[#5f756a]">
                All Reviews
            </h2>

            <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row items-center justify-center gap-3 my-12"
            >
                <input
                    type="text"
                    name="search"
                    placeholder="Search by food name..."
                    className="input w-full md:w-1/2 px-4 py-2 rounded-md focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-[#76a086] text-white px-6 py-2 rounded-md cursor-pointer font-semibold"
                >
                    Search
                </button>
            </form>

            {/* Loader */}
            {loading && <p className="text-center text-gray-500">Loading reviews...</p>}

            {/* No results */}
            {!loading && reviews.length === 0 && (
                <p className="text-center text-gray-500">No reviews found for “{search}”.</p>
            )}

            {/* Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {reviews.map(review => (
                    <ReviewCard key={review._id} review={review}></ReviewCard>
                ))}
            </div>
        </div>
    );
};

export default AllReviews;
