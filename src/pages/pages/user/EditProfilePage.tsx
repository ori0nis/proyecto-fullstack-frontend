import { useState } from "react";
import { EditProfileForm } from "../../../components/inner-page/user";
import { useNavigate } from "react-router-dom";

export const EditProfilePage = () => {
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

  // To force reset of form after success
  const handleFormSuccess = () => {
    setFormKey((prev) => prev + 1);
  };

  return (
    <>
      <EditProfileForm key={formKey} onSuccess={handleFormSuccess} />
      <button onClick={() => navigate("change-password")}>Change password</button>
    </>
  );
};
