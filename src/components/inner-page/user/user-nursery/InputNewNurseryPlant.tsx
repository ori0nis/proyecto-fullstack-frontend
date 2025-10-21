import { Controller, type Control, type FieldError } from "react-hook-form";
import type { NewNurseryPlantFormValues } from "../../../../zod";

interface Props {
  label: string;
  name: keyof NewNurseryPlantFormValues;
  control: Control<NewNurseryPlantFormValues>;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const InputNewNurseryPlant = ({
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
    <div className="">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              name={name}
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
