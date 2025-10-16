interface Props {
  password: string;
}

const lowSecurityPassword: string[] = ["123", "abc", "qwerty", "password", "admin", "user", "login"];

export const PasswordChecklist = ({ password }: Props) => {
  const rules = [
    {
      constraint: password.length > 8,
      message: "Password must be at least 8 characters long"
    },
    {
      constraint: /^(?!\s)(?!.*\s$).*$/.test(password),
      message: "Password can't contain spaces at the start or end",
    },
    {
      constraint: /[a-z]/.test(password),
      message: "Password must contain at least one lowercase letter",
    },
    {
      constraint: /[A-Z]/.test(password),
      message: "Password must contain at least one uppercase letter",
    },
    {
      constraint: /\d/.test(password),
      message: "Password must contain at least one number",
    },
    {
      constraint: /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password),
      message: "Password must contain at least one special character",
    },
    {
      constraint: !lowSecurityPassword.includes(password),
      message: "Password is too insecure",
    },
  ];

  return (
    <div>
      {rules.map((rule, i) => (
        <p key={i} className={rule.constraint ? "" : ""}>
          {rule.constraint ? "✓" : "✗"} {rule.message}
        </p>
      ))}
    </div>
  );
};
