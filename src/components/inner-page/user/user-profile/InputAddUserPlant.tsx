import { Controller, type Control, type FieldError } from "react-hook-form";
import type { AddUserPlantFormValues } from "../../../../zod";

interface Props {
  label: string;
  name: keyof AddUserPlantFormValues;
  control: Control<AddUserPlantFormValues>;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const InputAddUserPlant = ({
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
              onChange={(e) => {
                if (type === "file" && e.target.files) {
                  field.onChange(e.target.files[0]);
                } else {
                  field.onChange(e.target.value);
                }
              }}
              onFocus={() => {
                onFocus();
              }}
              onBlur={() => {
                field.onBlur();
                onBlur();
              }}
              className={`       ${error ? "" : ""}`}
            />
            {error && <p className="">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
