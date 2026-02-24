import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop"
                    alt="Stadium Background"
                    className="w-full h-full object-cover brightness-[0.4]"
                />
                {/* Advanced Gradient Overlay for better legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/40 via-dark-bg/70 to-dark-bg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/60 via-transparent to-dark-bg/60"></div>

                {/* Animated light streaks */}
                <div className="absolute inset-0 opacity-20">
                    <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent rotate-12"
                    />
                    <motion.div
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-gold to-transparent -rotate-12"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex items-center gap-6 mb-8"
                >
                    {[
                        { num: 1, ext: 'png' },
                        { num: 2, ext: 'png' },
                        { num: 3, ext: 'jpeg' }
                    ].map(({ num, ext }) => (
                        <div key={num} className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent-gold rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-dark-bg rounded-full overflow-hidden border border-white/10 shadow-2xl transform transition duration-500 group-hover:scale-110">
                                <img
                                    src={`/logo${num}.${ext}`}
                                    alt={`College Logo ${num}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, letterSpacing: '0.1em' }}
                    animate={{ opacity: 1, letterSpacing: '0.4em' }}
                    transition={{ duration: 1 }}
                    className="text-primary font-black uppercase mb-4 text-[10px] md:text-sm tracking-[0.4em] drop-shadow-lg"
                >
                    Government Engineering College Idukki
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl sm:text-7xl md:text-[120px] font-black mb-8 leading-[0.9] tracking-tighter italic"
                >
                    GECI <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent-gold bg-300% animate-gradient px-2">SPORTS MEET </span> 2026
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="relative"
                >
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6"></div>
                    <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto font-medium tracking-wide">
                        "Where sweat meets glory and pride turns to legacy."
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator - Outside centered content for "neet" overlap protection */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
            >
                <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-black">Explore Events</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="p-1 rounded-full border border-white/10"
                >
                    <ChevronDown size={18} className="text-primary" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
