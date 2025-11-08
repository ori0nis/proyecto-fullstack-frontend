import { Link } from "react-router-dom";
import type { PublicUser } from "../../../models/user";

interface Props {
  users: PublicUser[];
}

export const UserList = ({ users }: Props) => {
  if (!users.length) return <p>No users found</p>;

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <p>ID: {user._id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <Link to={`edit/${user._id}/`}>Edit user profile</Link>
        </div>
      ))}
    </div>
  );
};
