import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Nav.css';

const Navbar = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const handleLogout = () => {
        console.log("hiii");
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
            <img src="images\logo\icard.jpg" alt="logo" className='logo' />
            {auth ? <ul className='nav-ul'>
                    <li><Link to='/'>Products</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    <li><Link to='/update'>Update Product</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link onClick={handleLogout} to='/'>Logout</Link></li>
                </ul>
                :
                <ul className='nav-ul nav-right'>
                    <li><Link to='/signup'>Sign-Up</Link></li>
                    <li><Link to='/login'>Log-In</Link></li>
                </ul>
            }
        </div>
    )
}

export default Navbar;