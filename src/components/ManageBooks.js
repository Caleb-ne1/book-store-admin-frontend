import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '', price: '', stock: '', description: '', category: '', image_url: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editBookId, setEditBookId] = useState(null);

    //to fetch all books
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3004/api/books/");
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);


    //to get categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3004/api/category");
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    //to add and edit a book
    const addOrUpdateBook = async () => {
        try {
            if (isEditing) {
                const response = await axios.put(`http://localhost:3004/api/books/${editBookId}`, newBook, {
                    withCredentials: true
                });
                setBooks((prevBooks) =>
                    prevBooks.map((book) => (book.id === editBookId ? { ...response.data, id: editBookId } : book))
                );
                setIsEditing(false);
                setEditBookId(null);
            } else {
                const response = await axios.post('http://localhost:3004/api/books', newBook, {
                    withCredentials: true
                });
                setBooks((prevBooks) => [...prevBooks, response.data]);
                setNewBook({ title: '', author: '', price: '', stock: '', description: '', category: '', image_url: '' });
            }
        } catch (error) {
            console.error('Error adding or updating book:', error);
        }
    };

    const editBook = (book) => {
        setNewBook(book);
        setIsEditing(true);
        setEditBookId(book.id);
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:3004/api/books/delete/${id}`, {
                withCredentials: true
            });
            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="p-2">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Manage Books</h1>

                <div className="bg-white  rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Book' : 'Add Book'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="title"
                            value={newBook.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="author"
                            value={newBook.author}
                            onChange={handleInputChange}
                            placeholder="Author"
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            name="price"
                            value={newBook.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            name="stock"
                            value={newBook.stock}
                            onChange={handleInputChange}
                            placeholder="Stock"
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            name="category"
                            value={newBook.category}
                            onChange={handleInputChange}
                            className="border bg-cyan-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((category, key) => (
                                <option value={key}>{category.category_name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="image_url"
                            value={newBook.image_url}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <textarea
                        name="description"
                        value={newBook.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="border rounded-lg p-3 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <button
                        onClick={addOrUpdateBook}
                        className="w-full bg-blue-600 text-white rounded-lg p-3 font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        {isEditing ? 'Update Book' : 'Add Book'}
                    </button>
                </div>


                <div className="overflow-x-auto">
                    <table className="w-full bg-white overflow-hidden">
                        <thead>
                            <tr className="bg-blue-600 text-white text-left">
                                <th className="py-3 px-4">ID</th>
                                <th className="py-3 px-4">Title</th>
                                <th className="py-3 px-4">Author</th>
                                <th className="py-3 px-4">Price</th>
                                <th className="py-3 px-4">Stock</th>
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4">Image</th>
                                <th className="py-3 px-4">Description</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-4">{book.id}</td>
                                    <td className="py-3 px-4">{book.title}</td>
                                    <td className="py-3 px-4">{book.author}</td>
                                    <td className="py-3 px-4">${book.price}</td>
                                    <td className="py-3 px-4">{book.stock}</td>
                                    <td className="py-3 px-4">{book.category}</td>
                                    <td className="py-3 px-4"><img src={book.image_url} alt={book.title} className="w-12 h-12 object-cover" /></td>
                                    <td className="py-3 px-4">{book.description}</td>
                                    <td className="py-3 px-4 flex space-x-2">
                                        <button
                                            className="text-green-600 hover:text-green-800"
                                            onClick={() => editBook(book)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => deleteBook(book.id)}
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

export default ManageBooks;
