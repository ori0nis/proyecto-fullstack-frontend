import { Controller, type Control, type FieldError } from "react-hook-form";
import type { DeleteAccountFormValues } from "../../../../zod";

interface Props {
  label: string;
  name: keyof DeleteAccountFormValues;
  control: Control<DeleteAccountFormValues>;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const InputDeleteAccount = ({
  label,
  name,
  control,
  type,
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
              className={`      ${error ? "" : ""}`}
            />
            {error && <p className="">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
