const LoadingSpinner = ({ size = 'md' }) => {
    const sizes = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4'
    };

    return (
        <div className="flex items-center justify-center py-20">
            <div className={`rounded-full border-primary border-t-transparent animate-spin ${sizes[size]}`}></div>
        </div>
    );
};

export default LoadingSpinner;
