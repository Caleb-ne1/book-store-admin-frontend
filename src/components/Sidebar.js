import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { AiOutlineBook, AiOutlineUser, AiOutlineShoppingCart, AiOutlineFileSearch, AiOutlineTag } from 'react-icons/ai';

const Sidebar = () => {
    return (
        <div className="bg-gray-900 text-white h-screen p-6 w-64">
            <h2 className="text-2xl font-bold mb-6 text-center">Book Store</h2>
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                            }`
                        }
                    >
                        <MdDashboard className="mr-3 text-xl" />
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/manage-category"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                            }`
                        }
                    >
                        <AiOutlineTag className="mr-3 text-xl" />
                        Manage Categories
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/manage-books"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                            }`
                        }
                    >
                        <AiOutlineBook className="mr-3 text-xl" />
                        Manage Books
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/manage-users"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                            }`
                        }
                    >
                        <AiOutlineUser className="mr-3 text-xl" />
                        Manage Users
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/manage-orders"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                            }`
                        }
                    >
                        <AiOutlineShoppingCart className="mr-3 text-xl" />
                        Manage Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/manage-reviews"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                            }`
                        }
                    >
                        <AiOutlineFileSearch className="mr-3 text-xl" />
                        Manage Reviews
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
