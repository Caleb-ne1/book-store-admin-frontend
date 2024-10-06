import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Dashboard = () => {
    const [bookCount, setBookCount] = useState('0');
    const [usersCount, setUsersCount] = useState('0');
    const [ordersCount, setOrdersCount] = useState('0');
    const [reviews, setReviews] = useState('0');

    //fetch books count
    const fetchBooksCount = async () => {
        try {
            const response = await axios.get("http://localhost:3004/api/books/count")
            setBookCount(response.data.total);
            console.log(bookCount);
        } catch (error) {
            console.error("Error fetching book count", error)
        }
    }

    //fetch users count
    const fetchUsersCount = async () => {
        try {
            const response = await axios.get("http://localhost:3004/api/users/count")
            setUsersCount(response.data.total)
        } catch (error) {
            console.error("Error fetching users count", error)
        }
    }


    //fetch orders count
    const fetchOrdersCount = async () => {
        try {
            const response = await axios.get("http://localhost:3004/api/order/count", {withCredentials: true})
            setOrdersCount(response.data.total)
        } catch (error) {
            console.error("Error fetching users count", error);
        }
    }


    useEffect(() => {
        fetchBooksCount();
        fetchUsersCount();
        fetchOrdersCount();
    }, []);

  const stats = [
    { title: 'Total Books', value: bookCount },
    { title: 'Total Users', value: usersCount },
    { title: 'Total Orders', value: ordersCount },
    { title: 'Total Reviews', value: reviews },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-4">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Recent Activities</h3>
        <div className="bg-white rounded-xl overflow-hidden">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Activity</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
