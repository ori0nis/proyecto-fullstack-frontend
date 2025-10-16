import { Controller, type Control, type FieldError } from "react-hook-form";
import type { LoginFormValues } from "../../zod";

interface Props {
  label: string;
  name: keyof LoginFormValues;
  control: Control<LoginFormValues>;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const InputLogin = ({
  label,
  name,
  control,
  type = "text",
  placeholder,
  error,
  onBlur = () => {},
  onFocus = () => {},
}: Props) => {
  return (
    <div className="">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              {...field}
              onFocus={() => {
                onFocus();
              }}
              onBlur={() => {
                field.onBlur();
                onBlur();
              }}
              className={`     ${error ? "" : ""}`}
            />
            {error && <p className="">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
