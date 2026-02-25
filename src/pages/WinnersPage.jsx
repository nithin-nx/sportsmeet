import { motion } from 'framer-motion';
import { Heart, Stars, Trophy, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { winnersPosters } from '../lib/winnersPosters';

const WinnerPosterCard = ({ poster }) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        // Initialize likes from localStorage or registry
        const storedLikes = localStorage.getItem(`likes_poster_${poster.id}`);
        const userHasLiked = localStorage.getItem(`has_liked_poster_${poster.id}`);

        if (storedLikes) {
            setLikes(parseInt(storedLikes));
        } else {
            // Initial mock likes
            const randomLikes = Math.floor(Math.random() * 50) + 10;
            setLikes(randomLikes);
            localStorage.setItem(`likes_poster_${poster.id}`, randomLikes.toString());
        }

        if (userHasLiked === 'true') {
            setIsLiked(true);
        }
    }, [poster.id]);

    const handleLike = () => {
        if (!isLiked) {
            const newCount = likes + 1;
            setLikes(newCount);
            setIsLiked(true);
            localStorage.setItem(`likes_poster_${poster.id}`, newCount.toString());
            localStorage.setItem(`has_liked_poster_${poster.id}`, 'true');
        } else {
            const newCount = likes - 1;
            setLikes(newCount);
            setIsLiked(false);
            localStorage.setItem(`likes_poster_${poster.id}`, newCount.toString());
            localStorage.removeItem(`has_liked_poster_${poster.id}`);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative"
        >
            <div className="glass-card overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,114,255,0.1)]">
                {/* Poster Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                    <img
                        src={poster.image}
                        alt={poster.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-60"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 rounded bg-dark-bg/80 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-primary">
                            {poster.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tight mb-1">{poster.title}</h3>
                            {poster.winnerName && (
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{poster.winnerName}</p>
                            )}
                        </div>
                        <button
                            onClick={handleLike}
                            className={`flex flex-col items-center gap-1 transition-colors ${isLiked ? 'text-accent-crimson' : 'text-white/20 hover:text-white/40'}`}
                        >
                            <Heart size={20} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "animate-bounce" : ""} />
                            <span className="text-[10px] font-black">{likes}</span>
                        </button>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
                            {new Date(poster.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <div className="flex gap-1">
                            <Stars size={10} className="text-accent-gold" />
                            <Stars size={10} className="text-accent-gold/40" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const WinnersPage = () => {
    const [search, setSearch] = useState('');
    const filteredPosters = winnersPosters.filter(p =>
        (p.title && p.title.toLowerCase().includes(search.toLowerCase())) ||
        (p.winnerName && p.winnerName.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative mt-10"
        >
            <div className="text-center mb-16 md:mb-24 relative">
                <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-accent-gold/20 text-accent-gold mb-8 border border-accent-gold/20 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                    <Trophy className="w-12 h-12" />
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic">
                    WINNERS <span className="text-accent-gold">GALLERY</span>
                </h1>
                <p className="text-white/40 uppercase tracking-[0.5em] text-xs font-black mb-12">
                    Celebrating the legends of GECI Sports Meet 2026
                </p>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="SEARCH CHAMPIONS..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {filteredPosters.length > 0 ? (
                    filteredPosters.map((poster) => (
                        <WinnerPosterCard key={poster.id} poster={poster} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-white/20 italic font-black uppercase tracking-[0.3em]">No legends found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03]">
                <Stars className="absolute top-1/4 right-10 w-64 h-64 rotate-12" />
                <Trophy className="absolute bottom-1/4 left-10 w-64 h-64 -rotate-12" />
            </div>
        </motion.div>
    );
};

export default WinnersPage;
