import { Link } from "react-router-dom";
import type { PublicUser } from "../../../models/user";
import { SpinnerLoadingSkeleton } from "../skeletons/SpinnerLoadingSkeleton";
import { UserTableSkeleton } from "../skeletons/UserTableSkeleton";

interface Props {
  users: PublicUser[];
  initialLoading: boolean;
  hasMore: boolean;
  loadingMore: boolean;
}

export const UserList = ({ users, initialLoading, hasMore, loadingMore }: Props) => {
  if (initialLoading) {
    return <SpinnerLoadingSkeleton />;
  }

  return (
    <>
      <div className="w-full overflow-x-auto text-sm mt-3">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase hidden min-[870px]:table-header-group">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b flex flex-col min-[870px]:table-row p-2 min-[870px]:p-0 mb-3">
                <td className="p-2 min-[870px]:p-3" data-label="ID">
                  <span className="min-[870px]:hidden font-semibold text-gray-900 underline">ID:</span> {user._id}
                </td>

                <td className="p-2 min-[870px]:p-3" data-label="Username">
                  <span className="min-[870px]:hidden font-semibold text-gray-900 underline">Username:</span>{" "}
                  {user.username}
                </td>

                <td className="p-2 min-[870px]:p-3" data-label="Email">
                  <span className="min-[870px]:hidden font-semibold text-gray-900 underline">Email:</span> {user.email}
                </td>

                <td className="p-2 min-[870px]:p-3" data-label="Role">
                  <span className="min-[870px]:hidden font-semibold text-gray-900 underline">Role:</span> {user.role}
                </td>

                <td className="p-2 min-[870px]:p-3" data-label="Actions">
                  <Link
                    to={`edit/${user._id}/`}
                    className="inline-block border px-3 py-1 rounded text-sm hover:bg-gray-100 transition"
                  >
                    Edit profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Infinite scroll skeletons */}
      {loadingMore && hasMore && Array.from({ length: 5 }).map((_, i) => <UserTableSkeleton key={i} />)}
    </>
  );
};
