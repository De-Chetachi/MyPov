import { useEffect, useState } from "react";
import PostDetail from "../components/PostDetail";
import { urlBase } from "../App";
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  User, 
  Plus, 
  Search, 
  Menu, 
  X, 
  Edit3, 
  Trash2, 
  Send,
  Image,
  Calendar,
  LogOut,
  Settings
} from 'lucide-react';
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadPosts();
    }, []) 

    const loadPosts = async () => {
        try{
            const res = await fetch(`${urlBase}posts`);
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                setPosts(data);
            }
        } catch(err){
            console.log(`Error fetching posts: ${err}`);
        } finally {
            setLoading(false);
        }
    }

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }
    return (
        <div className="">

            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        MyPov
                    </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    
                    {currentUser && (
                        <button
                        onClick={() => setActiveModal('createPost')}
                        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                        >
                        <Plus className="w-4 h-4" />
                        <span>New Post</span>
                        </button>
                    )}
                    
                    {currentUser ? (
                        <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700">{currentUser.name}</span>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                            <LogOut className="w-5 h-5" />
                        </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                        <button className="text-gray-700 hover:text-indigo-600">Login</button>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700">
                            Sign Up
                        </button>
                        </div>
                    )}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="md:hidden p-2"
                    >
                    {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
                </div>

                {/* Mobile Navigation */}
                {showMobileMenu && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-4 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    
                    {currentUser && (
                        <button
                        onClick={() => {
                            setActiveModal('createPost');
                            setShowMobileMenu(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full"
                        >
                        <Plus className="w-4 h-4" />
                        <span>New Post</span>
                        </button>
                    )}
                    </div>
                </div>
                )}
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                {filteredPosts.map((post) => (
                    <article key={post._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    {/* Post Header */}
                    <Link to={ `posts/${post._id}`}>
                        <div className="p-1 md:p-6 pb-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{post.author.username}</p>
                                        <p className="text-sm text-gray-500">@{post.author.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{formatDate(post.createdAt)}</span>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                                {post.title.length > 25 ? `${post.title.substring(0, 25)}...` : post.title}
                            </h2>
                            <div className="text-img flex justify-between ">
                                <div className="txt pr-1">
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {post.text.length > 200 ? `${post.text.substring(0, 200)}...` : post.text}
                                    </p>
                                </div>
                                {post.image && (
                                <div className="md:px-6 pb-4 md:shrink-0">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className=" w-full h-24 object-cover"
                                    />
                                </div>
                                )}

                            </div>
                        </div>

                        {/* Post Image */}

                        {/* Post Actions */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                            <button
                                //onClick={() => handleLike(post._id)}
                                className={`flex items-center space-x-2 transition-colors ${
                                post.likedBy?.includes(currentUser?._id)
                                    ? 'text-red-500'
                                    : 'text-gray-500 hover:text-red-500'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${post.likedBy?.includes(currentUser?._id) ? 'fill-current' : ''}`} />
                                <span>{post.likes}</span>
                            </button>
                            
                            <button
                                // onClick={() => {
                                // setSelectedPost(post);
                                // loadComments(post._id);
                                // setActiveModal('comments');
                                // }}
                                className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                                {<span>{post.comments}</span>}
                            </button>
                            </div>

                            {currentUser && currentUser._id === post.author._id && (
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-500 hover:text-indigo-500 rounded-full hover:bg-gray-100">
                                <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100">
                                <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            )}
                        </div>
                    </Link>
                    </article>
                ))}

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No posts found.</p>
                    </div>
                )}
                </div>
            </main>
        </div>
    );
}
export default Home;