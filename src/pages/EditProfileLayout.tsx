import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export const EditProfileLayout = () => {
  const [formKey, setFormKey] = useState(0);

  const handleFormSuccess = () => {
    setFormKey((prev) => prev + 1);
  };

  return (
    <>
      {/* Form navigate buttons */}
      <Link to="">Edit your profile</Link>
      <Link to="change-password">Change your password</Link>
      <Link to="delete-account">Delete your account</Link>

      {/* Outlet shows applicable form according to Link click */}
      <Outlet context={{ handleFormSuccess, formKey }} />
    </>
  );
};
