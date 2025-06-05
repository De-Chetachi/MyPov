import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Comment() {
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setComment(event.target.value)
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const data = {body: comment};
        const postComment = async () => {
            try {
                await fetch(`http://localhost:5000/mypov/api/v1/posts/${postId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then(async (res) => {
                    const data = await res.json();
                    if (res.ok) {
                        navigate('/posts/${postId}');
                    } else{
                        if (data.error === "unauthorized"){
                            navigate('/login');
                        }
                    }
                }).catch((error) => {
                console.log(error.message);
                })
            } 
            catch(error) {
                setError(error);
                console.log(error);
            };
        }
        postComment();
    };

    return (
        <div className="comment mt-4">
            <form onSubmit={handleCommentSubmit} >
                <label htmlFor="comment">Comment:</label>
                <br />
                <div className="field-sizing-content h-auto rounded-xl bg-white p-6 shadow-lg outline outline-black/5 gap-x-4">
                <textarea
                    className="field-sizing-content resize-none size h-auto"
                    value={comment}
                    onChange={handleChange}
                    placeholder="Write your comment here"
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="2"
                    required
                ></textarea>
                <button type="submit" className="but flex justify-center justify-self-end">Comment</button>
                </div>
            </form>
        </div>
    );
}
export default Comment;