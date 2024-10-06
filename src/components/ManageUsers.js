import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Manage Users</h1>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-100 transition duration-300">
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button className="text-green-600 hover:text-green-800">
                    <MdEdit size={24} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteUser(user.id)}
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

export default ManageUsers;
