import React, { useState } from 'react';
import { comment as commentAPI } from '../APi/allpostapi'; // Ensure `commentAPI` is a valid URL
import axios from 'axios';
import { toast } from 'react-toastify';

export const Comment = ({ postId }) => {
    console.log(postId)
    const [commentpost, setComment] = useState({ postId: postId, comment: '' }); // Changed `postid` to `postId`
    const [comments, setComments] = useState([]); // Store comments, but don't load initially
    const [showComments, setShowComments] = useState(false); // Controls whether comments are displayed

    // Submit comment
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!commentpost.comment.trim()) {
            toast.error("Comment cannot be empty.");
            return;
        }

        try {
            const res = await axios.post(commentAPI, commentpost, { withCredentials: true });
            if (res.status >= 200 && res.status < 300) {
                toast.success("Comment added successfully!");
                setComment(prev => ({ ...prev, comment: "" })); // Clear input
                fetchComments(); // Fetch updated comments after submission
            }
        } catch (err) {
            console.error("Error in comment submission:", err);
            toast.error("Failed to add comment. Try again.");
        }
    };

    // Fetch comments only when the user clicks "Show Comments"
    const fetchComments = async () => {
        try {
            const res = await axios.get(`${commentAPI}/${postId}`, { withCredentials: true });
            if (res.status >= 200 && res.status < 300) {
                setComments(res.data.comments);
                setShowComments(true); // Only show after fetching
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            toast.error("Failed to load comments.");
        }
    };

    return (
        <div className="mt-6 space-y-4">
        {/* Comment Input */}
        <form onSubmit={submitHandler} className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-md">
            <textarea 
                name="comment" 
                placeholder="Write a comment..." 
                value={commentpost.comment}
                onChange={(e) => setComment(prev => ({ ...prev, comment: e.target.value }))}
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            ></textarea>
            <button 
                type="submit" 
                className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
                Send
            </button>
        </form>
    
        {/* Button to Show Comments */}
        {!showComments && (
            <button 
                onClick={fetchComments} 
                className="bg-gray-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-200">
                Show Comments
            </button>
        )}
    
        {/* Display Comments */}
        {showComments && (
            <div className="bg-gray-100 p-5 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Comments</h3>
                {comments.length > 0 ? (
                    comments.map((c, index) => (
                        <div key={index} className="bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                            <p className="text-gray-800 font-medium">{c.content}</p>
                            <p className="text-gray-600">{c.text}</p>
                            <p className="text-sm text-gray-500 mt-1">Posted on: {new Date(c.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                )}
            </div>
        )}
    </div>
    );  
};