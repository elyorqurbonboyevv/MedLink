import React, { useState } from 'react';
import { supabase } from '../../services/supabase';
import { Profile } from '../../types/profile';
import { User, Shield, LogOut, ChevronRight, Save } from 'lucide-react';

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>({
    id: '',
    full_name: 'Elyor Kurbonboev',
    insurance_type: 'Public'
  });

  async function updateProfile() {
    if (!profile) return;
    const { error } = await supabase.from('profiles').upsert(profile);
    if (!error) setIsEditing(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          EK
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{profile?.full_name}</h1>
          <p className="text-slate-500 text-sm">{profile?.insurance_type} insurance</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="text-slate-400" size={20} />
              <span className="font-medium text-slate-700">Personal information</span>
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className="text-emerald-600 text-sm font-semibold">
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
          {isEditing && (
            <div className="mt-4 space-y-3">
              <input 
                className="w-full p-2 border rounded-lg" 
                value={profile?.full_name} 
                onChange={e => setProfile(p => p ? {...p, full_name: e.target.value} : null)}
              />
              <button onClick={updateProfile} className="w-full bg-emerald-600 text-white p-2 rounded-lg flex items-center justify-center space-x-2">
                <Save size={18} /> <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
        <button className="w-full p-4 flex items-center justify-between border-b border-gray-100"><div className="flex items-center space-x-3"><Shield className="text-slate-400" size={20}/><span className="font-medium">Insurance & Payment</span></div><ChevronRight className="text-slate-300" size={18}/></button>
        <button className="w-full p-4 flex items-center space-x-3 text-red-500"><LogOut size={20}/><span className="font-medium">Log out</span></button>
      </div>
    </div>
  );
}