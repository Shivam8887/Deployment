import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allpost, createpost, deletepost, updatepost } from '../APi/api';

// Edit Post Component
const EditPost = ({ post, setIsEdit, handleUpdate }) => {
    const [editedData, setEditedData] = useState({ title: post.title, content: post.content });

    const handleChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleUpdate(post._id, editedData);
            setIsEdit(null);
        } catch (err) {
            toast.error("Failed to update post.");
        }
    };

    return (
        <div className=" p-4 mt-2">
            <h3 className="font-bold">Edit Post</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={editedData.title}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <textarea
                    name="content"
                    value={editedData.content}
                    onChange={handleChange}
                    className="border p-2 w-full mt-2"
                    required
                ></textarea>
                <div className="flex space-x-2 mt-2">
                    <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">Update</button>
                    <button type="button" onClick={() => setIsEdit(null)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export const Mypost = () => {
    const [userData, setUserData] = useState({ title: '', content: '' });
    const [posts, setPosts] = useState([]);
    const [editPostId, setEditPostId] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    // Create new post
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(createpost, userData, { withCredentials: true });

            if (res.status >= 200 && res.status < 300) {
                toast.success("Post created successfully!");
                fetchPosts();
                setUserData({ title: '', content: '' });
            }
        } catch (err) {
            toast.error("Failed to create post.");
        }
    };

    // Fetch all posts
    const fetchPosts = async () => {
        try {
            const res = await axios.get(allpost, { withCredentials: true });
            if (res.status >= 200) {
                setPosts(res.data.data || []);
            }
        } catch (err) {
            toast.error("Failed to fetch posts.");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Delete post
    const deletePost = async (id) => {
        try {
            const res = await axios.delete(`${deletepost}/${id}`, { withCredentials: true });
            if (res.status >= 200) {
                toast.success("Post deleted successfully!");
                fetchPosts();
            }
        } catch (err) {
            toast.error("Failed to delete post.");
        }
    };

    // Update post
    const handleUpdate = async (id, updatedData) => {
        try {
            const res = await axios.put(`${updatepost}/${id}`, updatedData, { withCredentials: true });
            if (res.status >= 200) {
                toast.success("Post updated successfully!");
                setEditPostId(null);
                fetchPosts();
            }
        } catch (err) {
            toast.error("Failed to update post.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-center text-xl font-bold">Create a New Post</h2>

            {/* Create Post Form */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-lg mx-auto">
                <label className="font-bold">Title:</label>
                <input
                    type="text"
                    placeholder="Enter Post Title"
                    className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                    name="title"
                    value={userData.title}
                    onChange={handleChange}
                    required
                />

                <label className="font-bold">Content:</label>
                <textarea
                    placeholder="Enter your Post Here"
                    className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                    name="content"
                    value={userData.content}
                    onChange={handleChange}
                    required
                ></textarea>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Post
                </button>
            </form>

            {/* Display Posts */}
            <div className="mt-6 space-y-4">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="p-4 border rounded-lg bg-white shadow-md">
                            {editPostId === post._id ? (
                                <EditPost post={post} setIsEdit={setEditPostId} handleUpdate={handleUpdate} />
                            ) : (
                                <>
                                    <h3 className="text-xl font-semibold">{post.title}</h3>
                                    <p className="text-gray-700">{post.content}</p>
                                    <p className="text-sm text-gray-500">Author: {post.authorEmail}</p>
                                                            <div className="flex space-x-4 mt-2">
                            <button 
                                className="bg-blue-200 text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                                onClick={() => setEditPostId(post._id)}
                            >
                                ✏️ Edit
                            </button>

                            <button 
                                className="bg-red-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-red-600 focus:ring-2 focus:ring-red-400"
                                onClick={() => deletePost(post._id)}
                            >
                                🗑 Delete
                            </button>
                        </div>

                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No posts available.</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
};
