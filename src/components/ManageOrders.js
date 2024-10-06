import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { GrFormView } from "react-icons/gr";
import {Link} from 'react-router-dom';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3004/api/order', {
                    withCredentials: true
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:3004/api/orders/${id}`);
            setOrders(orders.filter(order => order.id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    //update the order status
    const updateOrderStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:3004/api/order/${id}`, { orderStatus: newStatus }, {
                withCredentials: true
            });


            setOrders(prevOrders =>
                prevOrders.map(order => {
                    if (order.order_id === id) {
                        return { ...order, orderStatus: newStatus };
                    }
                    return order;
                })
            );

            console.log(`Order ${id} status updated to ${newStatus}`);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="p-6 w-full">
            <div className="max-w-6xl mx-auto bg-white p-2">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Manage Orders</h1>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-green-600 text-white text-left">
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Total</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b hover:bg-gray-100 transition duration-300">
                                <td className="py-3 px-4">{order.order_id}</td>
                                <td className="py-3 px-4">{order.customer}</td>
                                <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                                <td className="py-3 px-4">
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                                        className="bg-gray-200 border rounded p-1"
                                    >
                                        <option value="pending">pending</option>
                                        <option value="shipped">shipped</option>
                                        <option value="delivered">delivered</option>
                                    </select>
                                </td>
                                <td className="py-3 px-4">
                                    <Link to={`/order-detail/${order.order_id}`}>
                                    <button>
                                    <GrFormView size={24}/>
                                    </button>
                                    </Link>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => deleteOrder(order.id)}
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

export default ManageOrders;
