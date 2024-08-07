import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import parse from "html-react-parser";

export default function Mypost() {
    const [post, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userdata } = useSelector((state) => state.auth)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://cautious-sniffle.netlify.app/.netlify/functions/api/mypost`, {
                    headers: {
                        Authorization: `Bearer ${userdata?.token}`,
                        'x-user-id': userdata?.id
                    }
                });
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    setPosts(response.data);
                    console.error('Fetched data is not an array:', response.data);
                }
                // setPosts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts()
    }, [userdata?.id]);
    if (loading) return <div>Loading...</div>;
    if (!post) {
        return <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-center py-20">No posts available.</h1></div>;
    }
    if (error) return <div>{error}</div>;
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">All Posts</h1>
            <div className="space-y-4">

                {post.slice().reverse().map(post => (
                    <Link key={post._id} className={`shadow-md rounded-lg p-4 block ${post.status === "active" ? "bg-white" : "bg-black/10"}`} to={`/post/${post._id}`}>
                        <div className="relative">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <h2 className="text-xl absolute top-0 right-0 capitalize font-semibold">{post.status}</h2>
                            <p className="text-gray-600">{parse(post.content)}</p>
                            <p className='py-2'>{new Date(post.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
