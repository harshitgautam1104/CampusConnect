import { useEffect, useState } from 'react';
import API from '../api';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await API.get('/auth/profile');
                setProfile(data);
            } catch (err) { console.error(err); }
        };
        fetchProfile();
    }, []);

    if (!profile) return <div className="text-center mt-20 animate-pulse text-slate-400 font-bold">Loading ID Card...</div>;

    return (
        <div className="min-h-screen bg-slate-50">
            
            <div className="flex justify-center items-center py-12 px-4">
                
                {/* THE ID CARD */}
                <div className="w-full max-w-[420px] bg-white border-2 border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden rounded-2xl">
                    
                    {/* Header Banner */}
                    <div className="bg-[#B21F1F] text-white p-6 text-center border-b-4 border-yellow-400">
                        <h1 className="text-3xl font-black leading-tight uppercase tracking-tighter">Campus Connect</h1>
                        <p className="text-xs font-bold tracking-[0.2em] opacity-80 mt-1">(EXCELLENCE IN COMMUNICATION)</p>
                    </div>

                    <div className="p-8 text-center bg-white">
                        <h2 className="text-xl font-black text-slate-400 mb-8 tracking-[0.3em] border-b pb-2 uppercase">Identity Card</h2>
                        
                        {/* Student/Faculty Photo Frame */}
                        <div className="w-44 h-52 mx-auto border-[6px] border-blue-500/20 p-1 bg-white shadow-inner mb-8">
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-6xl font-black text-blue-600/30">
                                {profile.user.name.charAt(0)}
                            </div>
                        </div>

                        {/* Name & Course Details */}
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">{profile.user.name}</h3>
                            <p className="text-slate-600 font-bold text-lg uppercase tracking-wide">
                                {profile.user.role === 'student' ? 'Bachelor Of Technology' : 'Campus Management'}
                            </p>
                            <p className="text-blue-600 font-black text-sm uppercase">
                                {profile.user.role === 'student' ? 'Computer Science & Engineering' : 'Administration Department'}
                            </p>
                            
                            <div className="mt-10 pt-6 border-t-2 border-dashed border-slate-100 text-left space-y-2">
                                
                                {/* MOBILE NUMBER (Dynamic) */}
                                <div className="flex justify-between">
                                    <span className="font-bold text-slate-400 uppercase text-xs">Mobile</span>
                                    <span className="font-black text-slate-800">
                                        {profile.user.mobile || '9998515268'}
                                    </span>
                                </div>

                                {/* ENROLLMENT or JOB ID (Conditional Label & Dynamic Data) */}
                                <div className="flex justify-between">
                                    <span className="font-bold text-slate-400 uppercase text-xs">
                                        {profile.user.role === 'student' ? 'Enrollment' : 'Job ID'}
                                    </span>
                                    <span className="font-black text-slate-800 uppercase">
                                        {profile.user.uniqueId || 'CC2025XXXX'}
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* QR Code Placeholder */}
                        <div className="mt-10 flex justify-center opacity-80">
                            <div className="w-24 h-24 border-2 border-slate-900 p-1">
                                <div className="w-full h-full bg-slate-900 flex flex-wrap p-1">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className={`w-1/4 h-1/4 ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Banner */}
                    <div className="bg-[#B21F1F] text-white py-4 text-center">
                        <h4 className="font-black tracking-[0.2em] text-xl italic uppercase">Unbeatable Placement</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;