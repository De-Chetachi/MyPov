//import '../styles/postdetail.css';
import { BsChatFill, BsPlusSquareFill, BsPlusSquare, BsHeart, BsFillHeartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const PostDetail = ({ post }) => {

    const [isHeart, setIsHeart] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [writter, setWritter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        const fetchWriter = async () => {
            try {
                const writterRes = await fetch(`http://localhost:5000/mypov/api/v1/posts/author/${post._id}`);
                const writterData = await writterRes.json();

                if (writterRes.ok) {
                    setWritter(writterData)
                }
            }
            catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchWriter();
    }, []);

    
    const handleSave = () => {
        setIsSave(!isSave);
    }
    const handleLike = () => {
        setIsHeart(!isHeart);
        if (isHeart) {
            post.likes -= 1;
        } else {
            //fetch(`http://localhost:5000/mypov/api/v1/posts/${post._id}/like`);
        }
    }

    const like = isHeart ? 'size-6 inline ml-1' : 'hidden';
    const unLike = isHeart ? 'hidden' : 'size-6 inline ml-1';
    

    const save = isSave ? 'size-6' : 'hidden';
    const unSave = isSave ? 'hidden' : 'size-6';

    const shortBody = post.text.length > 100? post.text.slice(0, 100) + '...' : post.text;
    return (
        <div className="post-detail max-w-xl m-auto p-4 my-5">
        { isLoading ? ( 
            <div className="">

                <div className="flex">
                    <div className="animate-pulse size-8 bg-slate-200 rounded-2xl text-center self-center content-center text-white text-xl uppercase"></div>
                    <div className="ml-2 h-6 bg-slate-200 animate-pulse grow self-center"></div>
                </div>
                 
                <div className="h-16 my-6 bg-slate-200 animate-pulse"></div>
                <div className="h-6 bg-slate-200 animate-pulse"></div>
            </div>
        ) : (
            <div className="">
            {      
                writter ? (
                <div className="flex mb-8">
                    {
                        writter.image ? (
                           <img className="size-6 rounded-full capitalize" src={writter.image} alt="profile picture" />
                        ) : (
                            <div className="size-8 bg-slate-700 rounded-2xl text-center self-center content-center text-white text-xl uppercase">{writter.username[0]}</div>
                        )
                    }
                    <div className="ml-4 grow flex">
                        <h1 className="text-lg font-bold md:text-xl capitalize">{writter.username}</h1>
                        <p className="self-center grow text-right">
                            { String(post.createdAt).split('T')[0].split('-')[2] } { months[String(post.createdAt).split('T')[0].split('-')[1]] } { String(post.createdAt).split('T')[0].split('-')[0] }
                        </p>
                    </div>
                </div>
                ) : (
                    <p>no writter</p>
                )   
            }
            
            <Link className='postlink flex justify-between mb-6' to={ `posts/${post._id}`} >
                <div className="text mr-4">
                    <h2 className='post-title text-black font-semibold text-xl capitalize'>{post.title}</h2>
                    <p className='short-body'>{shortBody}</p>
                    <p>
                        <span>{ post.createdAt }</span>
                    </p>
                </div>
                <div className="size-24 shrink-0 bg-slate-900">
                    <img className="size-24" src={post.image} alt="" />
                </div>
            </Link>
            <div className="flex justify-between">
                <div className="flex w-28 justify-between">
                    <span>{ post.likes }
                        <BsHeart className={unLike} onClick={handleLike}/>
                        <BsFillHeartFill className={like} onClick={handleLike} />
                    </span>            
                    < BsChatFill className="size-6"/>
                </div>
                < BsPlusSquareFill className={save} onClick={handleSave} />
                < BsPlusSquare className={unSave} onClick={handleSave} />
            </div>
        </div>)}

        </div>

    )
}

export default PostDetail;