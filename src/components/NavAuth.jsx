import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';

export default function NavAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (user) {
    return (
      <a href="/profil" className="nav-login-link" onClick={handleLogout} style={{marginRight:'18px'}}>Déconnexion</a>
    );
  } else {
    return (
      <a href="/login" className="nav-login-link" style={{marginRight:'18px'}}>Connexion</a>
    );
  }
}
