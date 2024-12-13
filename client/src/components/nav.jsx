import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
//import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const NavBar = () => {
  const navItems = [
    { id: 1, text: 'Home', to: '/' },
    { id: 2, text: 'About', to: '/about' },
    { id: 3, text: 'Create', to: '/create' },
    { id: 4, text: 'Signup', to: '/register' },
    { id: 5, text: 'Login', to: '/login' },
  ];
  const [isHidden, setIsHidden] = useState(false);
  const [bar, setBar] = useState('');
  const [liItem, setLiItem] = useState('');

  useEffect(() => {
    if (window.innerWidth < 768) {
      setBar('absolute top-24 w-full text-center py-2 font-medium');
      setLiItem('even:bg-slate-50 py-2 odd:bg-white');
      setIsHidden(true);
    }
  }, []); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBar('absolute top-24 w-full text-center font-medium')
        setLiItem('even:bg-slate-50 py-2 odd:bg-white');
        setIsHidden(true);
      } else {
        setBar('');
        setLiItem('');
        setIsHidden(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
  
   const handleClick = () => {
     setIsHidden(!isHidden);
   }

  let ulDisplay = isHidden? 'hidden' : bar;
  const ulClasses = `${ulDisplay} md:flex gap-x-4 mr-4`;
  const liClasses = `text-slate-600 py-1 px-4 m-auto hover:border-2 hover:border-solid hover:border-slate-500 hover:rounded-full ${liItem}`;

  return (
    <header>
        <nav className='flex justify-between shadow-lg'>
            <div className="font-semibold text-black text-5xl text-slate-600 py-5 ml-8">MyPOV</div>
            <div className='md:hidden my-auto mr-2' onClick={handleClick}><FiMenu className='size-12 text-slate-500'></FiMenu></div>
            <ul className={ulClasses}>
                {
                navItems.map((item) => <li onClick={handleClick} className={liClasses} key={item.id}> <Link to={item.to}> { item.text } </Link></li>)
                }
            </ul>
        </nav>
    </header>
  )
}

export default NavBar;