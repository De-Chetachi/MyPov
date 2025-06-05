import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Comments() {

    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { postId } = useParams();


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`http://localhost:5000/mypov/api/v1/posts/${postId}/comments`);
                const data = await res.json();
                if (res.ok) {
                    setComments(data);
                }
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setIsLoading(true);
            }
        };
        fetchComments(); 
    }, []);

    return (
        <div className="comments">
            {comments && comments.map((comment) => (
                <div key={comment._id} className="lg:basis-2/4">
                    <div className="divv">
                        <div className="">{comment.body}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Comments;