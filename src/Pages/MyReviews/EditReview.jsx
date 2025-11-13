import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaStar } from "react-icons/fa";

const EditReview = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        foodName: "",
        foodImage: "",
        restaurantName: "",
        location: "",
        reviewText: "",
    });
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        fetch(`https://local-food-lovers-server-liard.vercel.app/reviews/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFormData({
                    foodName: data.foodName,
                    foodImage: data.foodImage,
                    restaurantName: data.restaurantName,
                    location: data.location,
                    reviewText: data.reviewText,
                });
                setRating(data.rating);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = { ...formData, rating };

        fetch(`https://local-food-lovers-server-liard.vercel.app/my-reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updated),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    navigate("/my-reviews");
                }
            });
    };

    const isFormValid =
        formData.foodName &&
        formData.foodImage &&
        formData.restaurantName &&
        formData.location &&
        formData.reviewText &&
        rating > 0;

    return (
        <div className="flex justify-center items-center">
            <div className="w-10/12 md:w-8/12 lg:w-6/12 my-10 bg-[#f6f7d0] p-8 md:p-12 shadow-xl rounded-md">
                <h1 className="text-center font-bold text-2xl md:text-3xl text-[#5f756a]">
                    Edit This Review
                </h1>

                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset space-y-3">
                        <label className="label text-sm text-[#52057b] font-semibold">
                            Food Name
                        </label>
                        <input
                            type="text"
                            name="foodName"
                            value={formData.foodName}
                            onChange={handleChange}
                            className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            required
                        />

                        <label className="label text-sm text-[#52057b] font-semibold">
                            Food Image URL
                        </label>
                        <input
                            type="url"
                            name="foodImage"
                            value={formData.foodImage}
                            onChange={handleChange}
                            className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            required
                        />

                        <label className="label text-sm text-[#52057b] font-semibold">
                            Restaurant Name
                        </label>
                        <input
                            type="text"
                            name="restaurantName"
                            value={formData.restaurantName}
                            onChange={handleChange}
                            className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            required
                        />

                        <label className="label text-sm text-[#52057b] font-semibold">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="input bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            required
                        />

                        <label className="label text-sm text-[#52057b] font-semibold">
                            Rate this food
                        </label>
                        <div className="flex space-x-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    size={28}
                                    className={`cursor-pointer transition ${star <= (hover || rating)
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            ))}
                        </div>

                        <label className="label text-sm text-[#52057b] font-semibold">
                            Review
                        </label>
                        <textarea
                            name="reviewText"
                            value={formData.reviewText}
                            onChange={handleChange}
                            className="textarea bg-base-100 w-full border-0 shadow-sm text-sm focus:outline-none"
                            rows="3"
                            required
                        ></textarea>

                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`btn w-full mt-4 text-base font-semibold ${isFormValid
                                    ? "bg-[#675748] text-white"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Update Review
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default EditReview;