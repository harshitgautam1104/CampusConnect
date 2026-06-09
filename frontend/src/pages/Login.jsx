import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); 
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '', role: 'student'
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const { data } = await API.post('/auth/login', { email: formData.email, password: formData.password });
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                if(formData.password !== formData.confirmPassword) return alert("Passwords do not match!");
                await API.post('/auth/register', formData);
                alert("Account Created! Please Login.");
                setIsLogin(true);
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-slate-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/campus.jpg" 
                    className="w-full h-full object-cover opacity-50 blur-[2px]" 
                    alt="Campus"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Title Section */}
            <div className="absolute top-10 text-center z-10 w-full">
                <h1 className="text-5xl font-black text-white tracking-tighter">CampusConnect</h1>
                <p className="text-white/60 font-medium">Your Gateway to Campus Life</p>
            </div>

            {/* AUTH CARD */}
            <div className={`z-10 w-full max-w-[400px] p-10 rounded-[40px] shadow-2xl transition-all duration-500 ${isLogin ? 'bg-[#1a1a1a]/95 text-white' : 'bg-white text-slate-800'}`}>
                
                <h2 className="text-3xl font-black text-center mb-2">{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
                <p className={`text-center text-sm mb-8 ${isLogin ? 'text-slate-400' : 'text-slate-500'}`}>
                    {isLogin ? 'Sign in to continue your journey' : 'Join our campus community today'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input className="w-full p-4 rounded-2xl bg-slate-100 border-none outline-none text-slate-800" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    )}
                    
                    <input type="email" className={`w-full p-4 rounded-2xl border-none outline-none ${isLogin ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'}`} placeholder="University Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />

                    {!isLogin && (
                        <div className="py-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                            I am a...
                            <div className="flex gap-4 mt-2 text-slate-800">
                                {['student', 'faculty', 'admin'].map((r) => (
                                    <label key={r} className="flex items-center gap-1 cursor-pointer capitalize">
                                        <input type="radio" name="role" value={r} checked={formData.role === r} onChange={(e) => setFormData({...formData, role: e.target.value})} /> {r}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    <input type="password" className={`w-full p-4 rounded-2xl border-none outline-none ${isLogin ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'}`} placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />

                    {!isLogin && (
                        <input type="password" className="w-full p-4 rounded-2xl bg-slate-100 border-none outline-none text-slate-800" placeholder="Confirm Password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
                    )}

                    <button type="submit" className="w-full py-4 bg-blue-300 text-slate-900 font-black text-xl rounded-2xl hover:bg-blue-400 transition">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-slate-700 pt-6">
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 font-bold hover:underline">
                        {isLogin ? "New to Campus? Create Account" : "Already have an account? Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login; 