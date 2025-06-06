import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/nav';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { SignupPage } from './pages/signupPage';
import { DashboardPage } from './pages/dashboard';
import { CreatePostPage } from './pages/Create';
import { AboutPage } from './pages/aboutPage';
import { PostPage } from './pages/Post';
import { useAuth } from './main';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, Edit3, Heart, MessageCircle, Calendar, LogOut, Menu, X, Plus, Home, Info, Settings } from 'lucide-react';
import { api } from './api'; 

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const { user, isLoading } = useAuth();

  // Redirect to login if trying to access protected pages without authentication
  useEffect(() => {
    const protectedPages = ['dashboard', 'create'];
    if (!user && protectedPages.includes(currentPage)) {
      setCurrentPage('login');
    }
  }, [user, currentPage]);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setCurrentPage('post');
  };

  const handleBackFromPost = () => {
    setCurrentPage('home');
    setSelectedPostId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPostClick={handlePostClick} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'signup':
        return <SignupPage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <DashboardPage setCurrentPage={setCurrentPage} />;
      case 'create':
        return <CreatePostPage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'post':
        return <PostPage postId={selectedPostId} onBack={handleBackFromPost} />;
      default:
        return <HomePage onPostClick={handlePostClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'post' && (
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      <main>
        {renderPage()}
      </main>
      
      {/* Footer - hide on post page */}
      {currentPage !== 'post' && (
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">MyPov</h3>
                <p className="text-gray-400">
                  A platform for sharing perspectives and building connections through the power of writing.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => setCurrentPage('about')}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </button>
                  {user ? (
                    <button 
                      onClick={() => setCurrentPage('dashboard')}
                      className="block text-gray-400 hover:text-white transition-colors"
                    >
                      Dashboard
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCurrentPage('login')}
                      className="block text-gray-400 hover:text-white transition-colors"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="space-y-2">
                  <p className="text-gray-400">Follow us on social media</p>
                  <div className="flex space-x-4">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      Twitter
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      LinkedIn
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2024 MyPov. All rights reserved. Built with ❤️ for writers everywhere.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;