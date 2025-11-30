export const PlantCardSkeleton = () => {
  return (
    <div className="rounded-lg shadow-md shadow-neutral-500 overflow-hidden flex flex-col items-center text-center animate-pulse">
      {/* Image */}
      <div className="w-full aspect-square bg-gray-300 opacity-40" />

      {/* Text lines */}
      <div className="w-3/4 mt-3 h-4 bg-gray-300 rounded opacity-40" />
      <div className="w-1/2 mt-2 h-3 bg-gray-300 rounded opacity-40" />
      <div className="w-2/3 mt-3 mb-3 h-3 bg-gray-300 rounded opacity-40" />
    </div>
  );
};
