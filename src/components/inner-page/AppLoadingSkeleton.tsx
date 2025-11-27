export const AppLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-amber-100 flex flex-col md:grid md:grid-cols-[200px_1fr]">
      {/* Sidebar skeleton for big screens */}
      <div className="hidden md:flex flex-col gap-2 p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
      </div>

      {/* Spinner for main content */}
      <div className="flex-1 flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-10 w-10 md:h-10 md:w-10 border-t-[#183f30] animate-spin"></div>
      </div>
    </div>
  );
};
