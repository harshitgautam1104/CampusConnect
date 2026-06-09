import { Link } from 'react-router-dom';

const Dashboard = () => {
    const menuItems = [
        { title: "Notice", icon: "🔔", color: "from-yellow-400 to-orange-500", path: "/notices" },
        { title: "Library", icon: "📚", color: "from-green-400 to-emerald-600", path: "/materials" },
        { title: "Placement", icon: "💼", color: "from-blue-400 to-indigo-600", path: "/placements" },
        { title: "Events", icon: "🎉", color: "from-pink-400 to-rose-600", path: "/events" },
        { title: "Forum", icon: "💬", color: "from-purple-400 to-violet-600", path: "/forum" },
        { title: "Lost & Found", icon: "🔍", color: "from-cyan-400 to-blue-600", path: "/lost-found" },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            
            {/* Modern Hero Text */}
            <div className="text-center mb-20">
                <h2 className="text-6xl font-black text-slate-800 tracking-tighter">
                    Welcome to <span className="text-blue-600">CampusConnect</span>
                </h2>
                <p className="text-slate-500 text-lg mt-4 font-medium">
                    Your all-in-one digital campus hub. Stay updated, connected, and ahead.
                </p>
            </div>

            {/* Glassy Grid Menu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {menuItems.map((item, index) => (
                    <Link 
                        key={index} 
                        to={item.path} 
                        className="group relative bg-white/60 backdrop-blur-2xl p-12 rounded-[45px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white/50 flex flex-col items-center justify-center gap-6 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden"
                    >
                        {/* Decorative background glow */}
                        <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}></div>

                        {/* Icon - Using Emojis for now but you can use Lucide icons later */}
                        <div className="text-7xl drop-shadow-xl transform group-hover:scale-125 transition-transform duration-500">
                            {item.icon}
                        </div>
                        
                        <span className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                            {item.title}
                        </span>

                        {/* Simple dot indicator */}
                        <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-500 group-hover:scale-150 transition-all"></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;