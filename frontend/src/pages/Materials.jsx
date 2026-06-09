import { useState, useEffect } from 'react';
import API from '../api';


const Materials = () => {
    const [materials, setMaterials] = useState([]);
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchMaterials = async () => {
        const { data } = await API.get('/materials');
        setMaterials(data);
    };

    useEffect(() => { fetchMaterials(); }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subject', subject);
        formData.append('file', file);

        try {
            await API.post('/materials/upload', formData);
            alert("Uploaded Successfully!");
            fetchMaterials();
        } catch (err) { alert("Upload Failed"); }
    };

    return (
        <div className="min-h-screen bg-slate-50">
           
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800">Digital Library</h2>
                        <p className="text-slate-500 mt-2">Access all study notes and resources here.</p>
                    </div>

                    {(user?.role === 'admin' || user?.role === 'faculty') && (
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 w-full md:w-auto">
                            <form onSubmit={handleUpload} className="flex flex-wrap gap-3">
                                <input className="px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm" placeholder="Title" onChange={e => setTitle(e.target.value)} required />
                                <input className="px-4 py-2 rounded-lg border border-slate-200 outline-none text-sm" placeholder="Subject" onChange={e => setSubject(e.target.value)} required />
                                <input type="file" className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={e => setFile(e.target.files[0])} required />
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition text-sm">Upload</button>
                            </form>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {materials.map(m => (
                        <div key={m._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-red-50 rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500">PDF</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 line-clamp-1">{m.title}</h4>
                            <p className="text-sm text-slate-500 mb-6 font-medium uppercase tracking-tight">{m.subject}</p>
                            <a 
                                href={`http://localhost:5000/${m.fileUrl}`} 
                                target="_blank" 
                                className="inline-flex items-center justify-center w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition gap-2"
                            >
                                📥 Download Resource
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Materials;