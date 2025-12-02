export const UserTableSkeleton = () => {
  return (
    <tr className="animate-pulse border-b">
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </td>
      <td className="p-3">
        <div className="h-6 bg-gray-300 rounded w-20"></div>
      </td>
    </tr>
  );
};
