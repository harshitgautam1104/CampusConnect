import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/20 px-10 py-5 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-16"> {/* Logo aur Links ke beech gap badhaya */}
                <h1 className="text-2xl font-black text-indigo-700 tracking-tighter">
                    CampusConnect
                </h1>
                
                {/* Links ke beech spacing badhayi (gap-10) */}
                <div className="hidden lg:flex gap-10 text-slate-600 font-bold text-sm uppercase tracking-wider">
                    <Link to="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
                    <Link to="/notices" className="hover:text-indigo-600 transition">Notices</Link>
                    <Link to="/materials" className="hover:text-indigo-600 transition">Library</Link>
                    <Link to="/placements" className="hover:text-indigo-600 transition">Placements</Link>
                    <Link to="/forum" className="hover:text-indigo-600 transition">Forum</Link>
                    <Link to="/lost-found" className="hover:text-indigo-600 transition text-nowrap">Lost & Found</Link>
                    <Link to="/events" className="hover:text-indigo-600 transition">Events</Link>
                </div>
            </div>
            
            <div className="flex items-center gap-8"> {/* Right side components ke beech gap */}
                <Link to="/profile" className="text-sm font-black text-indigo-900 bg-white/50 px-4 py-2 rounded-full border border-white hover:bg-white transition">
                    Hi, {user?.name.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-red-600 transition shadow-lg shadow-red-200">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;