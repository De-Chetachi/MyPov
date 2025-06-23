import React, { useState, useEffect } from 'react';
import { PostCard } from '../components/postCard';
import { api } from '../api';
import { User, Edit3, Heart, MessageCircle, Calendar, LogOut, Menu, X, Plus, Home, Info, Settings } from 'lucide-react';



export function HomePage({  onPostClick }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePostClick = (postId) => {
    if (onPostClick) {
      onPostClick(postId);
    }
  };


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts_ = await api.getPosts();
        setPosts(posts_);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false)
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to MyPov</h1>
          <p className="text-xl opacity-90">
            Share your thoughts, discover new perspectives, and connect with a community of writers.
          </p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-4xl mx-auto px-2 md:px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <div
                key={post._id} 
                onClick={() => handlePostClick(post._id)}
                className="con"
              >
                <PostCard key={post._id} post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}