import { useNavigate, useParams } from 'react-router-dom';
import AddPost from './File/Addpost'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Editpost() {
    const [post, setPost] = useState(null);
    const { _id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (_id) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`https://cautious-sniffle.netlify.app/.netlify/functions/api/posts/${_id}`); // Adjust the URL as necessary
                    setPost(response.data);
                } catch (error) {
                    console.error('Error fetching the post:', error);
                    // Optionally navigate to a 404 page if the post is not found
                }
            };
            fetchPost();
        }
    }, [_id, navigate])
    if (!post) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <AddPost post={post}></AddPost>
    )
}
