import { Link } from "react-router-dom";
import { RegisterForm } from "../../components/register";

export const RegisterLayout = () => {
  return (
    <div className="flex flex-col p-3 bg-[#d8c8b6] h-screen items-center justify-center">
      {/* Title */}
      <h1 className="font-[quicksand] text-[#183f30] font-bold text-4xl mb-8">MyPlants.io</h1>

      {/* Form */}
      <RegisterForm />

      {/* Redirect to login */}
      <Link to="/login" className="text-[#8A5E3C] font-[quicksand] font-semibold text-sm hover:text-[#6A462A] transition-colors duration-400 cursor-pointer mt-2">
        Already have an account?
      </Link>
    </div>
  );
};
