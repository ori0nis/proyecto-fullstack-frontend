import { Controller, type Control, type FieldError } from "react-hook-form";
import type { RegisterFormValues } from "../../zod";

interface Props {
  label: string;
  name: keyof RegisterFormValues;
  control: Control<RegisterFormValues>;
  type?: string;
  error?: FieldError;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input = ({
  label,
  name,
  control,
  type,
  error,
  placeholder,
  onFocus = () => {},
  onBlur = () => {},
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
              className={`    ${error ? "" : ""}`}
            />
            {error && <p className="">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
