import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useEvents } from '../hooks/useEvents';
import { useDepartments } from '../hooks/useDepartments';

const HomePage = () => {
    const { athleticsEvents, gamesEvents, loading: eventsLoading } = useEvents();
    const { loading: deptsLoading } = useDepartments();

    if (eventsLoading || deptsLoading) return <LoadingSpinner size="lg" />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-32"
        >
            <HeroSection />

            <div className="max-w-7xl mx-auto px-6 space-y-32 md:space-y-48 mt-20 relative">
                {/* Games Section */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-crimson">Category 01</span>
                            <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter">Sports <span className="text-accent-crimson">Games</span></h2>
                        </div>
                        <div className="h-1 flex-grow bg-white/5 rounded-full hidden md:block mb-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {gamesEvents.length > 0 ? (
                            gamesEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))
                        ) : (
                            <p className="text-white/40 italic">No sports games scheduled yet.</p>
                        )}
                    </div>
                </section>

                {/* Athletics Section */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Category 02</span>
                            <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter">Athletics <span className="text-primary">Events</span></h2>
                        </div>
                        <div className="h-1 flex-grow bg-white/5 rounded-full hidden md:block mb-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {athleticsEvents.length > 0 ? (
                            athleticsEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))
                        ) : (
                            <p className="text-white/40 italic">No athletics events scheduled yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default HomePage;
