import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

export const EditProfileLayout = () => {
  const [formKey, setFormKey] = useState(0);

  const handleFormSuccess = () => {
    setFormKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-sm gap-3 mx-auto text-center mt-2">
        <Link to="" className="cursor-pointer font-medium border border-gray-900 rounded-md p-1">Edit profile</Link>
        <Link to="change-password" className="cursor-pointer font-medium border border-gray-900 rounded-md p-1">Change password</Link>
        <Link to="delete-account" className="cursor-pointer font-medium border border-gray-900 rounded-md p-1">Delete account</Link>
      </div>
      <div className="p-4 mx-auto mt-4">
        <Outlet context={{ handleFormSuccess, formKey }} />
      </div>
      
    </div>
  );
};
