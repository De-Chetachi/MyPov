import { useAuth } from "../main";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Edit3, Heart, MessageCircle, Calendar, LogOut, Menu, X, Plus, Home, Info, Settings } from 'lucide-react';
import { api } from "../api";

export function PostCard({ post }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (user && post._id) {
        try {
          const likedStatus = await api.likedPost(post._id);
          setLiked(likedStatus || false);
        } catch (error) {
          console.error('Failed to check like status:', error);
          setLiked(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLiked(false);
        setLoading(false);
      }
    };

    checkLikeStatus();
  }, [post._id, user]);



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-2 md:p-6">
        <div className="">
          <div className="top flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                {post.author.image ? (
                  <img 
                    src={post.author.image}
                    alt={post.author.username}
                    className="overflow-hidden rounded-full w-full h-full object-cover"
                  />) : (
                    <User size={16} className="text-purple-600" />
                  )
                }
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author.username}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
          <div className="txt-img flex h-24 mb-4">
            <div className="txt w-2/3 md:w-3/4">
              <p className="text-gray-600 mb-4 line-clamp-3">{post.text}</p>
            </div>
            <div className="img shrink-0 w-1/3 md:w-1/4 rounded-lg overflow-hidden">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className=""
                />
              )}
            </div>
          </div>
          <hr />
          
          <div className="flex justify-between items-center space-x-4 text-sm text-gray-500 mt-4">
            <div
              className={`flex items-center space-x-1 ${
                liked ? 'text-purple-600' : 'text-purple-600'
              }`}
            >
              <Heart 
                size={16} 
                fill={liked ? 'currentColor' : 'none'} 
                className={liked ? 'text-purple-600' : ''}
              />
              <span>{likeCount}</span>
            </div>

            <button
              className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {<span>{post.comments}</span>}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}