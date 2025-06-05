import { useNavigate } from "react-router-dom";

function Logout({setLogout}) {
    const navigate = useNavigate();
    //fetch('http://localhost:5000/mypov/api/v1/logout'),
    setLogout();
    navigate('/');
}

export default Logout;