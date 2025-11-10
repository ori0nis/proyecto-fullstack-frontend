import { Controller, type Control, type FieldError } from "react-hook-form";
import type { AdminEditNurseryPlantFormValues } from "../../../../zod";

interface Props {
  label: string;
  name: keyof AdminEditNurseryPlantFormValues;
  control: Control<AdminEditNurseryPlantFormValues>;
  type?: string;
  error?: FieldError;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const InputAdminEditNurseryPlant = ({
  label,
  name,
  control,
  type = "text",
  error,
  placeholder,
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
