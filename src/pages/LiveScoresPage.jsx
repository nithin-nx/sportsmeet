import { motion, AnimatePresence } from 'framer-motion';
import { Activity, MapPin, Clock, Trophy, ChevronRight, AlertCircle } from 'lucide-react';
import { useMatches } from '../hooks/useMatches';
import LoadingSpinner from '../components/LoadingSpinner';

const MatchCard = ({ match }) => {
    const isLive = match.status === 'live';
    const isCompleted = match.status === 'completed';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-card overflow-hidden border-2 transition-all duration-500 ${isLive ? 'border-primary/40 shadow-[0_0_30px_rgba(0,114,255,0.1)]' : 'border-white/5'}`}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{match.events?.icon || '🎮'}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{match.events?.name || 'General Event'}</span>
                    </div>
                    {isLive ? (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Now</span>
                        </div>
                    ) : (
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isCompleted ? 'text-emerald-400' : 'text-white/20'}`}>
                            {isCompleted ? 'Finished' : 'Upcoming'}
                        </span>
                    )}
                </div>

                {/* Score Board */}
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div className="flex-1 text-center">
                        <h3 className="text-sm md:text-base font-black uppercase tracking-tight mb-2 truncate">{match.team_a}</h3>
                        <div className={`text-3xl md:text-5xl font-display font-black italic break-all ${isLive ? 'text-white' : 'text-white/40'}`}>
                            {match.score_a}
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 pt-4">
                        <div className="text-[10px] font-black text-white/10 uppercase tracking-widest">VS</div>
                        <div className="h-px w-8 bg-white/10"></div>
                    </div>

                    <div className="flex-1 text-center">
                        <h3 className="text-sm md:text-base font-black uppercase tracking-tight mb-2 truncate">{match.team_b}</h3>
                        <div className={`text-3xl md:text-5xl font-display font-black italic break-all ${isLive ? 'text-white' : 'text-white/40'}`}>
                            {match.score_b}
                        </div>
                    </div>
                </div>

                {/* Match Summary / Info */}
                {match.summary && (
                    <div className="bg-white/5 rounded-xl p-3 mb-6 flex items-center gap-3">
                        <Activity size={14} className={isLive ? "text-primary animate-pulse" : "text-white/20"} />
                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-wide text-white/60">{match.summary}</p>
                    </div>
                )}

                {/* Footer Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/30">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            {match.venue || 'GECI Stadium'}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {new Date(match.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                    {isCompleted && (
                        <Trophy size={14} className="text-accent-gold" />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const LiveScoresPage = () => {
    const { liveMatches, upcomingMatches, completedMatches, loading } = useMatches();

    if (loading) return <LoadingSpinner size="lg" />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative mt-10"
        >
            <div className="text-center mb-16 md:mb-24 relative">
                <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-primary/20 text-primary mb-8 border border-primary/20 shadow-[0_0_50px_rgba(0,114,255,0.15)]">
                    <Activity className="w-12 h-12" />
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic">
                    LIVE <span className="text-primary">SCORES</span>
                </h1>
                <p className="text-white/40 uppercase tracking-[0.5em] text-xs font-black">
                    Real-time updates from GECI Sports Arena
                </p>
            </div>

            <div className="space-y-24">
                {/* Live Section */}
                {liveMatches.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px flex-grow bg-gradient-to-r from-transparent to-primary/30"></div>
                            <h2 className="text-2xl font-black uppercase italic tracking-widest text-primary px-4">Live Matches</h2>
                            <div className="h-px flex-grow bg-gradient-to-l from-transparent to-primary/30"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {liveMatches.map(match => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Upcoming Fixtures */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px flex-grow bg-white/5"></div>
                        <h2 className="text-xl font-black uppercase tracking-[0.3em] text-white/20 px-4">Upcoming Fixtures</h2>
                        <div className="h-px flex-grow bg-white/5"></div>
                    </div>
                    {upcomingMatches.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {upcomingMatches.map(match => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    ) : !liveMatches.length && (
                        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                            <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-4" />
                            <p className="text-white/20 font-black uppercase tracking-widest text-xs">No matches live or upcoming right now</p>
                        </div>
                    )}
                </section>

                {/* Recently Finished */}
                {completedMatches.length > 0 && (
                    <section className="opacity-60">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px flex-grow bg-white/5"></div>
                            <h2 className="text-xl font-black uppercase tracking-[0.3em] text-white/20 px-4 text-center">Recently Finished</h2>
                            <div className="h-px flex-grow bg-white/5"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {completedMatches.map(match => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.02]">
                <Activity className="absolute top-1/4 left-10 w-96 h-96 -rotate-12" />
                <Trophy className="absolute bottom-1/4 right-10 w-96 h-96 rotate-12" />
            </div>
        </motion.div>
    );
};

export default LiveScoresPage;
