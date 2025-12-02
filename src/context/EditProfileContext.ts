import { createContext, useContext } from "react";

interface EditProfileContextProps {
  formKey: number;
  handleFormSuccess: () => void;
}

export const EditProfileContext = createContext<EditProfileContextProps | undefined>(undefined);

export const useEditProfile = () => {
  const context = useContext(EditProfileContext);

  if (!context) throw new Error("useEditProfile must be used within an EditProfileContext provider");

  return context;
};
