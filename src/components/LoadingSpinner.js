export default function LoadingSpinner({ message = "Loading your vibe..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Animated Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-neon-pink/30 rounded-full animate-spin border-t-neon-pink"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-neon-cyan/30 rounded-full animate-spin border-t-neon-cyan" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        <div className="absolute inset-2 w-12 h-12 border-4 border-primary/30 rounded-full animate-spin border-t-primary" style={{animationDuration: '2s'}}></div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-white/80 mb-2">{message}</p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-neon-pink rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}