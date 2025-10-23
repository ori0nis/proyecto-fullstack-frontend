import { Controller, type Control, type FieldError } from "react-hook-form";
import type { ChangePasswordFormValues } from "../../../../zod";

interface Props {
  label: string;
  name: keyof ChangePasswordFormValues;
  control: Control<ChangePasswordFormValues>;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const InputChangePassword = ({
  label,
  name,
  control,
  type = "text",
  placeholder,
  error,
  onFocus = () => {},
  onBlur = () => {},
}: Props) => {
  return (
    <div>
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
              className={`            ${error ? "" : ""}`}
            />
            {error && <p className="">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
