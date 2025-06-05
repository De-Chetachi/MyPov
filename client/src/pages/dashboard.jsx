import { useState, useEffect } from 'react';
import { useAuth } from '../main';
import { api } from '../api';
import { User, Edit3, Heart, MessageCircle, Calendar, LogOut, Menu, X, Plus, Home, Info, Settings } from 'lucide-react';


export function DashboardPage({ setCurrentPage }) {
  const { user } =  useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
      try {
        const res = await api.getUserPosts();
        if (res) setUserPosts(res);
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
      } finally{
        setLoading(false);
      }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
              {user?.image ? (
                <img src={user.image} alt={user.username} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <User size={32} className="text-purple-600" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{user?.username || 'Anonymous User'}</h1>
              {user?.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
            </div>
            <button
              onClick={() => setCurrentPage('create')}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>New Post</span>
            </button>
          </div>
        </div>

        {/* User Posts Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Posts</h2>
          
          {userPosts.length === 0 ? (
            <div className="text-center py-12">
              <Edit3 size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">You haven't written any posts yet.</p>
              <button
                onClick={() => setCurrentPage('create')}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                Write Your First Post
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.body}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart size={16} />
                        <span>{post.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-purple-600 hover:text-purple-700 px-3 py-1 rounded-md hover:bg-purple-50 transition-colors">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}