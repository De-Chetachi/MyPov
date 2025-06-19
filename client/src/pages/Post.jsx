//import React from 'react';
import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { useAuth } from '../main';
import { ArrowLeft, Heart, MessageCircle, Send, User, Calendar } from 'lucide-react';

export function PostPage({ handleAuth, postId, onBack }) {
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Fetch post details
        const postData = await api.getPost(postId);
        setPost(postData);
        setLikeCount(postData.likes || 0);

        // Check if user has liked this post
        if (user)  {
          setIsLiked(postData.userLiked);
        }

        // Fetch comments
        const commentsData = await api.getPostComments(postId);
        setComments(commentsData.comments);
      } catch (error) {
        alert('Failed to fetch post data. Please try again later.');
        console.error('Failed to fetch post data:', error);
        //setComments([])
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  const handleLike = async () => {
    // Only allow liking if not already liked
    if (!user) {
      handleAuth(); // Prompt user to log in if not authenticated
      return;
    }

    if (isLiked) return;

    try {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      await api.likePost(postId);
      // Update state based on server response
      //setLikeCount(response.likes || (likeCount + 1));
    } catch (error) {
      console.error('Failed to like post:', error);
      // Optionally show user-friendly error message
      alert('Failed to like post. Please try again.');
    }
  };

  const handleSubmitComment = async (e) => {
    if (!user) {
      handleAuth(); // Prompt user to log in if not authenticated
      return;
    }	
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const comment = await api.addComment(postId, newComment.trim());
      
      // Add the new comment to the existing comments
      setComments(prev => {
        const currentComments = Array.isArray(prev) ? prev : [];
        return [...currentComments, comment];
      });
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Ensure comments is always an array for rendering

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        {/* Post Content */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Post Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                
                {post.author?.image ? (
                    <img 
                    src={post.author.image}
                    alt={post.author.username}
                    className="overflow-hidden rounded-full w-full h-full object-cover"
                    />) : (
                    <User className="h-5 w-5 text-white" />
                    )
                }
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{post.author?.username || 'Unknown User'}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.createdAt)}
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className='img shrink-0 rounded-lg overflow-hidden'>
              {
                post.image && (
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                )
              }
            </div>
          </div>

          {/* Post Body */}
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.text}
              </p>
            </div>
          </div>

          {/* Post Actions */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-6">
            <button
              onClick={handleLike}
              disabled={isLiked}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-purple-50 text-purple-600 cursor-default' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{comments.length} Comments</span>
            </button>
          </div>
        </article>

        {/* Comment Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add a Comment</h3>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows="4"
              disabled={submittingComment}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim() || submittingComment}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Comments ({comments.length})
              </h3>
            </div>
            
            {comments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No comments yet. Be the first to share your thoughts!
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {comments.map((comment) => (
                  <div key={comment._id} className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        
                        {comment.user.image ? (
                            <img 
                            src={comment.user.image}
                            alt={comment.user.username}
                            className="overflow-hidden rounded-full w-full h-full object-cover"
                            />) : (
                                <User className="h-4 w-4 text-white" />
                            )
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">
                            {comment.user.username}
                          </span>
                          <span className="text-sm text-gray-500">
                            {comment.createdAt && formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {comment.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}