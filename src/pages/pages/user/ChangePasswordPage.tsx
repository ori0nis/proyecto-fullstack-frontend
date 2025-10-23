import { useState } from "react";
import { ChangePasswordForm } from "../../../components/inner-page/user/";
import { useNavigate } from "react-router-dom";

export const ChangePasswordPage = () => {
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

  // To force reset of form after success
  const handleFormSuccess = () => {
    setFormKey((prev) => prev + 1);
  };
  return (
    <>
      <ChangePasswordForm key={formKey} onSuccess={handleFormSuccess} />
      <button onClick={() => navigate(-1)}>Back to edit</button>
    </>
  );
};
