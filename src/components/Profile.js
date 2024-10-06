import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Admin',
    bio: 'Passionate about books and reading.',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="h-full bg-white rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Profile</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Name:
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="border rounded p-2 mt-1 w-full"
                  placeholder="Enter your name"
                />
              ) : (
                <span className="block mt-1 text-gray-700">{user.name}</span>
              )}
            </label>
            <label className="block">
              Email:
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="border rounded p-2 mt-1 w-full"
                  placeholder="Enter your email"
                />
              ) : (
                <span className="block mt-1 text-gray-700">{user.email}</span>
              )}
            </label>
            <label className="block">
              Role:
              <span className="block mt-1 text-gray-700">{user.role}</span>
            </label>
            <label className="block">
              Bio:
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleInputChange}
                  className="border rounded p-2 mt-1 w-full"
                  rows="3"
                  placeholder="Tell us about yourself"
                />
              ) : (
                <span className="block mt-1 text-gray-700">{user.bio}</span>
              )}
            </label>
          </div>
        </div>

        <button
          onClick={isEditing ? handleSave : handleEditToggle}
          className={`w-full text-white rounded px-4 py-2 transition duration-300 ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
