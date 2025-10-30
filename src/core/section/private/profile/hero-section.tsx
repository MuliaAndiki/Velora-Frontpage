import { Camera, Check, Edit2, Eye, EyeOff, Lock, Mail, Phone, Save,User, X } from 'lucide-react';
import React, { useState } from 'react';

// Types
interface UserProfile {
  username: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
}

interface EditingField {
  field: keyof UserProfile | null;
  value: string;
}

// Main Component
const ProfileHeroSection: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    username: 'John Doe',
    email: 'john@gmail.com',
    phone: '+62 812-3456-7890',
    password: 'password123',
    avatar: '',
  });

  const [editing, setEditing] = useState<EditingField>({
    field: null,
    value: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleEdit = (field: keyof UserProfile): void => {
    // setEditing({
    //   field,
    //   value: profile[field],
    // });
  };

  const handleSave = (): void => {
    if (editing.field) {
      setProfile({
        ...profile,
        [editing.field]: editing.value,
      });
    }
    setEditing({ field: null, value: '' });
  };

  const handleCancel = (): void => {
    setEditing({ field: null, value: '' });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getFieldIcon = (field: keyof UserProfile) => {
    switch (field) {
      case 'username':
        return User;
      case 'email':
        return Mail;
      case 'phone':
        return Phone;
      case 'password':
        return Lock;
      default:
        return User;
    }
  };

  const getDisplayValue = (field: keyof UserProfile, value: string): string => {
    if (field === 'password' && !showPassword) {
      return '•'.repeat(value.length);
    }
    return value;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-2">
          Profile Settings
        </h1>
        <p className="text-slate-400 text-lg">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Profile Picture Section */}
        <div className="lg:col-span-2 bg-gradient-to-br from-orange-600 to-red-600 p-8 rounded-2xl shadow-xl">
          <h3 className="text-white text-2xl font-bold mb-6">Profile Picture</h3>

          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="relative group mb-6">
              <div className="w-40 h-40 border-4 border-white rounded-full overflow-hidden flex items-center justify-center bg-white shadow-2xl">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="text-orange-600" size={80} />
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white" size={32} />
              </div>
            </div>

            {/* Upload Button */}
            <label className="flex items-center gap-3 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <Camera size={20} />
              <span>Change Picture</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            {/* User Info Summary */}
            <div className="mt-8 text-center">
              <h4 className="text-white text-xl font-bold mb-1">{profile.username}</h4>
              <p className="text-orange-100 text-sm">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="lg:col-span-3 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl shadow-xl">
          <h3 className="text-white text-2xl font-bold mb-8">Personal Information</h3>

          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="flex items-center gap-2 text-slate-300 font-semibold mb-3">
                <User size={18} />
                <span>Username</span>
              </label>
              <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                {editing.field === 'username' ? (
                  <div className="flex items-center gap-2 p-4">
                    <input
                      type="text"
                      value={editing.value}
                      onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                      className="flex-1 bg-transparent text-white outline-none"
                      autoFocus
                    />
                    <button
                      onClick={handleSave}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                    >
                      <Check className="text-white" size={18} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                      <X className="text-white" size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4">
                    <span className="text-white text-lg">{profile.username}</span>
                    <button
                      onClick={() => handleEdit('username')}
                      className="p-2 bg-orange-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition group"
                    >
                      <Edit2
                        className="text-orange-400 group-hover:scale-110 transition-transform"
                        size={18}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-slate-300 font-semibold mb-3">
                <Mail size={18} />
                <span>Email</span>
              </label>
              <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                {editing.field === 'email' ? (
                  <div className="flex items-center gap-2 p-4">
                    <input
                      type="email"
                      value={editing.value}
                      onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                      className="flex-1 bg-transparent text-white outline-none"
                      autoFocus
                    />
                    <button
                      onClick={handleSave}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                    >
                      <Check className="text-white" size={18} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                      <X className="text-white" size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4">
                    <span className="text-white text-lg">{profile.email}</span>
                    <button
                      onClick={() => handleEdit('email')}
                      className="p-2 bg-orange-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition group"
                    >
                      <Edit2
                        className="text-orange-400 group-hover:scale-110 transition-transform"
                        size={18}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="flex items-center gap-2 text-slate-300 font-semibold mb-3">
                <Phone size={18} />
                <span>Phone</span>
              </label>
              <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                {editing.field === 'phone' ? (
                  <div className="flex items-center gap-2 p-4">
                    <input
                      type="tel"
                      value={editing.value}
                      onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                      className="flex-1 bg-transparent text-white outline-none"
                      autoFocus
                    />
                    <button
                      onClick={handleSave}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                    >
                      <Check className="text-white" size={18} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                      <X className="text-white" size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4">
                    <span className="text-white text-lg">{profile.phone}</span>
                    <button
                      onClick={() => handleEdit('phone')}
                      className="p-2 bg-orange-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition group"
                    >
                      <Edit2
                        className="text-orange-400 group-hover:scale-110 transition-transform"
                        size={18}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center gap-2 text-slate-300 font-semibold mb-3">
                <Lock size={18} />
                <span>Password</span>
              </label>
              <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                {editing.field === 'password' ? (
                  <div className="flex items-center gap-2 p-4">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={editing.value}
                      onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                      className="flex-1 bg-transparent text-white outline-none"
                      autoFocus
                    />
                    <button
                      onClick={handleSave}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                    >
                      <Check className="text-white" size={18} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                      <X className="text-white" size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4">
                    <span className="text-white text-lg">
                      {getDisplayValue('password', profile.password)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 bg-blue-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition group"
                      >
                        {showPassword ? (
                          <EyeOff
                            className="text-blue-400 group-hover:scale-110 transition-transform"
                            size={18}
                          />
                        ) : (
                          <Eye
                            className="text-blue-400 group-hover:scale-110 transition-transform"
                            size={18}
                          />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit('password')}
                        className="p-2 bg-orange-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition group"
                      >
                        <Edit2
                          className="text-orange-400 group-hover:scale-110 transition-transform"
                          size={18}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save All Button */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-3 group">
              <Save className="group-hover:scale-110 transition-transform" size={20} />
              <span>Save All Changes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h4 className="text-white font-bold text-lg mb-2">Account Status</h4>
          <p className="text-slate-400 text-sm mb-4">Your account is active and verified</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-semibold">Active</span>
          </div>
        </div>

        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h4 className="text-white font-bold text-lg mb-2">Member Since</h4>
          <p className="text-slate-400 text-sm mb-4">You joined on January 2024</p>
          <span className="text-blue-400 text-sm font-semibold">10 months ago</span>
        </div>

        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h4 className="text-white font-bold text-lg mb-2">Security Level</h4>
          <p className="text-slate-400 text-sm mb-4">Your account security is strong</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-700 rounded-full h-2">
              <div className="bg-green-500 h-full rounded-full w-4/5"></div>
            </div>
            <span className="text-green-400 text-sm font-semibold">80%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeroSection;
