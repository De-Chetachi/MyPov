import '../styles/signup.css';
import { useNavigate } from "react-router-dom";

function LogIn() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        fetch('http://localhost:5000/mypov/api/v1/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    navigate('/profile');
                }).catch((err) => {
                    alert(err);
                    navigate('/login');
                });
            }
        });
    };

    return (
        <div className="signupContainer">
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <label>Username:
                        <br />
                        <input
                            type="text"
                            name="username"
                            required
                        />
                        <br />
                    </label>
                    <label>Password:
                        <br />
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={8}
                        />
                        <br />
                    </label>
                    <button type="submit" className="but">Log in</button>
                </form>
                <p className="right top">don't have an account? <a href="/register">Sign up</a></p>
            </div>
        </div>
    );
}
export default LogIn;
