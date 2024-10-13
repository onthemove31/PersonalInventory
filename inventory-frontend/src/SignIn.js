import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Sign In button clicked');
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error signing in:', error);
      } else {
        console.log('Signed in successfully:', data);
        setUser(data.user); // Update the user state in App component
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Error signing up:', error);
      } else {
        console.log('Signed up successfully:', data);
        setUser(data.user); // Optionally sign in the user after sign-up
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
