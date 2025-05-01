import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ username: '', created_at: '' });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) fetchProfile(user.id);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  async function fetchProfile(userId) {
    let { data, error } = await supabase
      .from('profiles')
      .select('username, created_at')
      .eq('id', userId)
      .single();
    if (!error && data) {
      setProfile(data);
      setNewUsername(data.username || '');
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!user) return;
    setMessage('');
    const updates = {
      id: user.id,
      username: newUsername,
      updated_at: new Date()
    };
    let { error } = await supabase.from('profiles').upsert(updates);
    if (!error) {
      setProfile({ ...profile, username: newUsername });
      setEditMode(false);
      setMessage('Profil mis à jour !');
    } else {
      setMessage(error.message);
    }
  }

  if (loading) {
    return <div className="profile-card">Chargement du profil...</div>;
  }
  if (!user) {
    return (
      <div className="profile-card">
        <h2>Non connecté</h2>
        <p>Merci de vous connecter pour accéder à votre profil.</p>
        <a href="/login" className="btn-orange">Connexion</a>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <h2>Profil utilisateur</h2>
      {!editMode ? (
        <>
          <div className="profile-info">
            <div><strong>Pseudo :</strong> {profile.username || <span style={{color:'#888'}}>Non défini</span>}</div>
            <div><strong>Email :</strong> {user.email}</div>
            <div><strong>ID utilisateur :</strong> {user.id}</div>
            <div><strong>Date d'inscription :</strong> {profile.created_at ? new Date(profile.created_at).toLocaleString() : <span style={{color:'#888'}}>NC</span>}</div>
          </div>
          <button className="btn-orange-outline" style={{marginTop:'18px'}} onClick={()=>setEditMode(true)}>Modifier mon profil</button>
        </>
      ) : (
        <form onSubmit={handleSave} style={{marginTop:'12px'}}>
          <div>
            <label>Pseudo : </label>
            <input type="text" value={newUsername} onChange={e=>setNewUsername(e.target.value)} required className="auth-input" style={{width:'200px'}} />
          </div>
          <div style={{marginTop:'12px'}}>
            <button className="btn-orange" type="submit">Enregistrer</button>
            <button className="btn-orange-outline" type="button" onClick={()=>setEditMode(false)} style={{marginLeft:'10px'}}>Annuler</button>
          </div>
        </form>
      )}
      <div className="auth-message">{message}</div>
      <a href="/" className="btn-orange-outline" style={{marginTop:'22px', display:'inline-block'}}>Retour à l'accueil</a>
    </div>
  );
}
