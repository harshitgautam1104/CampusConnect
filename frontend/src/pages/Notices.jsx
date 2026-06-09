import { useEffect, useState } from 'react';
import API from '../api';


const Notices = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const { data } = await API.get('/notices');
                setNotices(data);
            } catch (error) { console.error(error); }
        };
        fetchNotices();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Notice Board</h2>
                    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                        {notices.length} New Updates
                    </span>
                </div>

                <div className="grid gap-6">
                    {notices.map((n) => (
                        <div key={n._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">{n.category}</span>
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition">{n.title}</h3>
                                    <p className="text-slate-600 mt-3 leading-relaxed">{n.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">
                                    {n.createdBy?.name.charAt(0)}
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{n.createdBy?.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notices;