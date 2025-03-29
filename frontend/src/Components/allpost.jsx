import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { allpost } from '../APi/allpostapi';
import { toast,ToastContainer } from 'react-toastify';
import { Comment } from './comment';
export const Allpost = () => {
    const [postData, setPostData] = useState([]);
    const [like, setLike] = useState(0);
    const [likeid,setlikeid] = useState(0);
    const[commentid,setCommentid] = useState(0);
    useEffect(() => {
        const allpostdata = async () => {
            try {
                const res = await axios.get(`${allpost}/data`, { withCredentials: true });
                if (res.status >= 200 && res.status < 300) {
                    setPostData(res.data.data);
                    setLike(res.data.totalLikes||0);
                    console.log("Allpost data:", res.data);
                } else {
                    console.error("Unexpected Response Status:", res.status);
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };
        allpostdata();
    }, []);

    const likeHandler = async (postId) => {
        try {
            setlikeid(postId);
            console.log(`${postId} Liked`);       
            const res = await axios.post(`${allpost}/like`, { postId }, { withCredentials: true });        
            toast.success(res.data.message); 
            setLike(res.data.totalLikes);
        } catch (error) {
            console.error("Error liking post:", error);       
            if (error.response) {
                toast.error(error.response.data.message || "Failed to like post.");
            } else {
                toast.error("Network error. Please try again.");
            }
        }
    };
    

    return (
        <div className=" max-w-4xl mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">All Posts</h2>
        {postData.length > 0 ? (
            <div className="flex flex-col gap-6">
                {postData.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow-lg p-4 transition transform hover:scale-105">
                        <h1 className="text-xl font-semibold text-gray-800">{post.title}</h1>
                        <p className="text-gray-600 mt-2">{post.content}</p>
                        <p className="text-sm text-gray-500 mt-3">Author : <span className="font-medium text-blue-500">{post.authorEmail}</
                        span></p>
                        <div className="flex space-x-4 mt-4">
    <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400" onClick={()=>{likeHandler(post._id)}}>
        👍 Like {likeid === post._id ?<h6>{like}</h6>:<p/>}

    </button>
    <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-green-600 focus:ring-2 focus:ring-green-400" onClick={()=>{setCommentid(post._id)}}>
        💬 Comment  
                    
    </button>
</div>

{
                        commentid === post._id ?
                        <Comment postId={post._id}/>
                        : <p/>
        }
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500">No posts available.</p>
        )}
        <ToastContainer />
    </div>
    
    );
};