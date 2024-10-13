import React, { useState, useEffect } from 'react';
import SignIn from './SignIn';
import AddItem from './AddItem';
import ItemsList from './ItemsList';
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = useState(null);

  // Check if a user is signed in on initial load
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    checkUser();
  }, []);

  // Render different content based on whether a user is signed in
  return (
    <div className="App">
      {user ? (
        <>
          <h2>Welcome, {user.email}</h2>
          <button onClick={() => supabase.auth.signOut().then(() => setUser(null))}>
            Sign Out
          </button>
          <AddItem user={user} />
          <ItemsList user={user} />
        </>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </div>
  );
}

export default App;