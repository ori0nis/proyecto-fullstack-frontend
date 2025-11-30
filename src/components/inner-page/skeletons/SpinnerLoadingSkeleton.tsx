export const SpinnerLoadingSkeleton = () => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-10 w-10 md:h-10 md:w-10 border-t-[#183f30] animate-spin"></div>
    </div>
  );
};
