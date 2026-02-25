import { Link, useLocation } from 'react-router-dom';
import { Trophy, Home, BarChart2, Menu, X, Stars, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Points Table', path: '/points', icon: <BarChart2 size={18} /> },
        { name: 'Winners', path: '/winners', icon: <Stars size={18} /> },
        { name: 'Live Scores', path: '/live', icon: <Activity size={18} /> },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="fixed top-0 left-0 right-0 z-[100] glass-nav"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <Link to="/" className="flex items-center gap-3 group">
                            <motion.div
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl border border-white/10 shadow-2xl"
                            >
                                <img
                                    src="/logo1.png"
                                    alt="College Logo"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                            </motion.div>
                            <span className="text-xl md:text-2xl font-display font-black uppercase tracking-tighter">
                                GECI <span className="text-primary truncate">Sports Meet</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative py-2 flex items-center gap-2 font-bold uppercase tracking-widest text-xs transition-colors hover:text-white ${location.pathname === link.path ? 'text-primary' : 'text-white/50'
                                        }`}
                                >
                                    {link.icon}
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-white/70 hover:text-white transition-colors relative z-[70]"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-dark-bg/98 backdrop-blur-2xl z-[50] md:hidden flex flex-col items-center justify-center p-8"
                    >
                        <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="w-full"
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center justify-between group p-6 rounded-2xl border transition-all duration-300 ${location.pathname === link.path
                                            ? 'bg-primary/20 border-primary/40 text-primary'
                                            : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {link.icon}
                                            <span className="text-2xl font-black uppercase tracking-tight">{link.name}</span>
                                        </div>
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trophy size={20} />
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 text-center"
                        >
                            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">
                                Government Engineering College
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
