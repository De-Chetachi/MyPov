import { useEffect, useState } from "react";
import PostDetail from "../components/PostDetail";

const Home = () => {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('http://localhost:5000/mypov/api/v1/posts');
            const data = await res.json();
            
            if (res.ok) {
                setPosts(data);
            }
        }
        fetchPosts();
    }, []) 

    return (
        <div className="home">
            <div className="max-w-7xl m-auto flex flex-col lg:flex-row justify-center flex-wrap divide-y">
                {posts && posts.map((post) => (
                    <div key={post.id} className="lg:basis-2/4">
                        <PostDetail key={post._id} post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home;