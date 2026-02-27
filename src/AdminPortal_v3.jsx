import React, { useState, useEffect, useMemo } from 'react';
import {
    Plus,
    Trash2,
    LogOut,
    Save,
    Image as ImageIcon,
    AlertCircle,
    Loader2,
    ChevronLeft,
    LayoutGrid,
    Factory,
    Package,
    Search,
    Edit2,
    X,
    Settings,
    ChevronRight,
    Monitor,
    Library
} from 'lucide-react';
import { auth, db } from './firebase';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    updateDoc
} from 'firebase/firestore';

const AdminPortal = ({ onBack }) => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [viewMode, setViewMode] = useState('split'); // 'split' or 'focus'

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        material: '',
        engName: '',
        type: 'knitting',
        cloudinaryId: '',
        desc: '',
        features: '',
        weight: '',
        width: '',
        structure: '',
        colors: ''
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(prods);
        });
        return unsubscribe;
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
        }
    };

    const handleLogout = () => signOut(auth);

    const resetForm = () => {
        setFormData({
            name: '',
            code: '',
            material: '',
            engName: '',
            type: 'knitting',
            cloudinaryId: '',
            desc: '',
            features: '',
            weight: '',
            width: '',
            structure: '',
            colors: ''
        });
        setEditingId(null);
    };

    const handleOpenWidget = () => {
        if (!window.cloudinary) {
            alert("이미지 위젯을 불러오는 중입니다. 잠시 후 다시 시도해 주세요. (인터넷 연결 확인)");
            return;
        }

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        if (!cloudName || cloudName === 'Root') {
            alert("Cloud Name이 올바르지 않습니다. .env 파일의 VITE_CLOUDINARY_CLOUD_NAME을 확인해 주세요. 현재 값: " + cloudName);
            return;
        }

        window.cloudinary.openUploadWidget({
            cloudName: cloudName,
            uploadPreset: "hwoasung_preset",
            sources: ['local', 'url', 'camera', 'cloudinary'],
            showAdvancedOptions: true,
            cropping: true,
            multiple: false,
            defaultSource: "local",
            language: "ko",
            text: {
                ko: {
                    menu: {
                        files: "내 기기",
                        url: "웹 URL",
                        camera: "카메라",
                        cloudinary: "미디어 라이브러리"
                    }
                }
            },
            styles: {
                palette: {
                    window: "#0D1117",
                    sourceBg: "#161B22",
                    windowBorder: "#30363D",
                    tabIcon: "#FFFFFF",
                    inactiveTabIcon: "#8B949E",
                    menuIcons: "#C9D1D9",
                    link: "#6366f1",
                    action: "#6366f1",
                    inProgress: "#6366f1",
                    complete: "#238636",
                    error: "#F85149",
                    textDark: "#000000",
                    textLight: "#FFFFFF"
                }
            }
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                setFormData(prev => ({ ...prev, cloudinaryId: result.info.public_id }));
                alert("이미지가 선택되었습니다: " + result.info.public_id);
            } else if (error) {
                console.error("Cloudinary Widget Error:", error);
                alert(`업로드 중 오류가 발생했습니다: ${error}\n\n[체크포인트]\n1. Cloudinary 설정에서 'hwoasung_preset'이라는 이름의 'Unsigned' 프리셋을 만드셨나요?\n2. .env 파일의 Cloud Name이 정확한가요?`);
            } else if (result.event === "display-changed" && result.info === "shown") {
                console.log("Widget opened");
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                features: typeof formData.features === 'string'
                    ? formData.features.split(',').map(f => f.trim())
                    : formData.features,
                updatedAt: new Date()
            };

            if (editingId) {
                await updateDoc(doc(db, 'products', editingId), payload);
                alert('제품 정보가 성공적으로 수정되었습니다. (Firestore)');
            } else {
                await addDoc(collection(db, 'products'), {
                    ...payload,
                    createdAt: new Date()
                });
                alert('새 제품이 성공적으로 등록되었습니다. (Firestore)');
            }
            resetForm();
        } catch (err) {
            console.error("Firestore Write Error:", err);
            alert(`오류가 발생했습니다: ${err.message || '알 수 없는 오류'}\n\nFirebase Console에서 Firestore 규칙이 허용되어 있는지 확인해 주세요.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            ...product,
            features: Array.isArray(product.features) ? product.features.join(', ') : product.features
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await deleteDoc(doc(db, 'products', id));
            if (editingId === id) resetForm();
        } catch (err) {
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#06080b] flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-500" size={48} />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#06080b] flex items-center justify-center p-6 font-sans">
                <div className="w-full max-w-md bg-[#0d1117] border border-white/10 p-12 rounded-sm shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
                    <div className="flex items-center space-x-4 mb-10">
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">Admin Portal</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Credentials</label>
                            <input
                                type="email"
                                placeholder="Manager Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#161b22] border border-white/5 text-white px-5 py-4 rounded-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Access Key"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#161b22] border border-white/5 text-white px-5 py-4 rounded-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-[10px] font-bold italic uppercase tracking-widest">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest py-5 transition-all text-xs"
                        >
                            Enter Control Center
                        </button>
                        <button
                            type="button"
                            onClick={onBack}
                            className="w-full text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest py-2 transition-all mt-4"
                        >
                            Cancel and Return
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#06080b] text-white font-sans selection:bg-indigo-600 h-screen flex flex-col overflow-hidden">
            {/* Dynamic Header */}
            <header className="h-20 bg-[#0d1117] border-b border-white/5 px-10 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-sm flex items-center justify-center text-white font-black text-xs italic">H</div>
                        <h2 className="text-xl font-black italic uppercase tracking-tighter">Hwoasung Command</h2>
                    </div>
                    <div className="h-6 w-px bg-white/10 hidden md:block"></div>
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-bold text-slate-400">DB CONNECTED</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="flex items-center bg-[#161b22] rounded-sm p-1 border border-white/5">
                        <button
                            onClick={() => setViewMode('split')}
                            className={`p-2 rounded-sm transition-all ${viewMode === 'split' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white'}`}
                            title="Split View"
                        >
                            <Monitor size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('focus')}
                            className={`p-2 rounded-sm transition-all ${viewMode === 'focus' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white'}`}
                            title="Focus View"
                        >
                            <LayoutGrid size={16} />
                        </button>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                    <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-sm transition-colors border border-white/5">
                        <ChevronLeft size={20} />
                    </button>
                </div>
            </header>

            {/* Main Split Interface */}
            <div className="flex-1 flex overflow-hidden">
                {/* Registration Form Column */}
                <section className={`${viewMode === 'split' ? 'w-[450px]' : 'hidden'} bg-[#0d1117] border-r border-white/5 overflow-y-auto custom-scrollbar p-10 space-y-10`}>
                    <div>
                        <h3 className="text-sm font-black text-indigo-500 uppercase tracking-[0.4em] mb-1">Station 01</h3>
                        <h4 className="text-2xl font-black italic uppercase tracking-tighter">
                            {editingId ? 'Modify Product' : 'Register Entry'}
                        </h4>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Classification</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'knitting' })}
                                        className={`py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border ${formData.type === 'knitting' ? 'bg-indigo-600 border-indigo-500' : 'bg-[#161b22] border-white/5 text-slate-500 hover:text-white'}`}
                                    >
                                        Unit 01: knitting
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'processed' })}
                                        className={`py-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border ${formData.type === 'processed' ? 'bg-indigo-600 border-indigo-500' : 'bg-[#161b22] border-white/5 text-slate-500 hover:text-white'}`}
                                    >
                                        Unit 02: processed
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Product Code</label>
                                    <input
                                        type="text"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        className="w-full bg-[#161b22] border border-white/5 text-white px-4 py-3 rounded-sm text-sm font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                                        placeholder="HS-..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Formal Name (KR)</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#161b22] border border-white/5 text-white px-4 py-3 rounded-sm text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                                        placeholder="ex. 싱글 저지 피치"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Internal ID (ENG)</label>
                                    <input
                                        type="text"
                                        value={formData.engName}
                                        onChange={(e) => setFormData({ ...formData, engName: e.target.value })}
                                        className="w-full bg-[#161b22] border border-white/5 text-white px-4 py-3 rounded-sm text-sm font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                                        placeholder="ex. SINGLE_JERSEY_PEACH"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Composition</label>
                                    <input
                                        type="text"
                                        value={formData.material}
                                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                        className="w-full bg-[#161b22] border border-white/5 text-white px-4 py-3 rounded-sm text-xs outline-none"
                                        placeholder="Cotton / Poly"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Structure</label>
                                    <input
                                        type="text"
                                        value={formData.structure}
                                        onChange={(e) => setFormData({ ...formData, structure: e.target.value })}
                                        className="w-full bg-[#161b22] border border-white/5 text-white px-4 py-3 rounded-sm text-xs outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Available Colors</label>
                                <input
                                    type="text"
                                    value={formData.colors}
                                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                                    className="w-full bg-[#161b22] border border-white/5 text-white px-4 py-3 rounded-sm text-xs outline-none"
                                    placeholder="ex. Black, White, Navy..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Density/Weight</label>
                                    <input
                                        type="text"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        className="w-full bg-[#161b22] border border-white/5 text-white px-4 py-3 rounded-sm text-xs outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Width</label>
                                    <input
                                        type="text"
                                        value={formData.width}
                                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                                        className="w-full bg-[#161b22] border border-white/5 text-white px-4 py-3 rounded-sm text-xs outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Cloudinary Public ID</label>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            type="button"
                                            onClick={handleOpenWidget}
                                            className="text-[8px] font-bold text-white bg-indigo-600 px-2 py-1 rounded-sm hover:bg-indigo-700 transition-colors uppercase flex items-center space-x-1"
                                        >
                                            <Library size={10} />
                                            <span>Library / Upload</span>
                                        </button>
                                        <a
                                            href="https://console.cloudinary.com/console/media-library"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[8px] font-bold text-indigo-400 hover:text-indigo-300 underline uppercase"
                                        >
                                            Open Console
                                        </a>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500">
                                        <ImageIcon size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.cloudinaryId}
                                        onChange={(e) => setFormData({ ...formData, cloudinaryId: e.target.value })}
                                        className="w-full bg-[#161b22] border border-white/5 text-white pl-12 pr-4 py-3 rounded-sm text-xs font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                                        placeholder="ex. products/fabric_01"
                                    />
                                </div>
                                <p className="text-[8px] text-slate-500 font-medium leading-relaxed italic">
                                    * Cloudinary에 이미지를 업로드한 후, 해당 이미지의 'Public ID'를 이곳에 입력해 주세요. (예: products/sample)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Key Features (Comma separated)</label>
                                <textarea
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full h-24 bg-[#161b22] border border-white/5 text-white px-4 py-3 rounded-sm text-xs focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                                    placeholder="Soft touch, High density, No shrinkage..."
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white font-black uppercase tracking-[0.2em] py-5 rounded-sm transition-all flex items-center justify-center space-x-3 text-xs shadow-xl shadow-indigo-600/20"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (editingId ? <Save size={18} /> : <Plus size={18} />)}
                                <span>{editingId ? 'Confirm Modifications' : 'Commit To Inventory'}</span>
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="w-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-black uppercase tracking-widest py-3 rounded-sm transition-all text-[10px]"
                                >
                                    Exit Edit Mode
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                {/* Live Inventory List Column */}
                <section className="flex-1 flex flex-col min-w-0 bg-[#06080b]">
                    {/* List Search Header */}
                    <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#06080b]/50 backdrop-blur-md sticky top-0 z-10">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                            <input
                                type="text"
                                placeholder="Search code or name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/5 text-white pl-12 pr-6 py-3 rounded-full text-xs outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <div className="flex items-center space-x-4 pl-8">
                            <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total:</span>
                                <span className="text-xl font-black italic text-indigo-500">{products.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                        {filteredProducts.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4 animate-in fade-in zoom-in duration-500">
                                <AlertCircle size={64} className="opacity-10" />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em]">No items in current stream</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((p) => (
                                    <div
                                        key={p.id}
                                        className={`group relative bg-[#0d1117] border ${editingId === p.id ? 'border-indigo-500' : 'border-white/5'} p-6 rounded-sm transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-600/5`}
                                    >
                                        <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                            <button
                                                onClick={() => handleEdit(p)}
                                                className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-sm border border-white/5"
                                                title="Edit"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="p-2 bg-slate-800 text-slate-400 hover:text-red-500 rounded-sm border border-white/5"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                        <div className="flex items-start space-x-4">
                                            <div className="w-16 h-20 bg-slate-900 border border-white/5 rounded-sm overflow-hidden shrink-0">
                                                {p.cloudinaryId ? (
                                                    <img
                                                        src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_200,h_250,q_auto:best/v1/${p.cloudinaryId}`}
                                                        alt=""
                                                        className="w-full h-full object-cover transition-all duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-800">
                                                        <ImageIcon size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-mono text-indigo-500 font-bold uppercase tracking-widest">{p.code}</p>
                                                <h5 className="text-sm font-black text-white uppercase italic tracking-tighter truncate mt-1">{p.name}</h5>
                                                <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">{p.type}</p>
                                                <div className="mt-3 flex flex-wrap gap-1">
                                                    <span className="text-[8px] font-black px-1.5 py-0.5 bg-white/5 rounded-sm text-slate-400 border border-white/5 uppercase">{p.material?.split(' ')[0]}</span>
                                                    <span className="text-[8px] font-black px-1.5 py-0.5 bg-white/5 rounded-sm text-slate-400 border border-white/5 uppercase">{p.weight?.split(' ')[0]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <style hs-admin>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
        </div>
    );
};

export default AdminPortal;
