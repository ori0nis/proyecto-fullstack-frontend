import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/login";

export const LoginLayout = () => {
  const navigate = useNavigate()

  return (
    <>
      <LoginForm />
      <button onClick={() => navigate("/register")}>Don't have an account?</button>
    </>
  );
};
