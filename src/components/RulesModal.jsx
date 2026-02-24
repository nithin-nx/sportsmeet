import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { useEffect } from 'react';

const RulesModal = ({ isOpen, onClose, eventName, rules }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-zinc-900 border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Minimal Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">{eventName} Rules</h2>
                                <p className="text-[10px] text-primary uppercase font-black tracking-[0.3em] mt-1">Official Tournament Guidelines</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all shadow-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Focused Rules List */}
                        <div className="p-8 pb-10 flex-grow overflow-y-auto custom-scrollbar max-h-[60vh]">
                            <div className="space-y-6">
                                {rules && rules.length > 0 ? (
                                    rules.map((rule, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex gap-4 group"
                                        >
                                            <span className="shrink-0 w-6 h-6 rounded-lg bg-primary text-black flex items-center justify-center text-[10px] font-black">
                                                {idx + 1}
                                            </span>
                                            <p className="text-base text-white/80 leading-relaxed font-medium group-hover:text-white transition-colors">
                                                {rule}
                                            </p>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-30 space-y-3">
                                        <Info size={32} />
                                        <p className="text-sm italic">General tournament rules apply.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Simple Footer */}
                        <div className="p-8 pt-0">
                            <button
                                onClick={onClose}
                                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all"
                            >
                                Close Rules
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RulesModal;
