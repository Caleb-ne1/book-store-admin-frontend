import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios'
const ManageCategory = () => {
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState({ category_name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const addOrUpdateCategory = async () => {
    try {
      if (isEditing) {
        //to update the category
        const response = await axios.put(`http://localhost:3004/api/category/${editCategoryId}`, newCategory, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                },
        });
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === editCategoryId ? response.data : category
          )
        );
        setIsEditing(false);
        setEditCategoryId(null);
        getCategories();
      } else {

        //to create a category
        const response = await axios.post('http://localhost:3004/api/category', newCategory, {
            withCredentials: true
        });
        setCategories((prevCategories) => [...prevCategories, response.data]);
        getCategories();
      }

      setNewCategory({ category_name: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //to edit category
  const editCategory = (category) => {
    setNewCategory(category);
    setIsEditing(true);
    setEditCategoryId(category.id);
  };


  //delete category
  const deleteCategory = async (id) => {
    const response = await axios.delete(`http://localhost:3004/api/category/${id}`, {
        withCredentials: true
    })
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
    alert("Category deleted successfully")
  };

//to get list of all categories
const getCategories = async () => {
    try {
    const response = await axios.get("http://localhost:3004/api/category/")
    setCategories(response.data);
    } catch (error) {
        console.error(error);
    }
}


      useEffect(() => {
        getCategories();
      }, [])
  return (
    <div className="p-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Manage Categories</h1>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Category' : 'Add Category'}</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              name="category_name"
              value={newCategory.category_name}
              onChange={handleInputChange}
              placeholder="Category Name"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={addOrUpdateCategory}
            className="w-full bg-blue-600 text-white rounded-lg p-3 font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isEditing ? 'Update Category' : 'Add Category'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{category.id}</td>
                  <td className="py-3 px-4">{category.category_name}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => editCategory(category)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteCategory(category.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
