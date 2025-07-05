export default function Loader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          
          {/* Inner ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-gray-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
        </div>
        
        <h3 className="text-xl font-bold text-white mt-8 mb-3">
          Loading your finances
        </h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Preparing your financial dashboard with beautiful insights and analytics...
        </p>
      </div>
    </div>
  );
} 