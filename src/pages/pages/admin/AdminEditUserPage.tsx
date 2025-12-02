import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PublicUser } from "../../../models/user";
import { getUserById } from "../../../services";
import { EditProfileForm } from "../../../components/inner-page/user";

export const AdminEditUserPage = () => {
  const { id } = useParams();
  const [targetUser, setTargetUser] = useState<PublicUser | null>(null);
  const [formKey, setFormKey] = useState<number>(0);

  const handleFormSuccessAdmin = () => {
    setFormKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (id) {
      getUserById(id).then((res) => setTargetUser(res.data?.users[0] ?? null));
    }
  }, [id]);

  if (!targetUser) return <p>Loading user data...</p>;

  return (
    <>
      <h1 className="mt-4 text-lg font-medium rounded-lg border w-fit p-2 bg-red-300 text-center mx-auto">Editing user: <span className="font-bold">{targetUser.username}</span></h1>
      <div className="w-fit mx-auto mt-4">
        <EditProfileForm targetUser={targetUser} onSuccess={handleFormSuccessAdmin} key={formKey} />
      </div>
    </>
  );
};
