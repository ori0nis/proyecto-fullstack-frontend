import { useState, type ReactNode } from "react";
import { EditProfileContext } from "./EditProfileContext";

interface Props {
  children: ReactNode;
}

export const EditProfileContextProvider = ({ children }: Props) => {
  const [formKey, setFormKey] = useState<number>(0);

  const handleFormSuccess = () => {
    setFormKey((prev) => prev + 1);
  };

  return <EditProfileContext.Provider value={{ formKey, handleFormSuccess }}>{children}</EditProfileContext.Provider>;
};
