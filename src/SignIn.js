import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) console.error('Error signing in:', error);
    else setUser(data.user);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) console.error('Error signing up:', error);
    else setUser(data.user);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sign In</h2>
      <form onSubmit={handleSignIn} className="mt-4">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
      </form>
      <div className="text-center mt-3">
        <h3>Don't have an account? Sign up below:</h3>
        <form onSubmit={handleSignUp} className="mt-3">
          <div className="form-group">
            <label htmlFor="signupEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="signupEmail"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="signupPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
