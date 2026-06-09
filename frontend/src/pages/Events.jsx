import { useEffect, useState } from 'react';
import API from '../api';


const Events = () => {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', date: '', venue: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchEvents = async () => {
        const { data } = await API.get('/events');
        setEvents(data);
    };

    useEffect(() => { fetchEvents(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        await API.post('/events', form);
        alert("Event Created!");
        fetchEvents();
    };

    const handleRegister = async (eventId) => {
        try {
            const { data } = await API.post(`/events/register/${eventId}`);
            alert(data.message);
            fetchEvents();
        } catch (err) { alert(err.response.data.message); }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            
            <div className="max-w-6xl mx-auto px-6 py-10">
                <h2 className="text-4xl font-black text-slate-800 mb-10">Campus Events</h2>

                {user?.role === 'admin' && (
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-12">
                        <h3 className="text-xl font-bold mb-6 text-slate-700">Host New Event</h3>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500" placeholder="Event Title" onChange={e => setForm({...form, title: e.target.value})} required />
                            <input className="p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500" placeholder="Venue" onChange={e => setForm({...form, venue: e.target.value})} required />
                            <input type="date" className="p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setForm({...form, date: e.target.value})} required />
                            <input className="p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-500" placeholder="Short Description" onChange={e => setForm({...form, description: e.target.value})} required />
                            <button type="submit" className="md:col-span-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition">Create Event</button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(ev => (
                        <div key={ev._id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col group hover:shadow-xl transition duration-300">
                            <div className="bg-indigo-600 p-8 text-white">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{ev.date}</span>
                                <h3 className="text-2xl font-bold mt-4 leading-tight">{ev.title}</h3>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <p className="text-slate-500 font-medium mb-2">📍 {ev.venue}</p>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">{ev.description}</p>
                                
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="text-sm font-bold text-slate-400">
                                        👥 {ev.participants.length} Joined
                                    </div>
                                    {user?.role === 'student' && (
                                        <button 
                                            onClick={() => handleRegister(ev._id)} 
                                            className="bg-blue-50 text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition"
                                        >
                                            Join Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;