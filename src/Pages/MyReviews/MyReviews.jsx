import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router';

const MyReviews = () => {

  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const deleteModalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-reviews?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setReviews(data));
    }
  }, [user]);

  const handleModal = (id) => {
    setSelectedId(id);
    deleteModalRef.current.showModal();
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/my-reviews/${selectedId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setReviews(reviews.filter((rev) => rev._id !== selectedId));
        }
        deleteModalRef.current.close();
      });
  };

  const handleEdit = (id) => {
    navigate(`/edit-review/${id}`);
  };

  return (
    <div className='my-6 md:my-15 min-h-screen'>

      <title>My Reviews | Local Food Lovers Network</title>

      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#5f756a]">
        My Reviews
      </h2>

      {
        reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-[#ededc8] text-[#52057b]">
                <tr>
                  <th>Food Image</th>
                  <th>Food Name</th>
                  <th>Restaurant</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  reviews.map((rev) => (
                    <tr key={rev._id} className="hover:bg-[#f3f8e9]">
                      <td>
                        <img
                          src={rev.foodImage}
                          className="w-16 h-16 rounded-sm object-cover"
                        />
                      </td>
                      <td>{rev.foodName}</td>
                      <td>{rev.restaurantName}</td>
                      <td>{new Date(rev.dateAdded).toLocaleDateString()}</td>
                      <td className="space-x-4">
                        <button
                          onClick={() => handleEdit(rev._id)}
                          className="btn btn-sm bg-[#927d69] text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleModal(rev._id)}
                          className="btn btn-sm bg-[#de2e2e] text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }

      <dialog ref={deleteModalRef} className="modal modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Delete This Review?
          </h3>
          <div className="modal-action flex justify-between">
            <button
              onClick={handleDelete}
              className="btn bg-[#db1010] text-white"
            >
              Confirm
            </button>
            <form method="dialog">
              <button className="btn bg-[#daded5]">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyReviews;