import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://cautious-sniffle.netlify.app/.netlify/functions/api/allpost');
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (posts.length === 0) {
        return <div>No posts available.</div>;
      }
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">All Posts</h1>
            <div className="space-y-4">
                {posts.slice().reverse().map(post =>
                    post.status === "active" ?
                        (

                            <Link key={post._id} className='bg-white shadow-md rounded-lg p-4 block' to={`/post/${post._id}`}>
                                <div className="">
                                    <h2 className="text-xl font-semibold">{post.title}</h2>
                                    <p className="text-gray-600">{post.content}</p>
                                    <p className='py-2'>{new Date(post.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                </div>
                            </Link>
                        )
                        :
                        null
                )}
            </div>
        </div>
    );
};

export default AllPosts;
