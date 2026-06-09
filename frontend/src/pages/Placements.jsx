import { useEffect, useState } from 'react';
import API from '../api';


const Placements = () => {
    const [placements, setPlacements] = useState([]);
    const [form, setForm] = useState({ companyName: '', jobRole: '', package: '', eligibility: '', deadline: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchPlacements = async () => {
        const { data } = await API.get('/placements');
        setPlacements(data);
    };

    useEffect(() => { fetchPlacements(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/placements', form);
        alert("Placement Drive Added!");
        fetchPlacements();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-10">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Career Hub</h2>
                    <p className="text-slate-500 mt-2">Latest job opportunities and campus placement drives.</p>
                </div>

                {user?.role === 'admin' && (
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-10">
                        <h3 className="text-xl font-bold mb-6">Add New Placement Drive</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input className="p-3 rounded-xl border border-slate-200 outline-none" placeholder="Company Name" onChange={e => setForm({...form, companyName: e.target.value})} required />
                            <input className="p-3 rounded-xl border border-slate-200 outline-none" placeholder="Job Role" onChange={e => setForm({...form, jobRole: e.target.value})} required />
                            <input className="p-3 rounded-xl border border-slate-200 outline-none" placeholder="Salary Package (e.g. 10 LPA)" onChange={e => setForm({...form, package: e.target.value})} required />
                            <input className="p-3 rounded-xl border border-slate-200 outline-none" placeholder="Eligibility" onChange={e => setForm({...form, eligibility: e.target.value})} required />
                            <input type="date" className="p-3 rounded-xl border border-slate-200 outline-none" onChange={e => setForm({...form, deadline: e.target.value})} required />
                            <button className="bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">Post Opening</button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {placements.map(p => (
                        <div key={p._id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition duration-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8">
                                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-black text-sm tracking-tight group-hover:scale-110 transition inline-block">
                                    💰 {p.package}
                                </span>
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 mb-2">{p.companyName}</h3>
                            <p className="text-blue-600 font-bold mb-6 text-lg tracking-tight uppercase">{p.jobRole}</p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <span className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">🎓</span>
                                    <span className="text-sm font-medium">{p.eligibility}</span>
                                </div>
                                <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-2xl">
                                    <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-lg">⏳</span>
                                    <span className="text-sm font-bold">Apply Before: {new Date(p.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Placements;