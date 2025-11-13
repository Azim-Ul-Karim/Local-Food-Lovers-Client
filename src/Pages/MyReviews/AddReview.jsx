import React, { useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaStar } from "react-icons/fa";

const AddReview = () => {

  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    restaurantName: "",
    location: "",
    reviewText: "",
  });

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const isFormValid =
    formData.foodName.trim() &&
    formData.foodImage.trim() &&
    formData.restaurantName.trim() &&
    formData.location.trim() &&
    formData.reviewText.trim() &&
    rating > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      ...formData,
      rating,
      userName: user?.displayName,
      userEmail: user?.email,
      dateAdded: new Date().toISOString(),
    };

    fetch('https://local-food-lovers-server-liard.vercel.app/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFormData({
          foodName: "",
          foodImage: "",
          restaurantName: "",
          location: "",
          reviewText: "",
        });
        setRating(0);
      })
  };

  return (
    <div className="flex justify-center items-center">

      <title>Add Review | Local Food Lovers Network</title>

      <div className="w-10/12 md:w-8/12 lg:w-6/12 my-10 bg-[#f6f7d0] p-8 md:p-12 shadow-xl rounded-md">
        <h1 className="text-center font-bold text-2xl md:text-3xl text-[#5f756a]">
          Share Your Taste 🍴
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
              placeholder="Enter food name"
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
              placeholder="Enter food image URL"
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
              placeholder="Enter restaurant name"
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
              placeholder="Enter restaurant location"
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
              placeholder="Write your review..."
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
              Submit Review
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddReview;