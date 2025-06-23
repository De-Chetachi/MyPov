import { useState, useEffect } from 'react';
import { useAuth } from '../main';
import { api } from '../api';
import { User, Edit3, Heart, MessageCircle, Calendar, LogOut, Menu, X, Plus, Home, Info, Settings, Save, Trash2 } from 'lucide-react';

export function DashboardPage({ setCurrentPage, onPostClick }) {
  const { user, setUser } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // Stores the _id of the post being edited
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    email: user?.email || ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editPostForm, setEditPostForm] = useState({
    title: '',
    body: ''
  });

  const handlePostClick = (postId) => {
    if (onPostClick) {
      onPostClick(postId);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  // Update profileForm when user object changes (e.g., after initial load or profile update)
  useEffect(() => {
    if (user) {
      setProfileForm({
        username: user.username || '',
        bio: user.bio || '',
        email: user.email || ''
      });
    }
  }, [user]); // Depend on 'user' object

  const fetchUserPosts = async () => {
    try {
      setLoading(true); // Set loading true before fetching posts
      const res = await api.getUserPosts();
      if (res) setUserPosts(res);
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
      // Optionally alert user or display an error message
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = (post) => {
    // Set editingPost to the post's _id
    setEditingPost(post._id);
    setEditPostForm({
      title: post.title,
      body: post.body
    });
  };

  const handleSavePost = async (postId) => {
    try {
      const formData = new FormData();
      formData.append('title', editPostForm.title);
      formData.append('body', editPostForm.body);

      // Assuming api.editPost returns the updated post object or a success indicator
      const updatedPostResponse = await api.editPost(postId, formData);

      // Assuming updatedPostResponse contains the full updated post object from the API
      // If your API returns only success/error, you'd rely on editPostForm values
      if (updatedPostResponse) {
        setUserPosts(prev => prev.map(post =>
          // Use post._id for comparison
          post._id === postId ? { ...post, title: editPostForm.title, body: editPostForm.body } : post
        ));
        setEditingPost(null); // Exit editing mode
        setEditPostForm({ title: '', body: '' }); // Clear form
      } else {
        alert('Failed to update post. Server did not return a valid response.');
      }
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        const success = await api.deletePost(postId);
        if (success) {
          // Use post._id for filtering
          setUserPosts(prev => prev.filter(post => post._id !== postId));
        } else {
          alert('Failed to delete post. Please try again.');
        }
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      // Only append fields if they have changed or are not null/empty strings
      // This is a good practice to prevent sending unnecessary data
      if (profileForm.username !== user?.username) {
        formData.append('username', profileForm.username);
      }
      if (profileForm.bio !== user?.bio) {
        formData.append('bio', profileForm.bio);
      }
      if (profileForm.email !== user?.email) {
        formData.append('email', profileForm.email);
      }

      if (profileImage) {
        formData.append('image', profileImage);
      }

      // Assuming api.editProfile returns the updated user object
      const updatedUser = await api.editProfile(formData);
      if (updatedUser) {
        // Update the user context with the new user data
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setEditingProfile(false);
        setProfileImage(null);
        setPreviewImage(null);
      } else {
        alert('Failed to update profile. Server did not return a valid response.');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null); // Exit editing mode
    setEditPostForm({ title: '', body: '' }); // Reset form
  };

  const handleCancelProfileEdit = () => {
    setEditingProfile(false);
    // Reset profile form to current user values
    setProfileForm({
      username: user?.username || '',
      bio: user?.bio || '',
      email: user?.email || ''
    });
    setProfileImage(null);
    setPreviewImage(null);
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
        <div className="bg-white rounded-lg shadow-md p-2 md:p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-14 md:w-20 h-14 md:h-20 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
              {user?.image ? (
                <img src={user.image} alt={user.username} className="w-12 h-12 md:w-20 md:h-20 rounded-full object-cover" />
              ) : (
                <User className="text-purple-600" />
              )}
            </div>
            <div className="flex-1">
              {editingProfile ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                      ) : user?.image ? (
                        <img src={user.image} alt={user.username} className="w-20 h-20 rounded-full object-cover" />
                      ) : (
                        <User size={32} className="text-purple-600" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="profile-image-upload"
                      />
                      <label
                        htmlFor="profile-image-upload"
                        className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md hover:bg-purple-200 transition-colors cursor-pointer text-sm"
                      >
                        Change Photo
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={profileForm.username}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, username: e.target.value }))}
                    className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-purple-600 outline-none w-full"
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    className="text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-purple-600 outline-none w-full"
                    placeholder="Email"
                  />
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                    className="text-gray-700 bg-transparent border-2 border-gray-300 focus:border-purple-600 outline-none w-full p-2 rounded-md resize-none"
                    placeholder="Bio"
                    rows="2"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelProfileEdit}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{user?.username || 'Anonymous User'}</h1>
                  <p className="text-gray-600 text-sm">{user?.email}</p>
                  {user?.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="mt-2 text-purple-600 hover:text-purple-700 flex items-center space-x-1"
                  >
                    <Edit3 size={16} />
                    <span>Edit Profile</span>
                  </button>
                </div>
              )}
            </div>
            {!editingProfile && (
              <button
                onClick={() => setCurrentPage('create')}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2 self-end md:self-auto"
              >
                <Plus size={18} />
                <span className='hidden md:inline'>New Post</span>
              </button>
            )}
          </div>
        </div>

        {/* User Posts Section */}
        <div className="bg-white rounded-lg shadow-md px-2 py-8 md:p-8">
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
                <div key={post._id} className="border border-gray-200 rounded-lg px-2 py-6 md:p-6">
                  {editingPost === post._id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editPostForm.title}
                        onChange={(e) => setEditPostForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full text-xl font-bold text-gray-900 border-2 border-gray-300 focus:border-purple-600 outline-none p-2 rounded-md"
                        placeholder="Post title"
                      />
                      <textarea
                        value={editPostForm.body}
                        onChange={(e) => setEditPostForm(prev => ({ ...prev, body: e.target.value }))}
                        className="w-full text-gray-700 border-2 border-gray-300 focus:border-purple-600 outline-none p-2 rounded-md resize-none"
                        placeholder="Post content"
                        rows="4"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart size={16} />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSavePost(post._id)} 
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-1"
                          >
                            <Save size={16} />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div onClick={() => handlePostClick(post._id)} >
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart size={16} />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="text-purple-600 hover:text-purple-700 px-3 py-1 rounded-md hover:bg-purple-50 transition-colors flex items-center space-x-1"
                          >
                            <Edit3 size={16} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="text-red-600 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 transition-colors flex items-center space-x-1"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}