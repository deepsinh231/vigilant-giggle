import { useForm, Controller } from 'react-hook-form';
// import conf from '../../Conf/Conf';
import { Input, Tiny } from '../index';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import axios from 'axios';

const AddPost = ({ post }) => {
    const [state, setstate] = useState(false)

    const { handleSubmit, control, register, setValue, watch, reset, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });
    const navigate = useNavigate()
    const useDate = useSelector((ste) => ste.auth.userdata);

    const onSubmit = async (data) => {
        setstate(true)
        if (post) {
            try {
                const response = await axios.put(`https://cautious-sniffle.netlify.app/.netlify/functions/api/edit/${post?._id}`, data); // Adjust the URL if necessary
                if (response.data) {
                    navigate(`/post/${post?._id}`)
                    toast.success('Post Edit successfully!');
                }
                reset();
            } catch (error) {
                console.error('There was an error creating the post!', error);
            } finally {
                setstate(false);
            }
        } else {
            try {
                const postData = { ...data, userId: useDate.id };
                const response = await axios.post('https://cautious-sniffle.netlify.app/.netlify/functions/api/add-post', postData); // Adjust the URL if necessary
                if (response.data) {
                    navigate(`/post/${response.data.post._id}`)
                }
                reset();
            } catch (error) {
                console.error('There was an error creating the post!', error);
            } finally {
                setstate(false);
            }
        }
    };
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {

            // one methed
            // const slug=value.toLowerCase().repeat(/ /g,'_')
            // setValue('slug',slug)
            // return slug

            //second Method
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
    });
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])


    return (
        <div className="py-10">
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-6">Add New Post</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input label="Post Title" {...field} />
                            )}
                        />
                        <Input
                            label="Slug :"
                            placeholder="Slug"
                            className="mb-4"
                            disabled
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                            Status
                        </label>
                        <div className="flex items-center">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    {...register('status')}
                                    className="form-radio text-indigo-600"
                                />
                                <span className="ml-2">Active</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    {...register('status')}
                                    className="form-radio text-indigo-600"
                                />
                                <span className="ml-2">Inactive</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <Tiny label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                    {/* <div className="mb-4">
                        <Controller
                            name="image"
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                                <Input
                                    label="Upload Image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => field.onChange(e.target.files[0])}
                                />
                            )}
                        />
                    </div> */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Post
                        </button>
                        {state ? <p className='text-center'>Data Sending...</p> : ""}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
