import { Link } from "react-router-dom";
import { LoginForm } from "../../components/login";

export const LoginLayout = () => {
  return (
    <div className="flex flex-col p-3 bg-[#c1dcc9] h-screen items-center justify-center">
      {/* Title */}
      <h1 className="font-[quicksand] text-[#183f30] font-bold text-4xl mb-8">MyPlants.io</h1>

      {/* Form */}
      <LoginForm />

      {/* Redirect button */}
      <Link
        to="/register"
        className="text-[#3d8861] font-[quicksand] font-semibold text-sm hover:text-[#245940] transition-colors duration-400 cursor-pointer mt-2"
      >
        Don't have an account?
      </Link>
    </div>
  );
};
