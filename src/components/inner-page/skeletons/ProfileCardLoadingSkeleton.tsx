export const ProfileCardLoadingSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 p-4 mt-10">
      {/* User profile skeleton */}
      <div className="flex gap-4 items-center">
        {/* Avatar */}
        <div className="h-20 w-20 rounded-full bg-gray-300 animate-pulse"></div>
        {/* Name and bio */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse"></div>
          <div className="h-8 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
