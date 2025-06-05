//import React from 'react';
import { BsChatFill, BsPlusSquareFill, BsPlusSquare, BsHeart, BsFillHeartFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Comment from "../components/Comment";
import Comments from "../components/Comments";

const Post = () => {
    const [post, setPost] = useState(null);
    const [writter, setWritter] = useState(null);
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { postId } = useParams();
    //const [comm, setComm] = useState('hidden');

    const months = {
        "01": "Jan,",
        "02": "Feb,",
        "03": "Mar,",
        "04": "April,",
        "05": "May,",
        "06": "June,",
        "07": "July,",
        "08": "Aug,",
        "09": "Sep,",
        "10": "Oct,",
        "11": "Nov,",
        "12": "Dec,",
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5000/mypov/api/v1/posts/${postId}`);
                const writterRes = await fetch(`http://localhost:5000/mypov/api/v1/posts/author/${postId}`);
                const data = await res.json();
                const writterData = await writterRes.json();

                if (res.ok) {
                    setPost(data);
                }
                if (writterRes.ok) {
                    setWritter(writterData);
                }
                
            }
            catch (error) {
                setError(error);
                console.log(error);
            } finally{
                setIsLoading(true);
            }
        }
        fetchPost();
    }, [postId]);

    // const displayC = () => {
    //     setComm('block');
    // }

    const [isHeart, setIsHeart] = useState(false);
    const [isSave, setIsSave] = useState(false);

    const handleSave = () => {
        setIsSave(!isSave);
    }
    const handleLike = () => {
        setIsHeart(!isHeart);
        if (isHeart) {
            post.likes -= 1;
        } else {
            post.likes += 1;
            //fetch(`http://localhost:5000/mypov/api/v1/posts/${post._id}/like`);
        }
    }

    const like = isHeart ? 'size-6 inline ml-1' : 'hidden';
    const unLike = isHeart ? 'hidden' : 'size-6 inline ml-1';
    

    const save = isSave ? 'size-6' : 'hidden';
    const unSave = isSave ? 'hidden' : 'size-6';

    return (
        <div className="post_page w-11/12 m-auto max-w-2xl mt-4">
            {
                post? (
                <>
                    <h1 className="font-bold text-4xl md:text-5xl text-black my-8 capitalize tracking-tight">{post.title}</h1>
                    <div className="">
                        {
                            writter ? (
                                <div className="flex mb-8">
                                    {
                                        writter.image ? (
                                            <img className="size-12 rounded-full" src={writter.image} alt="profile picture" />
                                        ) : (
                                            <div className="size-12 bg-slate-700 rounded-3xl text-center content-center text-white text-2xl uppercase">{writter.username[0]}</div>
                                            //<div className="size-16 bg-slate-700 rounded-full text-center text-white text-4xl uppercase"><p className="leading-normal align-middle h-full">{writter.username[0]}</p></div>
                                        )
                                    }
                                    <div className="ml-4  self-center">
                                        <h1 className="text-lg font-bold text-xl capitalize">{writter.username}</h1>
                                        <p className="">
                                            { String(post.createdAt).split('T')[0].split('-')[2] } { months[String(post.createdAt).split('T')[0].split('-')[1]] } { String(post.createdAt).split('T')[0].split('-')[0] }
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p>no writter</p>
                            )
                        }
                    </div>
                    <div className="img bg-slate-700 w-full h-80 md:h-96">
                        {post.image ? (
                            <img className="w-full h-80 md:h-96" src={post.image} alt="post image" />
                        ) : (<p></p>)
                        }
                    </div>
                    <p className="my-8">{post.text}</p>

                    <div className="flex justify-between">
                        <div className="flex w-28 justify-between">
                            <span>{ post.likes }
                            <BsHeart className={unLike} onClick={handleLike}/>
                            <BsFillHeartFill className={like} onClick={handleLike} />
                            </span>

                            <span>< BsChatFill className="size-6"/></span>
                            {/* <span>< BsChatFill onClick={displayC} className="size-6"/></span> */}
                        </div>
                        < BsPlusSquareFill className={save} onClick={handleSave} />
                        < BsPlusSquare className={unSave} onClick={handleSave} />
                    </div>

                    <div className="comment">
                        <Comment postId={postId} />
                    </div>

                    <div className="comments">
                        <Comments postId={postId}/>
                    </div>

                    <div>
                        <h1>more from this author</h1>
                    </div>
                    <div>
                        <h1> more from this category</h1>
                    </div>
                    <div>
                        <h1>recommended from mypov</h1>
                    </div>
                </>
                ) :(
                <div className="h-screen w-11/12 m-auto max-w-2xl mt-4">
                    <div className="h-20 animate-pulse bg-slate-200 my-8"></div>

                    <div className="w-3/6 md:w-2/6">
                        <div className="flex">
                            <div className="animate-pulse size-8 bg-slate-200 rounded-2xl text-center self-center content-center text-white text-xl uppercase"></div>
                            <div className="ml-2 h-8 bg-slate-200 animate-pulse grow self-center"></div>
                        </div>
                    </div>
                 
                    <div className="h-1/4 my-6 bg-slate-200 animate-pulse"></div>
                    <div className="h-1/4 my-6 bg-slate-200 animate-pulse"></div>
                    <div className="h-6 bg-slate-200 animate-pulse"></div>
               </div>
                )
            }
        </div>
    );
}

export default Post;
