export const urlBase = 'http://localhost:5000/mypov/api/v1/';

export const api = {
  async login(email, password) {
    const response = await fetch(`${urlBase}login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const res =  await response.json();
    if (response.ok) {
        return res;
    }
    else {
        return null;
    } 
  },
  
  async signup(userData) {
    const response = await fetch(`${urlBase}signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const res =  await response.json();
    if (response.ok) {
        return res;
    } else {
        return null;
    }
  },

  async editProfile(userData) {
    const response = await fetch(`${urlBase}updateUser`, {
      method: 'PATCH',
      credentials: 'include',
      body: userData,
    });
    const res =  await response.json();
    if (response.ok) {
        return res.user;
    } else {
        return null;
    }
  },
  
  async getPosts() {
    const response = await fetch(`${urlBase}posts`, {
      credentials: 'include'
    });
    const res = await response.json();
    if (response.ok) {
        return res;
    } else {
        return null;
    }   
  },

  async getPost(postId) {
    const response = await fetch(`${urlBase}posts/${postId}`, {
      credentials: 'include'
    });
    const res = await response.json();
    if (response.ok) {
      return res;
    } else {
        return null;
    }   
  },

  async getPostComments(postId) {
    const response = await fetch(`${urlBase}posts/${postId}/comments`, {
      credentials: 'include'
    });
    const res = await response.json();
    if (response.ok) {
        return res;
    } else {
        return null;
    }
  },

  async getUserPosts() {
    const response = await fetch(`${urlBase}user/posts`, {
      credentials: 'include',
    });
    const res =  await response.json();
    if (response.ok) {
        return res;
    } else {
        return null;
    }   
  },
  
  async createPost(postData) {
    const response = await fetch(`${urlBase}posts`, {
      method: 'POST',
      credentials: 'include',
      body: postData,
    });
    const res =  await response.json();
    if (response.ok) {
        return res;
    } else {
        return null;
    }   
  },

  //async editPost(postId, postData) {
  async editPost(postId, postData) {
    const response = await fetch(`${urlBase}posts/${postId}`, {
      method: 'PATCH',
      credentials: 'include',
      body: postData,
    });
    const res =  await response.json();
    if (response.ok) {
        return res;
    } else {
        return null;
    }   
  },

  async deletePost(postId) {
    const response = await fetch(`${urlBase}posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok) {
        return true;
    } else {
        return false;
    }
  },

  async addComment(postId, commentData) {
    const response = await fetch(`${urlBase}posts/${postId}/comments`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: commentData }),
    });
    const res =  await response.json();
    if (response.ok) {
        return res;
    } else {
        return null;
    }
  },
  
  async likePost(postId) {
    const response = await fetch(`${urlBase}posts/${postId}/like`, {
      method: 'POST',
      credentials: 'include'
    });
    const res = await response.json();
    if (response.ok) {
        return res;
    } else {
        return null;
    }
  },

  async likedPost(postId) {
    const response = await fetch(`${urlBase}posts/${postId}/liked`, {
      credentials: 'include'
    });
    const res = await response.json();
    if (response.ok) {
        return res.liked;
    } else {
        return null;
    }
  },


  async logout() {
    const response = await fetch(`${urlBase}logout`, {
      credentials: 'include',
    });
  }
};