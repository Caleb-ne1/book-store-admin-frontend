import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);

  const deleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const toggleApproval = (id) => {
    setReviews(reviews.map(review => {
      if (review.id === id) {
        return { ...review, approved: !review.approved };
      }
      return review;
    }));
  };

  return (
    <div className="p-2">
      <div className="max-w-6xl mx-auto bg-white  rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Manage Reviews</h1>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="py-3 px-4">Review ID</th>
              <th className="py-3 px-4">Book</th>
              <th className="py-3 px-4">Reviewer</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Comment</th>
              <th className="py-3 px-4">Approved</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id} className="border-b hover:bg-gray-100 transition duration-300">
                <td className="py-3 px-4">{review.id}</td>
                <td className="py-3 px-4">{review.book}</td>
                <td className="py-3 px-4">{review.reviewer}</td>
                <td className="py-3 px-4">{review.rating} / 5</td>
                <td className="py-3 px-4">{review.comment}</td>
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={review.approved}
                    onChange={() => toggleApproval(review.id)}
                    className="cursor-pointer rounded"
                  />
                </td>
                <td className="py-3 px-4">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteReview(review.id)}
                  >
                    <MdDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReviews;
