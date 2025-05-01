import React, { useState } from 'react';
import { supabase } from '../supabaseClient.js';
import './AuthForm.css';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    setMessage(error ? error.message : 'Vérifie tes mails pour confirmer ton inscription.');
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Connexion réussie !');
      setTimeout(() => {
        window.location.href = '/profil';
      }, 900);
    }
  }

  async function handleSignOut() {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    setMessage('Déconnecté !');
  }

  return (
    <div className="auth-form-container">
      <h1 className="auth-title">Connexion / Inscription</h1>
      <form className="auth-form" onSubmit={handleSignIn}>
        <input
          type="email"
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <div className="auth-buttons">
          <button type="submit" className="btn-orange" disabled={loading}>Connexion</button>
          <button type="button" className="btn-orange-outline" onClick={handleSignUp} disabled={loading}>Créer un compte</button>
        </div>
      </form>
      <button className="btn-orange logout-btn" onClick={handleSignOut} disabled={loading}>Déconnexion</button>
      <div className="auth-message">{message}</div>
    </div>
  );
}
