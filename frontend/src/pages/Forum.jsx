import { useEffect, useState } from 'react';
import API from '../api';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [replyText, setReplyText] = useState({}); // Har post ke liye alag reply text state
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchPosts = async () => {
        try {
            const { data } = await API.get('/discussions');
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await API.post('/discussions', { content });
            setContent('');
            fetchPosts();
        } catch (err) {
            alert("Failed to post");
        }
    };

    const handleLike = async (id) => {
        try {
            await API.post(`/discussions/like/${id}`);
            fetchPosts();
        } catch (err) {
            console.error("Like failed");
        }
    };

    const handleReply = async (postId) => {
        if (!replyText[postId]) return;
        try {
            await API.post(`/discussions/reply/${postId}`, { text: replyText[postId] });
            setReplyText({ ...replyText, [postId]: '' }); // Clear only this post's reply box
            fetchPosts();
        } catch (err) {
            alert("Reply failed");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-4xl font-black text-slate-800 mb-10 tracking-tighter">Community Forum</h2>

            {/* --- NEW POST FORM --- */}
            <div className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-xl mb-12 transform transition hover:scale-[1.01]">
                <form onSubmit={handlePost}>
                    <textarea 
                        className="w-full p-6 rounded-3xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-blue-400 transition h-24 text-slate-700 font-medium"
                        placeholder="What's happening on campus?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition active:scale-95">
                            Post to Feed
                        </button>
                    </div>
                </form>
            </div>

            {/* --- POSTS FEED --- */}
            <div className="space-y-8">
                {posts.map(p => (
                    <div key={p._id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm transition hover:shadow-md">
                        {/* User Info Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-inner">
                                {p.user?.name?.charAt(0) || "U"}
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800 leading-tight">{p.user?.name || "User"}</h4>
                                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{p.user?.role || "Member"}</p>
                            </div>
                            <span className="ml-auto text-xs font-bold text-slate-300">
                                {new Date(p.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Post Content */}
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">{p.content}</p>

                        {/* Interaction Bar (Likes & Replies Count) */}
                        <div className="flex items-center gap-8 border-t border-slate-50 pt-5 mb-6">
                            <button 
                                onClick={() => handleLike(p._id)} 
                                className={`flex items-center gap-2 font-black transition transform active:scale-125 ${p.likes?.includes(user?.id) ? 'text-pink-500' : 'text-slate-400'}`}
                            >
                                <span className="text-xl">{p.likes?.includes(user?.id) ? '💖' : '🤍'}</span>
                                {p.likes?.length || 0}
                            </button>
                            <div className="flex items-center gap-2 text-slate-400 font-black">
                                <span className="text-xl">💬</span> {p.replies?.length || 0} Replies
                            </div>
                        </div>

                        {/* --- REPLIES LIST --- */}
                        <div className="space-y-3 mb-8">
                            {p.replies?.map((r, idx) => (
                                <div key={idx} className="bg-slate-50/80 p-5 rounded-3xl ml-4 md:ml-12 border border-slate-100 relative">
                                    <div className="absolute left-[-20px] top-1/2 w-4 h-[2px] bg-slate-100 hidden md:block"></div>
                                    <p className="text-xs font-black text-indigo-600 mb-1 uppercase tracking-tight">{r.userName}</p>
                                    <p className="text-sm text-slate-600 font-medium">{r.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* --- REPLY INPUT BOX --- */}
                        <div className="flex gap-3 ml-4 md:ml-12">
                            <input 
                                className="flex-1 p-4 rounded-2xl bg-slate-100 border-none outline-none text-sm font-bold focus:ring-2 focus:ring-blue-400 transition"
                                placeholder="Write a thoughtful reply..."
                                value={replyText[p._id] || ''}
                                onChange={(e) => setReplyText({ ...replyText, [p._id]: e.target.value })}
                            />
                            <button 
                                onClick={() => handleReply(p._id)} 
                                className="bg-slate-900 text-white px-6 py-2 rounded-2xl text-xs font-black uppercase hover:bg-indigo-600 transition tracking-widest shadow-md"
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;