import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Clock, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import RulesModal from './RulesModal';

const EventCard = ({ event }) => {
    const [showRules, setShowRules] = useState(false);
    const isCompleted = event.status === 'completed';
    const hasDetails = !!event.date;

    // Normalizing name for image mapping (lowercase, no spaces)
    const normalizedName = event.name.toLowerCase().replace(/\s+/g, '');

    // Sports themed background images based on category/name
    const bgImages = {
        athletics: "https://images.unsplash.com/photo-1596720426673-e4774457fd0a?q=80&w=800&auto=format&fit=crop",
        games: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
        football: "/football.jpg",
        cricket: "/cricket.jpg",
        chess: "/chess.jpeg",
        carrom: "/carrom.jpeg",

        // Dynamic mapped events (Expects [name].jpg in public folder)
        handball: "/handball.jpeg",
        throwball: "/throwball.png",
        volleyball: "/volleyball.jpg",
        "basketball(w)": "/basketball.jpeg",
        "basketball(m)": "/basketball.jpg",
        "tabletennissingles(m)": "/tabletennis1.jpg",
        "tabletennisdoubles(m)": "/tabletennis1.jpg",
        "tabletennissingles(w)": "/tabletennis1.jpg",
        "tabletennisdoubles(w)": "/tabletennis1.jpg",
        tabletennis: "/tabletennis1.jpg",
        badminton: "/badminton.png",
        "100m": "/100m.jpg",
        "200m": "/200m.jpg",
        "400m": "/400m.jpg",
        "800m": "/800m.jpg",
        "1500m": "/1500m.png",
        "3000m": "/3000m.jpg",
        shotput: "/shotput.jpg",
        javelinthrow: "/throw.jpg",
        longjump: "/jump.jpg"
    };

    const bgUrl = bgImages[normalizedName] ||
        bgImages[Object.keys(bgImages).find(key => normalizedName.includes(key) && key.length > 3)] ||
        bgImages[event.category] ||
        bgImages.athletics;

    const formatDate = (dateString) => {
        if (!dateString) return "Coming Soon";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10 }}
                className="glass-card group relative overflow-hidden min-h-[280px] sm:h-[320px]"
            >
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={bgUrl}
                        alt={event.name}
                        className="w-full h-full object-cover opacity-20 grayscale transition-all duration-700 group-hover:opacity-40 group-hover:grayscale-0 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent"></div>
                </div>

                <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        >
                            {event.icon || '🏆'}
                        </motion.div>
                        <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : hasDetails
                                ? 'bg-primary/20 text-primary border-primary/30 animate-pulse'
                                : 'bg-white/10 text-white/40 border-white/10'
                            }`}>
                            {isCompleted ? 'Completed' : hasDetails ? 'Confirmed' : 'Coming Soon'}
                        </div>
                    </div>

                    <div className="flex-grow">
                        <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight uppercase italic">{event.name}</h3>
                        <div className="space-y-2.5 text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className={hasDetails ? "text-primary" : "text-white/20"} />
                                <span className={hasDetails ? "text-white/80" : "text-white/30 italic"}>
                                    {formatDate(event.date)}
                                </span>
                            </div>

                            {hasDetails && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-accent-gold" />
                                        <span className="text-white/80">{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-accent-crimson" />
                                        <span className="truncate text-white/80">{event.venue}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Status Indicator / Final Standings / Rules Buttons */}
                    <div className="mt-auto space-y-3">
                        {isCompleted ? (
                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    to={`/event/${event.id}`}
                                    className="flex items-center justify-between bg-white/5 p-2 rounded-xl border border-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group/btn h-11"
                                >
                                    <span className="text-[8px] font-black uppercase tracking-tight text-emerald-400 truncate pr-1">
                                        Standings
                                    </span>
                                    <ChevronRight size={14} className="text-emerald-400 group-hover/btn:translate-x-0.5 transition-transform" />
                                </Link>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowRules(true);
                                    }}
                                    className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-primary/20 hover:border-primary/40 text-white/50 hover:text-primary transition-all duration-500 group/rules h-11"
                                >
                                    <Info size={12} className="text-primary" />
                                    <span className="text-[8px] font-black uppercase tracking-tight">Rules</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mt-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                animate={hasDetails ? { x: ['-100%', '100%'] } : {}}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                className={`h-full w-1/2 ${hasDetails ? 'bg-gradient-to-r from-transparent via-primary/50 to-transparent' : 'bg-white/5'}`}
                                            />
                                        </div>
                                        <span className="text-[8px] font-black uppercase text-white/20">
                                            {hasDetails ? 'Awaiting Start' : 'Date TBD'}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowRules(true);
                                    }}
                                    className="flex items-center justify-center gap-3 py-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-primary/20 hover:border-primary/40 text-white/50 hover:text-primary transition-all duration-500 group/rules shadow-lg w-full"
                                >
                                    <div className="p-1 rounded-lg bg-primary/10 group-hover/rules:bg-primary/20 transition-colors">
                                        <Info size={14} className="text-primary group-hover/rules:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em]">View Event Rules</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 h-1.5 transition-all duration-700 group-hover:w-full ${isCompleted ? 'bg-emerald-500 w-3' : hasDetails ? 'bg-primary w-3' : 'bg-white/10 w-2'
                    }`} />
            </motion.div>

            <RulesModal
                isOpen={showRules}
                onClose={() => setShowRules(false)}
                eventName={event.name}
                rules={event.rules}
            />
        </>
    );
};

export default EventCard;
