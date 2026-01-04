import React, { useEffect, useState } from 'react';
import ReviewCard from '../Home/ReviewCard';

const AllReviews = () => {

    const [allReviews, setAllReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [search, setSearch] = useState('');
    const [rating, setRating] = useState('');
    const [sort, setSort] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://local-food-lovers-server-liard.vercel.app/reviews')
            .then(res => res.json())
            .then(data => {
                setAllReviews(data);
                setFilteredReviews(data);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let data = [...allReviews];

        // Search
        if (search) {
            data = data.filter(r =>
                r.foodName.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Rating filter
        if (rating) {
            data = data.filter(r => Math.round(r.rating) >= rating);
        }

        // Sorting
        if (sort === 'newest') {
            data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        }
        if (sort === 'oldest') {
            data.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        }
        if (sort === 'rating') {
            data.sort((a, b) => b.rating - a.rating);
        }

        setFilteredReviews(data);
    }, [search, rating, sort, allReviews]);

    return (
        <div className="w-11/12 mx-auto my-10">

            <title>Explore Reviews | Local Food Lovers</title>

            <h2 className="text-3xl font-bold text-center mb-10 text-[#5f756a]">
                Explore All Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">

                {/* Search */}
                <div className='col-span-2'>
                    <input
                        type="text"
                        placeholder="Search by food name..."
                        className="input input-bordered w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Rating Filter */}
                <select
                    className="select select-bordered"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value="">Any Rating</option>
                    <option value="5">5⭐</option>
                    <option value="4">4⭐ & above</option>
                    <option value="3">3⭐ & above</option>
                </select>

                {/* Sorting */}
                <select
                    className="select select-bordered"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="rating">Highest Rating</option>
                </select>
            </div>

            {loading && (
                <p className="text-center text-gray-500">Loading reviews...</p>
            )}

            {!loading && filteredReviews.length === 0 && (
                <p className="text-center text-gray-500">
                    No reviews found.
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredReviews.map(review => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default AllReviews;