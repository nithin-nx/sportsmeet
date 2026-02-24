import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Dumbbell, Gamepad2, Stars } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useDepartments } from '../hooks/useDepartments';

const LeaderboardTable = ({ title, departments, icon: Icon, colorClass, delay = 0 }) => {
    const maxPoints = Math.max(...departments.map(d => d.points), 1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className="space-y-6"
        >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center shadow-lg border border-white/10 ${colorClass}`}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none">{title}</h2>
                    <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] ${colorClass}`}>Tournament Standings</span>
                </div>
            </div>

            <div className="space-y-4">
                {departments.map((dept, idx) => (
                    <motion.div
                        key={dept.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: delay + (idx * 0.05) }}
                        className={`glass-card p-4 md:p-5 flex items-center gap-4 md:gap-5 relative overflow-hidden group transition-all duration-300 ${idx === 0 ? 'bg-white/10 border-white/30 scale-[1.01] sm:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.05)]' : ''
                            }`}
                    >
                        {/* Rank Background numbering (hidden on small mobile to avoid clutter) */}
                        <div className="absolute right-4 -bottom-4 text-6xl md:text-8xl font-black text-white/[0.03] select-none group-hover:text-white/[0.05] transition-colors hidden sm:block">
                            {idx + 1}
                        </div>

                        {/* Rank */}
                        <div className="flex-shrink-0 w-8 md:w-12 text-center relative">
                            {idx === 0 ? (
                                <motion.div
                                    animate={{ rotateY: [0, 360] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                    <Trophy className="text-accent-gold mx-auto drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] w-6 h-6 md:w-7 md:h-7" />
                                </motion.div>
                            ) : (
                                <span className={`text-lg md:text-2xl font-black font-display ${idx < 3 ? 'text-white/60' : 'text-white/20'}`}>
                                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </span>
                            )}
                        </div>

                        {/* Dept Info */}
                        <div className="flex-grow flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full relative z-10">
                            <div className="flex items-center gap-3 md:gap-4 min-w-0 md:min-w-[180px]">
                                <div
                                    className="w-1 h-6 md:w-1.5 md:h-10 rounded-full shadow-lg flex-shrink-0"
                                    style={{ backgroundColor: dept.color, boxShadow: `0 0 15px ${dept.color}44` }}
                                ></div>
                                <h3 className="text-base md:text-xl font-black uppercase tracking-tight truncate pr-1">{dept.name}</h3>
                            </div>

                            {/* Progress Bar Container */}
                            <div className="flex-grow relative w-full">
                                <div className="flex justify-between items-center mb-1 px-1">
                                    <div className="flex items-center gap-1.5">
                                        {idx === 0 && <Stars size={10} className="text-accent-gold animate-pulse" />}
                                        <span className="text-[8px] font-black tracking-widest text-white/30 uppercase">Perf</span>
                                    </div>
                                    <span className="text-[10px] md:text-sm font-black font-display text-white/80">{dept.points} PTS</span>
                                </div>
                                <div className="h-1.5 md:h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(dept.points / maxPoints) * 100}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.3 }}
                                        style={{
                                            backgroundColor: dept.color,
                                            boxShadow: `0 0 20px ${dept.color}33`
                                        }}
                                        className="h-full rounded-full relative overflow-hidden"
                                    >
                                        <motion.div
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const PointsTablePage = () => {
    const { departments: athleticsDepts, loading: athleticsLoading } = useDepartments('athletics');
    const { departments: gamesDepts, loading: gamesLoading } = useDepartments('games');
    const { departments: overallDepts, loading: overallLoading } = useDepartments();

    if (athleticsLoading || gamesLoading || overallLoading) return <LoadingSpinner size="lg" />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative mt-10"
        >
            {/* Background Decorative Illustrations */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.02] md:opacity-[0.03]">
                <Dumbbell className="absolute top-1/4 left-10 rotate-12 w-48 h-48 md:w-72 md:h-72" />
                <Gamepad2 className="absolute bottom-1/4 right-10 -rotate-12 w-48 h-48 md:w-72 md:h-72" />
            </div>

            <div className="text-center mb-16 md:mb-24 relative">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center p-3 md:p-4 rounded-2xl md:rounded-3xl bg-primary/20 text-primary mb-6 md:mb-8 border border-primary/20 shadow-[0_0_50px_rgba(0,114,255,0.15)]"
                >
                    <Trophy className="w-8 h-8 md:w-12 md:h-12 animate-bounce" />
                </motion.div>
                <h1 className="text-5xl md:text-8xl font-black mb-4 md:mb-6 tracking-tighter italic">
                    THE <span className="text-primary">GLORY</span> TABLE
                </h1>
                <div className="flex items-center justify-center gap-3 md:gap-4">
                    <div className="h-px w-8 md:w-12 bg-white/20"></div>
                    <p className="text-white/40 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-xs font-black">
                        GEC SPORTS MEET 2026 OFFICIAL RANKINGS
                    </p>
                    <div className="h-px w-8 md:w-12 bg-white/20"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-24 md:mb-32">
                <LeaderboardTable
                    title="Athletics"
                    departments={athleticsDepts}
                    icon={Dumbbell}
                    colorClass="text-primary"
                    delay={0.2}
                />
                <LeaderboardTable
                    title="Sports Games"
                    departments={gamesDepts}
                    icon={Gamepad2}
                    colorClass="text-accent-crimson"
                    delay={0.4}
                />
            </div>

            {/* Overall Standings Section 
            <div className="pt-16 md:pt-20 border-t border-white/10 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-bg px-6 md:px-8">
                    <Stars className="text-accent-gold w-6 h-6 md:w-8 md:h-8" />
                </div>
                <LeaderboardTable
                    title="Overall Champions"
                    departments={overallDepts}
                    icon={Trophy}
                    colorClass="text-accent-gold"
                    delay={0.6}
                />
            </div>*/}
        </motion.div>
    );
};

export default PointsTablePage;
