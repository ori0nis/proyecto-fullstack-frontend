interface Props {
  password: string;
}

const lowSecurityPassword: string[] = ["123", "abc", "qwerty", "password", "admin", "user", "login"];

export const PasswordChecklist = ({ password }: Props) => {
  const rules = [
    {
      constraint: password.length > 8,
      message: "At least 8 characters long"
    },
    {
      constraint: /^(?!\s)(?!.*\s$).*$/.test(password),
      message: "No spaces at the start or end",
    },
    {
      constraint: /[a-z]/.test(password),
      message: "At least one lowercase letter",
    },
    {
      constraint: /[A-Z]/.test(password),
      message: "At least one uppercase letter",
    },
    {
      constraint: /\d/.test(password),
      message: "At least one number",
    },
    {
      constraint: /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password),
      message: "At least one special character",
    },
    {
      constraint: !lowSecurityPassword.includes(password),
      message: "Password is too insecure",
    },
  ];

  return (
    <div className="z-9999 w-full mx-auto bg-[#FFF8E7] opacity-75 text-gray-600 text-xs text-left rounded shadow p-2 max-w-[200px]">
      {rules.map((rule, i) => (
        <p key={i} className={rule.constraint ? "font-[quicksand] font-extrabold text-[#3d8861]" : "font-[quicksand] font-extrabold text-[#c53030]"}>
          {rule.constraint ? "✓" : "✗"} {rule.message}
        </p>
      ))}
    </div>
  );
};
