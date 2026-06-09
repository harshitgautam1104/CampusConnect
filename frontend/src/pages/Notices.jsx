import { useEffect, useState } from 'react';
import API from '../api';

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('General');
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchNotices = async () => {
        try {
            const { data } = await API.get('/notices');
            setNotices(data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/notices', { title, description, category });
            alert("Notice Published Successfully!");
            setTitle('');
            setDescription('');
            fetchNotices(); // List ko refresh karne ke liye
        } catch (error) {
            alert("Failed to publish notice");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black text-slate-800 tracking-tight">Notice Board</h2>
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-blue-200">
                    {notices.length} Updates
                </span>
            </div>

            {/* --- ADMIN/FACULTY ONLY FORM --- */}
            {(user?.role === 'admin' || user?.role === 'faculty') && (
                <div className="bg-white/70 backdrop-blur-md p-8 rounded-[35px] border border-white shadow-xl mb-12">
                    <h3 className="text-xl font-extrabold text-slate-700 mb-6 flex items-center gap-2">
                        <span>📢</span> Post New Notice
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <input 
                                className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition" 
                                placeholder="Notice Title" 
                                value={title}
                                onChange={e => setTitle(e.target.value)} 
                                required 
                            />
                            <select 
                                className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="General">General</option>
                                <option value="Examination">Examination</option>
                                <option value="Holiday">Holiday</option>
                                <option value="Events">Events</option>
                            </select>
                        </div>
                        <div className="space-y-4 flex flex-col">
                            <textarea 
                                className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition h-32 md:h-full" 
                                placeholder="Detailed Description..." 
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button className="md:col-span-2 bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                            Publish to Board
                        </button>
                    </form>
                </div>
            )}

            {/* --- NOTICES LIST --- */}
            <div className="grid gap-6">
                {notices.length > 0 ? notices.map((n) => (
                    <div key={n._id} className="bg-white p-8 rounded-[30px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                        {/* Category Tag */}
                        <div className="absolute top-0 right-0 px-6 py-2 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                            {n.category}
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-1">
                                <h3 className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition mb-3">
                                    {n.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    {n.description}
                                </p>
                            </div>
                            <div className="text-right min-w-fit">
                                <span className="text-sm font-bold text-slate-300">{new Date(n.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Posted By Badge */}
                        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                {n.createdBy?.name?.charAt(0) || "A"}
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-800 leading-none">{n.createdBy?.name || "Admin"}</p>
                                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter mt-1">{n.createdBy?.role || "Staff"}</p>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-20 bg-white/30 rounded-[40px] border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold text-xl">No notices posted yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notices;