import { UserPlantList } from "../components/inner-page/user";
import { useAuth } from "../context";

export const ProfilePage = () => {
  const { user } = useAuth();

  const person = user?.username;

  return (
    <>
      <h1>Hello {person}! Welcome to your profile</h1>
      <UserPlantList/>
    </>
  );
};
