import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Trophy, Activity, Users, Shirt } from 'lucide-react';
import { useMatchCenter } from '../hooks/useMatchCenter';
import LoadingSpinner from '../components/LoadingSpinner';

const OverBalls = ({ balls }) => {
    return (
        <div className="flex gap-2 flex-wrap">
            {balls.map((ball, idx) => {
                const isWicket = ball?.toLowerCase() === 'w';
                const isBoundary = ball === '4' || ball === '6';
                return (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        key={idx}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black border-2 transition-transform hover:scale-110 cursor-default
                            ${isWicket ? 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' :
                                isBoundary ? 'bg-secondary/20 border-secondary text-secondary shadow-[0_0_15px_rgba(255,165,2,0.3)]' :
                                    'bg-white/5 border-white/10 text-white/60'}`}
                    >
                        {ball}
                    </motion.span>
                );
            })}
        </div>
    );
};

const CricketMatchCenter = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { match, details: overs, innings, loading } = useMatchCenter(id, 'cricket');

    if (loading) return <LoadingSpinner size="lg" />;
    if (!match) return <div className="text-center py-24">Match not found</div>;

    // Always show the most recent innings in the main scoreboard
    const currentInnings = innings && innings.length > 0
        ? [...innings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
        : null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/live')}
                    className="flex items-center gap-2 text-white/40 hover:text-secondary transition-colors mb-8 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest" >Back to Live</span>
                </button>

                {/* Main Scoreboard */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card mb-8 p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent border-2 border-white/5"
                >
                    <div className="absolute top-0 right-0 p-4">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                            </span>
                            Match In Progress
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-4">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border-2 border-white/10 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
                                    {match.team1?.logo_url ? (
                                        <img src={match.team1.logo_url} className="w-full h-full object-contain" />
                                    ) : (
                                        <Shirt size={32} style={{ color: match.team1?.jersey_color || '#ffffff' }} className="opacity-60" />
                                    )}
                                </div>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border-2 border-white/10 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
                                    {match.team2?.logo_url ? (
                                        <img src={match.team2.logo_url} className="w-full h-full object-contain" />
                                    ) : (
                                        <Shirt size={32} style={{ color: match.team2?.jersey_color || '#ffffff' }} className="opacity-60" />
                                    )}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter">{match.team1?.short_name || match.team1?.name} vs {match.team2?.short_name || match.team2?.name}</h2>
                                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{match.team1?.name} vs {match.team2?.name} • {match.venue || 'Sports Meet Stadium'}</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-white/5">
                            <div>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-5xl md:text-7xl font-display font-black text-secondary">{currentInnings?.runs || 0}/{currentInnings?.wickets || 0}</span>
                                    <span className="text-xl md:text-2xl font-black text-white/20 uppercase tracking-widest italic">{currentInnings?.overs || 0} Overs</span>
                                </div>

                                {match.summary && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="mb-4 px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/20 inline-block"
                                    >
                                        <p className="text-[10px] font-black uppercase tracking-widest text-secondary">{match.summary}</p>
                                    </motion.div>
                                )}

                                <div className="flex flex-wrap gap-4 items-center">
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">CRR: <span className="text-white">{currentInnings?.run_rate || 0}</span></p>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Target: <span className="text-white">
                                        {innings.length > 1
                                            ? ([...innings].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))[0].runs + 1)
                                            : '---'}
                                    </span></p>

                                    {overs.filter(o => o.batting_team_id === currentInnings?.batting_team_id).length > 0 && (
                                        <>
                                            <div className="h-4 w-px bg-white/10 hidden md:block" />
                                            {(() => {
                                                const lastOver = overs.filter(o => o.batting_team_id === currentInnings?.batting_team_id)[0];
                                                return (
                                                    <motion.div
                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary/20 border border-secondary/30"
                                                    >
                                                        <span className="text-[9px] font-black text-secondary uppercase tracking-widest">Last Over</span>
                                                        <span className="text-[11px] font-black text-white">{lastOver.runs} Runs</span>
                                                        {(lastOver.ball1?.toLowerCase() === 'w' ||
                                                            lastOver.ball2?.toLowerCase() === 'w' ||
                                                            lastOver.ball3?.toLowerCase() === 'w' ||
                                                            lastOver.ball4?.toLowerCase() === 'w' ||
                                                            lastOver.ball5?.toLowerCase() === 'w' ||
                                                            lastOver.ball6?.toLowerCase() === 'w') && (
                                                                <span className="text-[9px] font-black text-red-500 uppercase ml-1">Wicket!</span>
                                                            )}
                                                    </motion.div>
                                                );
                                            })()}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="h-4 w-px bg-white/10 hidden md:block" />
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Extras: <span className="text-secondary">{currentInnings?.extras || 0}</span> <span className="text-white/20 font-medium">(W:{currentInnings?.wides || 0}, NB:{currentInnings?.no_balls || 0})</span></p>
                        </div>
                    </div>
                </motion.div>

                {/* Live Battle Section (Strikers) */}
                {
                    match.status === 'live' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                        >
                            {/* Striker */}
                            <div className="glass-card p-5 border border-secondary/20 bg-secondary/5 flex items-center justify-between group hover:border-secondary/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/30">
                                        <Activity size={18} className="text-secondary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="text-[8px] font-black text-secondary/60 uppercase tracking-widest">Inning Snapshot</p>
                                            <div className="w-1 h-1 rounded-full bg-secondary/40" />
                                            <p className="text-[8px] font-black text-secondary uppercase tracking-widest italic">Striker</p>
                                        </div>
                                        <h4 className="text-sm font-black uppercase text-white group-hover:text-secondary transition-colors">{match.striker_name || 'Waiting...'}</h4>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-display font-black text-white">{match.striker_runs || 0}</span>
                                    <span className="text-[10px] font-black text-white/20 ml-1">({match.striker_balls || 0})</span>
                                </div>
                            </div>

                            {/* Bowler */}
                            <div className="glass-card p-5 border border-primary/20 bg-primary/5 flex items-center justify-between group hover:border-primary/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                                        <Zap size={18} className="text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="text-[8px] font-black text-primary/60 uppercase tracking-widest">Inning Snapshot</p>
                                            <div className="w-1 h-1 rounded-full bg-primary/40" />
                                            <p className="text-[8px] font-black text-primary uppercase tracking-widest italic">Bowler</p>
                                        </div>
                                        <h4 className="text-sm font-black uppercase text-white group-hover:text-primary transition-colors">{match.bowler_name || 'Waiting...'}</h4>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-display font-black text-white">{match.bowler_wickets || 0}/{match.bowler_runs || 0}</span>
                                    <span className="text-[10px] font-black text-white/20 ml-1">({match.bowler_overs || '0.0'})</span>
                                </div>
                            </div>
                        </motion.div>
                    )
                }

                {/* Details Sections Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Boundary Breakdown */}
                        <section className="glass-card p-6 border border-white/5 bg-white/[0.01]">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <Trophy className="text-secondary" size={20} />
                                <h3 className="text-lg font-black uppercase tracking-widest italic">Innings Stats</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-[8px] font-black text-white/20 uppercase mb-1">Fours</p>
                                    <p className="text-2xl font-display font-black text-secondary">{currentInnings?.fours || 0}</p>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-[8px] font-black text-white/20 uppercase mb-1">Sixes</p>
                                    <p className="text-2xl font-display font-black text-secondary">{currentInnings?.sixes || 0}</p>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-[8px] font-black text-white/20 uppercase mb-1">Singles</p>
                                    <p className="text-2xl font-display font-black text-white">{currentInnings?.singles || 0}</p>
                                </div>
                            </div>
                        </section>

                        {/* Innings Summary */}
                        <section className="glass-card p-6 border border-white/5">
                            <div className="flex items-center justify-between gap-3 mb-8 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <Users className="text-white/60" size={20} />
                                    <h3 className="text-lg font-black uppercase tracking-widest italic">Innings Comparison</h3>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {innings.map((inn, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-white/20 uppercase">Inn {idx + 1}</span>
                                            <span className="text-sm font-black uppercase tracking-tight">
                                                {inn.batting_team_id === match.team1_id ? match.team1?.short_name : match.team2?.short_name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-lg font-display font-black text-secondary">{inn.runs}/{inn.wickets}</span>
                                            <span className="text-[10px] font-black text-white/40">({inn.overs} OV)</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Dual Over History Cards */}
                        <div className="grid grid-cols-1 gap-6">
                            {innings && [...innings].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((inn, idx) => {
                                const team = inn.batting_team_id === match.team1_id ? match.team1 : match.team2;
                                const teamOvers = overs.filter(o => o.batting_team_id === inn.batting_team_id);

                                return (
                                    <section key={inn.id} className="glass-card p-6 border border-white/5 relative overflow-hidden group">
                                        {/* Background Accent */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors" />

                                        <div className="flex items-center justify-between gap-3 mb-8 border-b border-white/5 pb-4 relative z-10">
                                            <div className="flex items-center gap-3">
                                                <Activity className="text-secondary" size={20} />
                                                <h3 className="text-lg font-black uppercase tracking-widest italic">
                                                    Innings {idx + 1}: <span className="text-white ml-2">{team?.short_name} Over History</span>
                                                </h3>
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                                                    Total: <span className="text-secondary">{inn.runs}/{inn.wickets}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar scroll-smooth relative z-10">
                                            {teamOvers.length > 0 ? teamOvers.map((over) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    key={over.id}
                                                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-secondary/20 transition-all font-sans"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center shadow-xl group-hover:border-secondary/40 transition-colors">
                                                            <span className="text-[8px] font-black text-white/40 uppercase leading-none mb-0.5 tracking-tighter">OV</span>
                                                            <span className="text-sm font-black text-white italic leading-none">{over.over_number}</span>
                                                        </div>
                                                        <OverBalls balls={[over.ball1, over.ball2, over.ball3, over.ball4, over.ball5, over.ball6]} />
                                                    </div>
                                                    <div className="flex items-center gap-2 pl-4 md:pl-0 border-l-4 border-secondary/20 md:border-l-0">
                                                        <span className="text-2xl font-display font-black italic">{over.runs}</span>
                                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Runs</span>
                                                    </div>
                                                </motion.div>
                                            )) : (
                                                <div className="text-center py-12 opacity-30 italic">No overs recorded yet</div>
                                            )}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <section className="glass-card p-6 border border-white/5 h-fit">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                                <Trophy className="text-accent-gold" size={18} />
                                <h3 className="text-sm font-black uppercase tracking-widest italic">Match Info</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="text-white/40">
                                    <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-1">Status</p>
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest italic">{match.status || 'Past'}</p>
                                </div>
                                <div className="text-white/40">
                                    <p className="text-[8px] font-black uppercase tracking-[0.2em] mb-1">Official Scorer</p>
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest italic">Live Feed Active</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CricketMatchCenter;
