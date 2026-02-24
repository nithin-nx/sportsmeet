import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Calendar, MapPin, Medal, Clock, ShieldAlert } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useResults } from '../hooks/useResults';

const EventDetailsPage = () => {
    const { id } = useParams();
    const { event, results, loading } = useResults(id);

    if (loading) return <LoadingSpinner size="lg" />;
    if (!event) return <div className="text-center py-20 text-white/40 font-black uppercase tracking-widest">Event not found</div>;

    const isCompleted = event.status === 'completed';
    const hasResults = results && results.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-5xl mx-auto px-4 py-12 md:py-20"
        >
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-primary mb-12 transition-all group font-black uppercase text-xs tracking-widest">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>

            <div className="glass-card overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-8 md:p-12 border-b border-white/5 relative">
                    <div className="absolute top-12 right-12 text-[120px] opacity-[0.03] grayscale pointer-events-none select-none italic font-black">
                        {event.icon}
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 text-primary mb-6">
                            <span className="text-4xl filter drop-shadow-[0_4px_10px_rgba(0,114,255,0.4)]">{event.icon}</span>
                            <div className="h-px w-12 bg-primary/30"></div>
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                                {isCompleted ? 'Event Completed' : 'Event Details'}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase italic">
                            {event.name}
                        </h1>

                        <div className="flex flex-wrap gap-8 text-white/60 font-bold uppercase text-[10px] md:text-xs tracking-widest">
                            <div className="flex items-center gap-3">
                                <Calendar size={18} className="text-primary" />
                                <span>{event.date || 'Date TBD'}</span>
                            </div>
                            {event.time && (
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-accent-gold" />
                                    <span>{event.time}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-accent-crimson" />
                                <span>{event.venue || 'Venue TBD'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12">
                    {isCompleted ? (
                        hasResults ? (
                            <div>
                                <h2 className="text-2xl font-black mb-8 flex items-center gap-3 italic uppercase tracking-tight">
                                    <Trophy size={24} className="text-accent-gold" />
                                    Winners Circle
                                </h2>

                                <div className="overflow-x-auto -mx-8 md:mx-0">
                                    <table className="w-full text-left min-w-[500px]">
                                        <thead>
                                            <tr className="border-b border-white/5 text-white/30 text-[10px] uppercase tracking-[0.3em] font-black">
                                                <th className="py-6 px-8 w-24 text-center">Rank</th>
                                                <th className="py-6 px-8">Participant</th>
                                                <th className="py-6 px-8">Department</th>
                                                <th className="py-6 px-8 text-right">Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.map((res) => (
                                                <tr
                                                    key={res.id}
                                                    className={`border-b border-white/5 transition-all hover:bg-white/[0.02] ${res.position === 1 ? 'bg-accent-gold/5' : ''}`}
                                                >
                                                    <td className="py-8 px-8">
                                                        <div className="flex justify-center">
                                                            {res.position === 1 ? (
                                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-gold to-yellow-600 text-dark-bg flex items-center justify-center font-black shadow-[0_0_20px_rgba(255,215,0,0.3)] italic border-2 border-white/20">
                                                                    1ST
                                                                </div>
                                                            ) : res.position === 2 ? (
                                                                <div className="w-11 h-11 rounded-full bg-slate-400 text-dark-bg flex items-center justify-center font-black italic">
                                                                    2ND
                                                                </div>
                                                            ) : res.position === 3 ? (
                                                                <div className="w-10 h-10 rounded-full bg-amber-700 text-dark-bg flex items-center justify-center font-black italic">
                                                                    3RD
                                                                </div>
                                                            ) : (
                                                                <span className="text-white/40 font-black italic">{res.position}TH</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-8 px-8">
                                                        <span className="text-xl font-black uppercase tracking-tight italic block">{res.player_name}</span>
                                                    </td>
                                                    <td className="py-8 px-8">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2.5 h-2.5 rounded-full ring-4 ring-white/5" style={{ backgroundColor: res.departments?.color }}></div>
                                                            <span className="text-white/70 font-bold uppercase text-xs tracking-widest">{res.departments?.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-8 px-8 text-right">
                                                        <motion.span
                                                            whileHover={{ scale: 1.1 }}
                                                            className={`font-display font-black text-3xl italic ${res.position === 1 ? 'text-accent-gold' : 'text-primary'}`}
                                                        >
                                                            +{res.points}
                                                        </motion.span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                                <ShieldAlert size={48} className="text-primary/40 mx-auto mb-6" />
                                <h2 className="text-2xl font-black uppercase italic tracking-tight mb-2">Results Pending</h2>
                                <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">The winners circle will be updated shortly after the official announcement.</p>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                            <Clock size={48} className="text-accent-gold/40 mx-auto mb-6" />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight mb-2">Match Not Started</h2>
                            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">Stay tuned! Results will be posted here as soon as the event concludes.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default EventDetailsPage;
