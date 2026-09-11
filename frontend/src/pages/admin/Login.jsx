import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Landmark } from 'lucide-react';
import { Spinner } from '../../components/Spinner';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // If already logged in, redirect to admin dashboard
  if (!authLoading && user) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{backgroundColor: 'var(--color-bg-alt)'}}>
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border" style={{borderColor: 'var(--color-border)'}}>
        <div className="text-center mb-8">
          <Landmark size={48} className="mx-auto text-accent mb-4" />
          <h2 className="text-2xl font-bold text-primary">FinTax Admin Portal</h2>
          <p className="text-muted mt-2">Sign in to manage your website</p>
        </div>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="form-group mb-0">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-0">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4 flex justify-center h-12" disabled={loading}>
            {loading ? <Spinner size={20} /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
