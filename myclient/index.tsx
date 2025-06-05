import React, { useState, useEffect } from 'react';
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

// Mock API functions - replace with actual API calls
const api = {
  getPosts: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        _id: '1',
        title: 'Getting Started with React Hooks',
        body: 'React Hooks have revolutionized the way we write React components. In this comprehensive guide, we\'ll explore the most commonly used hooks and how they can simplify your component logic.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        author: { _id: 'u1', username: 'johndoe', name: 'John Doe' },
        createdAt: '2024-06-01T10:00:00Z',
        likes: 24,
        likedBy: ['u2', 'u3']
      },
      {
        _id: '2',
        title: 'The Future of Web Development',
        body: 'Web development is constantly evolving. From new frameworks to emerging technologies, let\'s dive into what the future holds for developers in 2024 and beyond.',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
        author: { _id: 'u2', username: 'jane_dev', name: 'Jane Smith' },
        createdAt: '2024-05-30T15:30:00Z',
        likes: 18,
        likedBy: ['u1']
      }
    ];
  },
  
  getComments: async (postId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      {
        _id: 'c1',
        body: 'Great article! Really helped me understand hooks better.',
        user: { _id: 'u2', username: 'jane_dev', name: 'Jane Smith' },
        post: postId,
        createdAt: '2024-06-02T08:00:00Z'
      }
    ];
  },
  
  isLoggedIn: async () => {
    return { loggedIn: true, user: { _id: 'u1', username: 'johndoe', name: 'John Doe' } };
  }
};

const MyPovBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // New post form state
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    image: null
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [postsData, authData] = await Promise.all([
        api.getPosts(),
        api.isLoggedIn()
      ]);
      
      setPosts(postsData);
      if (authData.loggedIn) {
        setCurrentUser(authData.user);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId) => {
    if (!comments[postId]) {
      try {
        const postComments = await api.getComments(postId);
        setComments(prev => ({ ...prev, [postId]: postComments }));
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    }
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post._id === postId) {
        const isLiked = post.likedBy?.includes(currentUser?._id);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? post.likedBy.filter(id => id !== currentUser._id)
            : [...(post.likedBy || []), currentUser._id]
        };
      }
      return post;
    }));
  };

  const handleAddComment = async (postId) => {
    if (!newComment.trim()) return;
    
    const comment = {
      _id: Date.now().toString(),
      body: newComment,
      user: currentUser,
      post: postId,
      createdAt: new Date().toISOString()
    };
    
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));
    setNewComment('');
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    
    const post = {
      _id: Date.now().toString(),
      title: newPost.title,
      body: newPost.body,
      image: newPost.image,
      author: currentUser,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: []
    };
    
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', body: '', image: null });
    setActiveModal(null);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
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
              <div className="p-6 pb-4">
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
                  {post.title}
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.text.length > 200 ? `${post.text.substring(0, 200)}...` : post.text}
                </p>
                {post.image && (
                <div className="px-6 pb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              )}
              </div>

              {/* Post Image */}

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post._id)}
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
                    onClick={() => {
                      setSelectedPost(post);
                      loadComments(post._id);
                      setActiveModal('comments');
                    }}
                    className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{comments[post._id]?.length || 0}</span>
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
            </article>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found.</p>
            </div>
          )}
        </div>
      </main>

      {/* Create Post Modal */}
      {activeModal === 'createPost' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Create New Post</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Post title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                
                <textarea
                  placeholder="What's on your mind?"
                  value={newPost.body}
                  onChange={(e) => setNewPost(prev => ({ ...prev, body: e.target.value }))}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500">
                    <Image className="w-5 h-5" />
                    <span>Add Image</span>
                  </button>

                  <div className="space-x-3">
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreatePost}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {activeModal === 'comments' && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Comments</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Add Comment */}
              {currentUser && (
                <div className="mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <textarea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleAddComment(selectedPost._id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                        >
                          <Send className="w-4 h-4" />
                          <span>Comment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments[selectedPost._id]?.map((comment) => (
                  <div key={comment._id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-xl p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm text-gray-900">
                            {comment.user.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.body}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {(!comments[selectedPost._id] || comments[selectedPost._id].length === 0) && (
                  <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPovBlog;