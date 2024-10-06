import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { IoIosMenu } from "react-icons/io";
import { FaSignInAlt } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <div className="bg-gray-800 text-white flex items-center justify-between p-4 shadow">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                    <IoIosMenu />
                </button>
            </div>
            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="hover:text-blue-400">
                            Profile
                        </Link>
                        <button className="flex items-center p-2 bg-red-600 rounded hover:bg-red-500">
                            <MdLogout className="mr-1" />
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                            <FaSignInAlt className="mr-2" />
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
