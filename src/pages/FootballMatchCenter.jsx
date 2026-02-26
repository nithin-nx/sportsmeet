import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Goal, Clock, MapPin, Activity, Shirt } from 'lucide-react';
import { useMatchCenter } from '../hooks/useMatchCenter';
import LoadingSpinner from '../components/LoadingSpinner';

const FootballMatchCenter = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { match, details: goals, loading } = useMatchCenter(id, 'football');

    if (loading) return <LoadingSpinner size="lg" />;
    if (!match) return <div className="text-center py-24">Match not found</div>;

    const team1Goals = goals.filter(g => g.team_id === match.team1_id);
    const team2Goals = goals.filter(g => g.team_id === match.team2_id);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/live')}
                    className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Back to Live</span>
                </button>

                {/* Scoreboard */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card mb-8 p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent border-2 border-white/5"
                >
                    <div className="absolute top-0 right-0 p-4">
                        {match.status === 'live' && (
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                Live
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Team 1 */}
                        <div className="flex-1 flex flex-col items-center gap-4 text-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 flex items-center justify-center border-2 border-white/10 p-4 shadow-2xl overflow-hidden">
                                {match.team1?.logo_url ? (
                                    <img src={match.team1.logo_url} className="w-full h-full object-contain" />
                                ) : (
                                    <Shirt
                                        size={64}
                                        style={{ color: match.team1?.jersey_color || '#ffffff' }}
                                        className="drop-shadow-[0_0_15px_currentColor] opacity-60"
                                    />
                                )}
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-wider italic">{match.team1?.short_name || match.team1?.name}</h2>
                            <p className="text-[10px] text-white/40 uppercase font-black">{match.team1?.name}</p>
                        </div>

                        {/* Score */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-8">
                                <span className="text-6xl md:text-8xl font-display font-black text-white italic">{team1Goals.length}</span>
                                <span className="text-2xl md:text-4xl font-black text-white/10">-</span>
                                <span className="text-6xl md:text-8xl font-display font-black text-white italic">{team2Goals.length}</span>
                            </div>

                            {match.penalty_score && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="px-6 py-2 rounded-2xl bg-red-500/10 border-2 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] text-center"
                                >
                                    <p className="text-xs font-black uppercase tracking-[0.4em] text-red-500">Penalties: {match.penalty_score}</p>
                                </motion.div>
                            )}

                            {match.summary && !match.penalty_score && (
                                <div className="px-6 py-2 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">{match.summary}</p>
                                </div>
                            )}

                            <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{match.status}</span>
                            </div>
                        </div>

                        {/* Team 2 */}
                        <div className="flex-1 flex flex-col items-center gap-4 text-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 flex items-center justify-center border-2 border-white/10 p-4 shadow-2xl overflow-hidden">
                                {match.team2?.logo_url ? (
                                    <img src={match.team2.logo_url} className="w-full h-full object-contain" />
                                ) : (
                                    <Shirt
                                        size={64}
                                        style={{ color: match.team2?.jersey_color || '#ffffff' }}
                                        className="drop-shadow-[0_0_15px_currentColor] opacity-60"
                                    />
                                )}
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-wider italic">{match.team2?.short_name || match.team2?.name}</h2>
                            <p className="text-[10px] text-white/40 uppercase font-black">{match.team2?.name}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Timeline Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <section className="glass-card p-6 border border-white/5">
                            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                                <Goal className="text-primary" size={20} />
                                <h3 className="text-lg font-black uppercase tracking-widest italic">Live Events</h3>
                            </div>

                            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                                {goals.length > 0 ? goals.map((goal, idx) => {
                                    const team = goal.team_id === match.team1_id ? match.team1 : match.team2;
                                    const teamColor = team?.jersey_color || '#ffffff';
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            key={goal.id}
                                            className="flex items-start gap-6 pl-10 relative"
                                        >
                                            <div
                                                className="absolute left-1.5 top-2 w-3 h-3 rounded-full border-4 border-[#0a0a0a] z-10"
                                                style={{ backgroundColor: teamColor }}
                                            ></div>
                                            <div
                                                className="flex-grow bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between group transition-all"
                                                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${teamColor}44`}
                                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span
                                                        className="text-xs font-black px-2 py-1 rounded italic"
                                                        style={{
                                                            backgroundColor: `${teamColor}22`,
                                                            color: teamColor
                                                        }}
                                                    >
                                                        {goal.minute}'
                                                    </span>
                                                    <span className="text-sm font-black uppercase tracking-tight text-white/90">{goal.player_name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: teamColor }}></div>
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest whitespace-nowrap">
                                                        {team?.short_name}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                }) : (
                                    <div className="text-center py-12 opacity-30 italic">No events recorded yet</div>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="glass-card p-6 border border-white/5 h-fit">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <Activity className="text-accent-gold" size={18} />
                                <h3 className="text-sm font-black uppercase tracking-widest italic">Match Info</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-white/40">
                                    <MapPin size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{match.venue || 'Sports Meet Arena'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/40">
                                    <Clock size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        {new Date(match.match_date).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FootballMatchCenter;
