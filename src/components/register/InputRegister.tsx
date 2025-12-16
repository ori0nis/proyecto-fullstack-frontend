import { Controller, type Control, type FieldError } from "react-hook-form";
import type { RegisterFormValues } from "../../zod";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: keyof RegisterFormValues;
  control: Control<RegisterFormValues>;
  type?: string;
  error?: FieldError;
  placeholder?: string;
  maxLength?: number;
  as?: "input" | "select";
  options?: SelectOption[];
  onFocus?: () => void;
  onBlur?: () => void;
  containerClassname?: string;
  labelClassname?: string;
  inputClassname?: string;
  errorClassname?: string;
}

export const InputRegister = ({
  label,
  name,
  control,
  type = "text",
  error,
  placeholder,
  maxLength,
  as,
  options,
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
        render={({ field }) =>
          as === "select" ? (
            <>
              <select
                id={name}
                {...field}
                onFocus={() => {
                  onFocus();
                }}
                onBlur={() => {
                  field.onBlur();
                  onBlur();
                }}
                className={inputClassname}
              >
                <option value="">Select option: </option>
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {error && <p className={errorClassname}>{error.message}</p>}
            </>
          ) : (
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
                onChange={(e) => {
                  if (maxLength && e.target.value.length > maxLength) {
                    return;
                  }

                  field.onChange(e);
                }}
                className={inputClassname}
              />
              {error && <p className={errorClassname}>{error.message}</p>}
            </>
          )
        }
      />
    </div>
  );
};
