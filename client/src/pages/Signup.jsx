import '../styles/signup.css';
// import { redirect} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from 'react';

function Register() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        fetch('http://localhost:5000/mypov/api/v1/signup', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if(res.ok) {
                res.json().then((data) => {
                    alert(data.message);
                    navigate('/login');
                }).catch((err) => {
                    console.log(err);
                });;
            }
            else {
                res.json().then((data) => {
                    alert(data.error);
                    if (data.error.toString().trim() === 'User already exists')
                    {
                        navigate('/login');
                    }
                    navigate('/register');
                }).catch((err) => {
                    console.log(err);
                });
            }
            
        });
    };

    return (
        <div className="signupContainer">
            <div className="signup">
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
                    <label>Name:
                        <br />
                        <input
                            type="text"
                            name="name"
                            required
                        />
                        <br />
                    </label>
                    <label>Email:
                        <br />
                        <input
                            type="email"
                            name="email"
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
                    <label>Bio:
                        <br />
                        <textarea
                            name="bio"/>
                        <br />
                    </label><br />
                    <button type="submit" className="but">Sign Up</button>
                </form>
                <p className="right">already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
}
export default Register;