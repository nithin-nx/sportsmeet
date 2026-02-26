import { motion } from 'framer-motion';
import { useLiveFeed } from '../hooks/useLiveFeed';
import { Activity, Trophy, Clock, MapPin, ChevronRight, Shirt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const LiveBadge = () => (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Live</span>
    </div>
);

const MatchCard = ({ match, score, sport }) => {
    const navigate = useNavigate();
    const isLive = match.status === 'live';

    const handleClick = () => {
        if (sport === 'football') navigate(`/football-match/${match.id}`);
        else navigate(`/cricket-match/${match.id}`);
    };

    const SportIndicator = () => (
        <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border shadow-xl ${sport === 'football' ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-secondary/20 border-secondary/40 text-secondary'}`}>
            {sport}
        </div>
    );

    if (sport === 'football') {
        const team1Short = match.team1?.short_name || match.team1?.name;
        const team2Short = match.team2?.short_name || match.team2?.name;

        return (
            <motion.div
                whileHover={{ y: -10 }}
                onClick={handleClick}
                className={`glass-card p-6 flex flex-col cursor-pointer border-2 transition-all relative min-h-[280px] sm:h-[320px] w-full justify-between group overflow-hidden ${isLive ? 'border-primary/40 bg-primary/5 shadow-2xl' : 'border-white/5 bg-[#1a1a1a] hover:border-white/20'}`}
            >
                {/* Header Section */}
                <div className="flex justify-between items-center mb-4">
                    <SportIndicator />
                    {isLive ? <LiveBadge /> : <span className="text-[9px] font-black uppercase tracking-[0.1em] text-white/30 px-3 py-1 rounded-lg bg-white/5 border border-white/10 uppercase tracking-[0.2em]">{match.status}</span>}
                </div>

                {/* Main Content Area */}
                <div className="flex items-center justify-between gap-4 py-4 w-full flex-grow">
                    {/* Team 1 */}
                    <div className="flex-[2] flex flex-col items-center gap-3 min-w-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10 overflow-hidden p-3 group-hover:scale-110 transition-transform shadow-xl">
                            {match.team1?.logo_url ? <img src={match.team1.logo_url} className="w-full h-full object-contain" /> : <Shirt size={32} style={{ color: match.team1?.jersey_color || '#ffffff' }} className="opacity-80" />}
                        </div>
                        <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-white text-center truncate w-full">{team1Short}</h3>
                    </div>

                    {/* Score Center */}
                    <div className="flex-[2] flex flex-col items-center justify-center">
                        <div className="flex items-center gap-3">
                            <span className={`text-4xl md:text-5xl font-display font-black italic tracking-tighter transition-all ${isLive ? 'text-white' : 'text-white/40'}`}>{score.team1}</span>
                            <span className="text-white/10 font-black text-xl">-</span>
                            <span className={`text-4xl md:text-5xl font-display font-black italic tracking-tighter transition-all ${isLive ? 'text-white' : 'text-white/40'}`}>{score.team2}</span>
                        </div>

                        {(match.penalty_score || match.summary) && (
                            <div className="mt-3 px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                                <p className="text-[9px] font-black uppercase tracking-widest text-red-500">
                                    {match.penalty_score ? `PEN: ${match.penalty_score}` : match.summary}
                                </p>
                            </div>
                        )}

                        <div className="mt-4 flex items-center gap-1.5 text-white/20 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <MapPin size={10} className="text-primary" />
                            <span className="text-[8px] font-black uppercase tracking-widest truncate">{match.venue || 'Arena'}</span>
                        </div>
                    </div>

                    {/* Team 2 */}
                    <div className="flex-[2] flex flex-col items-center gap-3 min-w-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10 overflow-hidden p-3 group-hover:scale-110 transition-transform shadow-xl">
                            {match.team2?.logo_url ? <img src={match.team2.logo_url} className="w-full h-full object-contain" /> : <Shirt size={32} style={{ color: match.team2?.jersey_color || '#ffffff' }} className="opacity-80" />}
                        </div>
                        <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-white text-center truncate w-full">{team2Short}</h3>
                    </div>
                </div>

                {/* Footer Call to Action */}
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-center items-center">
                    <div className="flex items-center gap-2 text-white/20 group-hover:text-primary transition-all">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] italic">VIEW HUB</span>
                        <ChevronRight size={14} />
                    </div>
                </div>
            </motion.div>
        );
    }

    // Cricket Card
    // Always show the most recent innings in the main feed
    const currentInnings = score && score.length > 0
        ? [...score].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
        : null;
    const team1Short = match.team1?.short_name || match.team1?.name;
    const team2Short = match.team2?.short_name || match.team2?.name;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            onClick={handleClick}
            className={`glass-card p-6 flex flex-col cursor-pointer border-2 transition-all relative min-h-[280px] sm:h-[320px] w-full justify-between group overflow-hidden ${isLive ? 'border-secondary/40 bg-secondary/5 shadow-2xl' : 'border-white/5 bg-[#1a1a1a] hover:border-white/20'}`}
        >
            <div className="flex justify-between items-center mb-4">
                <SportIndicator />
                {isLive ? <LiveBadge /> : <span className="text-[9px] font-black uppercase tracking-[0.1em] text-white/30 px-3 py-1 rounded-lg bg-white/5 border border-white/10 uppercase tracking-[0.2em]">{match.status}</span>}
            </div>

            <div className="flex flex-col gap-6 py-4 flex-grow justify-center">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="flex -space-x-4 flex-shrink-0">
                            <div className="w-14 h-14 rounded-full bg-white/5 border-2 border-[#1a1a1a] p-3 flex items-center justify-center overflow-hidden z-20 shadow-xl group-hover:scale-105 transition-transform">
                                {match.team1?.logo_url ? <img src={match.team1.logo_url} className="w-full h-full object-contain" /> : <Shirt size={24} style={{ color: match.team1?.jersey_color || '#ffffff' }} className="opacity-80" />}
                            </div>
                            <div className="w-14 h-14 rounded-full bg-white/5 border-2 border-[#1a1a1a] p-3 flex items-center justify-center overflow-hidden z-10 shadow-xl group-hover:scale-105 transition-transform">
                                {match.team2?.logo_url ? <img src={match.team2.logo_url} className="w-full h-full object-contain" /> : <Shirt size={24} style={{ color: match.team2?.jersey_color || '#ffffff' }} className="opacity-80" />}
                            </div>
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-base md:text-lg font-black uppercase tracking-widest text-white truncate italic">{team1Short} vs {team2Short}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <p className="text-[8px] text-white/30 uppercase font-black tracking-widest flex items-center gap-1.5">
                                    <MapPin size={10} className="text-secondary" /> {match.venue || 'Arena'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="flex items-baseline justify-end gap-2">
                            <span className={`text-3xl md:text-4xl font-display font-black tracking-tighter transition-all ${isLive ? 'text-secondary scale-105' : 'text-white/40'}`}>
                                {currentInnings?.runs || 0}/{currentInnings?.wickets || 0}
                            </span>
                        </div>

                        {match.summary && (
                            <div className="mt-1 px-3 py-1 rounded-lg bg-secondary/10 border border-secondary/20 max-w-[120px]">
                                <p className="text-[8px] font-black uppercase tracking-tight text-secondary leading-tight truncate">
                                    {match.summary}
                                </p>
                            </div>
                        )}

                        <div className="px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/20">
                            <span className="text-[8px] font-black text-secondary uppercase tracking-widest">{currentInnings?.overs || 0} OV</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-white/20 group-hover:text-secondary transition-all italic">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] italic">FIXTURE HUB</span>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest">OPEN</span>
                    <ChevronRight size={14} />
                </div>
            </div>
        </motion.div>
    );
};

const LiveScoresPage = () => {
    const { matches, loading, getMatchScore } = useLiveFeed();

    const liveMatches = matches.filter(m => m.status === 'live');
    const upcomingMatches = matches.filter(m => m.status === 'upcoming');
    const pastMatches = matches.filter(m => m.status === 'past');

    if (loading) return <LoadingSpinner size="lg" />;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative mt-10">
            {/* Header */}
            <div className="text-center mb-16 md:mb-24 relative">
                <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-red-500/10 text-red-500 mb-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.15)]">
                    <Activity className="w-12 h-12" />
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic text-white">
                    LIVE <span className="text-primary italic">FEED</span>
                </h1>
                <p className="text-white/40 uppercase tracking-[0.5em] text-[10px] font-black">
                    Real-time sport updates
                </p>
            </div>

            <div className="space-y-32">
                {/* Live Section */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <h2 className="text-3xl font-black uppercase italic tracking-widest text-white">Live Matches</h2>
                        <div className="h-px flex-grow bg-gradient-to-r from-red-500/30 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {liveMatches.length > 0 ? (
                            liveMatches.map(match => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    score={getMatchScore(match, match.sport)}
                                    sport={match.sport}
                                />
                            ))
                        ) : (
                            <div className="text-center col-span-full py-16 bg-white/[0.01] rounded-3xl border border-dashed border-white/5">
                                <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em]">No live matches right now</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Upcoming Section */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                        <h2 className="text-3xl font-black uppercase italic tracking-widest text-white">Upcoming Fixtures</h2>
                        <div className="h-px flex-grow bg-gradient-to-r from-primary/30 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {upcomingMatches.length > 0 ? (
                            upcomingMatches.map(match => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    score={getMatchScore(match, match.sport)}
                                    sport={match.sport}
                                />
                            ))
                        ) : (
                            <div className="text-center col-span-full py-12 opacity-30 italic text-sm text-white">No upcoming matches scheduled</div>
                        )}
                    </div>
                </section>

                {/* History Section */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-3 h-3 rounded-full bg-white/10"></div>
                        <h2 className="text-3xl font-black uppercase italic tracking-widest text-white">Tournament History</h2>
                        <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {pastMatches.length > 0 ? (
                            pastMatches.map(match => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    score={getMatchScore(match, match.sport)}
                                    sport={match.sport}
                                />
                            ))
                        ) : (
                            <div className="text-center col-span-full py-12 opacity-30 italic text-sm text-white">Tournament history will appear here</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LiveScoresPage;
