import React, { use } from 'react';
import ReviewCard from './ReviewCard';

const TopRated = ({ topRatedPromise }) => {

    const reviews = use(topRatedPromise);

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    reviews.map(review => <ReviewCard review={review} key={review._id}></ReviewCard>)
                }
            </div>
        </div>
    );
};

export default TopRated;