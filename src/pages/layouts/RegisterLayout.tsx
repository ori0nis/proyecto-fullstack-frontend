import { Link } from "react-router-dom";
import { RegisterForm } from "../../components/register";

export const RegisterLayout = () => {
  return (
    <>
      <RegisterForm />
      <Link to="/login" className="">
        Already have an account?
      </Link>
    </>
  );
};
