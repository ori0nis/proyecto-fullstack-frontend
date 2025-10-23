import { useAuth } from "../../../context";

export const FindFriendsPage = () => {
  const { user } = useAuth();

  const person = user?.username;

  return <h1>This is the friend search page, welcoming {person}</h1>;
};
