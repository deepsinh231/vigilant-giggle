import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../index';
import axios from 'axios';
import parse from "html-react-parser";
import HandleDelete from "../../Pages/HandleDelete";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Post() {
    const [post, setPost] = useState(null);
    const [delefepost, setdelefepost] = useState(false);
    const { _id } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((ste) => ste.auth.userdata);
    const isAuthor = post && userData ? userData.id === post?.userId : false;
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
        return <div>Loading...</div>;
    }
    const Delete = async (data) => {
        setdelefepost(true)
        const dataresev = await HandleDelete(userData, data)
        if (dataresev.data.message === "Post deleted successfully") {
            toast.success('Post deleted successfully!');
            setTimeout(() => {
                navigate('/');
                setdelefepost(false)
            }, 2000);
        } else {
            setdelefepost(false)
            toast.error(dataresev.message);
        }
    }
    return (
        <div className="py-8">
            <div className="w-full mb-6">
                <h1 className="text-4xl text-center font-bold">{post.title}</h1>
            </div>
            <div className="p-6 bg-gray-100/30  rounded-lg shadow-md m-4">
                {parse(post.content)}
            </div>

            {isAuthor && (
                <div className="relative flex">
                    <Link className='w-1/2 p-5' to={`/edit-post/${post._id}`}>
                        <Button bgcolor="bg-green-500" className="w-full">
                            Edit
                        </Button>
                    </Link>
                    <div className="w-1/2 p-5">
                        <Button bgcolor="bg-red-500 w-full" onClick={() => Delete(post._id)}>
                            {delefepost ?
                                <div className="flex gap-x-2 items-center">
                                    <span className="loader_pre"></span>
                                    <span>Deleteing...</span>
                                </div>

                                :
                                "Delete"
                            }
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
