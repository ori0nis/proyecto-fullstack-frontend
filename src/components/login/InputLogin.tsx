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
  containerClassname?: string;
  inputClassname?: string;
  labelClassname?: string;
  errorClassname?: string;
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
