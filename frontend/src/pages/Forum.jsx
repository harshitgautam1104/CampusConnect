import { useEffect, useState } from 'react';
import API from '../api';


const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchPosts = async () => {
        const { data } = await API.get('/discussions');
        setPosts(data);
    };

    useEffect(() => { fetchPosts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/discussions', { content });
            setContent('');
            fetchPosts();
        } catch (err) { alert("Failed to post"); }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            
            <div className="max-w-3xl mx-auto px-6 py-10">
                <h2 className="text-4xl font-black text-slate-800 mb-8">Community Forum</h2>
                
                {/* Post Form */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-10">
                    <form onSubmit={handleSubmit}>
                        <textarea 
                            className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 transition h-32 text-slate-700"
                            placeholder="Ask a question or share an update..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
                                Post to Feed
                            </button>
                        </div>
                    </form>
                </div>

                {/* Posts List */}
                <div className="space-y-6">
                    {posts.map(p => (
                        <div key={p._id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                                    {p.user?.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg leading-tight">{p.user?.name}</h4>
                                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{p.user?.role}</span>
                                </div>
                                <span className="ml-auto text-xs font-medium text-slate-400">
                                    {new Date(p.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-lg">{p.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Forum;