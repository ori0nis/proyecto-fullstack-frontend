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
  containerClassname?: string;
  labelClassname?: string;
  inputClassname?: string;
  errorClassname?: string;
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
  containerClassname = "",
  inputClassname = "",
  labelClassname = "",
  errorClassname = "",
}: Props) => {
  return (
    <div className={containerClassname}>
      <label htmlFor={name} className={labelClassname}>
        {label}
      </label>
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
              className={inputClassname}
            />
            {error && <p className={errorClassname}>{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
