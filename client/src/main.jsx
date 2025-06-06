import { StrictMode, useEffect,  useState,createContext, useContext} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { api } from './api.jsx';
import { urlBase } from './api.jsx';
import { User, Edit3, Heart, MessageCircle, Calendar, LogOut, Menu, X, Plus, Home, Info, Settings } from 'lucide-react';



const AuthContext = createContext();
// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
          const data = JSON.parse(userData);
          setUser(data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        const user_ = JSON.stringify(response.user);
        localStorage.setItem('user', user_);
        setUser(response.user); 
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const  logout = async () => {
    await api.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      {/* Other components can go here, e.g., Router */}
    </AuthProvider>
  </StrictMode>,
)
