import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { User, LogIn, LogOut, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '../hooks/useTranslation';

interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
}

const AuthManager: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    authUrl: localStorage.getItem('auth-service-url') || ''
  });

  const handleLogin = async () => {
    if (!authData.email || !authData.password || !authData.authUrl) {
      toast({
        title: "Error",
        description: "Please enter email, password, and auth service URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    localStorage.setItem('auth-service-url', authData.authUrl);

    try {
      const response = await fetch(`${authData.authUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        localStorage.setItem('user', JSON.stringify(userData.user));
        localStorage.setItem('auth-token', userData.token);
        
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        setIsOpen(false);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Login failed. Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!authData.email || !authData.password || !authData.name || !authData.authUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${authData.authUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          name: authData.name,
          company: authData.company,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        localStorage.setItem('user', JSON.stringify(userData.user));
        localStorage.setItem('auth-token', userData.token);
        
        toast({
          title: "Success",
          description: "Account created successfully",
        });
        setIsOpen(false);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Welcome, {user.name}</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <LogIn className="w-4 h-4 mr-1" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Account Access
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Auth Service URL</label>
            <Input
              type="url"
              value={authData.authUrl}
              onChange={(e) => setAuthData(prev => ({ ...prev, authUrl: e.target.value }))}
              placeholder="https://your-auth-service.com/api"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your authentication service endpoint
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input
              type="email"
              value={authData.email}
              onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <Input
              type="password"
              value={authData.password}
              onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Your password"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Name (for registration)</label>
            <Input
              value={authData.name}
              onChange={(e) => setAuthData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Company (optional)</label>
            <Input
              value={authData.company}
              onChange={(e) => setAuthData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Your company"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleLogin} disabled={isLoading} className="flex-1">
              <LogIn className="w-4 h-4 mr-2" />
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <Button onClick={handleRegister} disabled={isLoading} variant="outline" className="flex-1">
              <User className="w-4 h-4 mr-2" />
              {isLoading ? 'Creating...' : 'Register'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthManager;