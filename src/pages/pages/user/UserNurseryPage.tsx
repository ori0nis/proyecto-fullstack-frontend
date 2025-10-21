import { UserNursery } from "../../../components/inner-page/user";
import { useAuth } from "../../../context";

export const UserNurseryPage = () => {
  const { user } = useAuth();

  const person = user?.username;

  return (
    <>
      <h1>This is the User Nursery Page, welcoming {person}</h1>
      <UserNursery />
    </>
  );
};
