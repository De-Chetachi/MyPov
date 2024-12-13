import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Signup';
//import NavBar from './components/NavBar';
import NavBar from './components/nav';
import LogIn from './pages/login';
import Post from './pages/Post';
import Create from './pages/Create';
import { useState } from 'react';
import './index.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app text-slate-600'>
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
            path='/'
            element={ <Home />}
            />
            <Route
            path='/register'
            element= { <Register /> }
            />
            <Route
            path='/login'
            element= { <LogIn /> }
            />
            <Route 
            path='posts/:postId'
            //Component={ Post }
            element = { <Post /> }
            />
            <Route
            path='posts/create'
            element = { <Create /> }
             />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
