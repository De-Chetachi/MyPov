import { Link } from 'react-router-dom';
//import { FiMenu } from "react-icons/fi";
import '../styles/navbar.css';

const NavBar = () => {
    return (
        <header>
            <div className="navContainer">
                <Link to='/'>
                    <h1>MyPOV</h1>
                </Link>
                <div className="sideNav">
                    <Link to='/'><h4 className='nav-item'>About</h4></Link>
                    <Link to='/'><h4 className='nav-item'>Contact</h4></Link>
                    <Link to='/register'><h4 className='nav-item'>Sign up</h4></Link>
                </div>
            </div>
        </header>
    )
}

export default NavBar;