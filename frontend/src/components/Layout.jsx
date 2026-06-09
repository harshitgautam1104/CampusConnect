import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50">
            
            {/* --- 3D BUBBLES BACKGROUND --- */}
            {/* Left Side Bubbles */}
            <div className="bubble bubble-blue w-64 h-64 left-[5%] animate-floatUp" style={{animationDuration: '18s'}}></div>
            <div className="bubble bubble-white w-40 h-40 left-[15%] animate-floatUp" style={{animationDuration: '12s', animationDelay: '4s'}}></div>
            <div className="bubble bubble-blue w-32 h-32 left-[2%] animate-floatUp" style={{animationDuration: '20s', animationDelay: '8s'}}></div>

            {/* Right Side Bubbles */}
            <div className="bubble bubble-white w-72 h-72 right-[5%] animate-floatUp" style={{animationDuration: '22s', animationDelay: '2s'}}></div>
            <div className="bubble bubble-blue w-48 h-48 right-[15%] animate-floatUp" style={{animationDuration: '14s', animationDelay: '6s'}}></div>
            <div className="bubble bubble-white w-56 h-56 right-[2%] animate-floatUp" style={{animationDuration: '25s', animationDelay: '10s'}}></div>
            {/* ----------------------------- */}

            <Navbar />
            
            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;