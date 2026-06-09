import { useEffect, useState } from 'react';
import API from '../api';


const LostFound = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ itemName: '', description: '', status: 'Lost', location: '', contactInfo: '' });

    const fetchItems = async () => {
        const { data } = await API.get('/lostfound');
        setItems(data);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/lostfound', form);
        alert("Reported!");
        setForm({ itemName: '', description: '', status: 'Lost', location: '', contactInfo: '' });
        fetchItems();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid lg:grid-cols-3 gap-10">
                    
                    {/* Sidebar Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Report an Item</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="What was it?" value={form.itemName} onChange={e => setForm({...form, itemName: e.target.value})} required />
                                <select className="w-full p-3 rounded-xl border border-slate-200 outline-none" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                                    <option value="Lost">I Lost Something</option>
                                    <option value="Found">I Found Something</option>
                                </select>
                                <input className="w-full p-3 rounded-xl border border-slate-200 outline-none" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
                                <input className="w-full p-3 rounded-xl border border-slate-200 outline-none" placeholder="Your Phone/Email" value={form.contactInfo} onChange={e => setForm({...form, contactInfo: e.target.value})} required />
                                <textarea className="w-full p-3 rounded-xl border border-slate-200 outline-none h-24" placeholder="Brief description..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} required></textarea>
                                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition">Post Report</button>
                            </form>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-slate-800 mb-8">Recent Reports</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {items.map(item => (
                                <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                                    <div className={`px-4 py-1 text-xs font-black uppercase tracking-widest text-white ${item.status === 'Lost' ? 'bg-red-500' : 'bg-emerald-500'}`}>
                                        {item.status}
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-lg font-bold text-slate-800">{item.itemName}</h4>
                                        <p className="text-slate-500 text-sm mt-2 line-clamp-2">{item.description}</p>
                                        <div className="mt-4 pt-4 border-t border-slate-50 space-y-2">
                                            <p className="text-xs text-slate-400 flex items-center gap-2 font-medium">📍 {item.location}</p>
                                            <p className="text-xs text-slate-400 flex items-center gap-2 font-medium">📞 {item.contactInfo}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LostFound;