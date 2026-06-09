import { useEffect, useState } from 'react';
import API from '../api';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [replyText, setReplyText] = useState({}); // Post ID wise reply text
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchPosts = async () => {
        const { data } = await API.get('/discussions');
        setPosts(data);
    };

    useEffect(() => { fetchPosts(); }, []);

    const handlePost = async (e) => {
        e.preventDefault();
        await API.post('/discussions', { content });
        setContent('');
        fetchPosts();
    };

    const handleLike = async (id) => {
        await API.post(`/discussions/like/${id}`);
        fetchPosts();
    };

    const handleReply = async (postId) => {
        if (!replyText[postId]) return;
        await API.post(`/discussions/reply/${postId}`, { text: replyText[postId] });
        setReplyText({ ...replyText, [postId]: '' });
        fetchPosts();
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-4xl font-black text-slate-800 mb-10">Community Forum</h2>

            {/* New Post Form */}
            <div className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-xl mb-12">
                <form onSubmit={handlePost}>
                    <textarea 
                        className="w-full p-6 rounded-3xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition h-24"
                        placeholder="Share something with the campus..."
                        value={content} onChange={(e) => setContent(e.target.value)} required
                    ></textarea>
                    <div className="flex justify-end mt-4">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-100">Post Feed</button>
                    </div>
                </form>
            </div>

            {/* Posts Feed */}
            <div className="space-y-8">
                {posts.map(p => (
                    <div key={p._id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl">
                                {p.user?.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800">{p.user?.name}</h4>
                                <p className="text-[10px] font-bold text-blue-500 uppercase">{p.user?.role}</p>
                            </div>
                        </div>

                        <p className="text-slate-600 text-lg mb-6 leading-relaxed">{p.content}</p>

                        {/* Interaction Bar */}
                        <div className="flex items-center gap-6 border-t border-slate-50 pt-4 mb-6">
                            <button onClick={() => handleLike(p._id)} className={`flex items-center gap-2 font-bold ${p.likes.includes(user.id) ? 'text-pink-500' : 'text-slate-400'}`}>
                                💖 {p.likes.length} Likes
                            </button>
                            <span className="text-slate-400 font-bold">💬 {p.replies.length} Replies</span>
                        </div>

                        {/* Replies List */}
                        <div className="space-y-3 mb-6">
                            {p.replies.map((r, idx) => (
                                <div key={idx} className="bg-slate-50 p-4 rounded-2xl ml-8">
                                    <p className="text-xs font-black text-blue-600 mb-1">{r.userName}</p>
                                    <p className="text-sm text-slate-600">{r.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Reply Input */}
                        <div className="flex gap-2 ml-8">
                            <input 
                                className="flex-1 p-3 rounded-xl bg-slate-100 border-none outline-none text-sm"
                                placeholder="Write a reply..."
                                value={replyText[p._id] || ''}
                                onChange={(e) => setReplyText({ ...replyText, [p._id]: e.target.value })}
                            />
                            <button onClick={() => handleReply(p._id)} className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-600 transition">Reply</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;