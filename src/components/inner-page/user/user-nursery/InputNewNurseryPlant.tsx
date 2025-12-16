import { Controller, type Control, type FieldError } from "react-hook-form";
import type { AddNurseryPlantFormValues } from "../../../../zod";

interface SelectOptions {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: keyof AddNurseryPlantFormValues;
  control: Control<AddNurseryPlantFormValues>;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  as?: "text" | "file" | "select";
  options?: SelectOptions[];
  onFocus?: () => void;
  onBlur?: () => void;
  containerClassname?: string;
  labelClassname?: string;
  inputClassname?: string;
  errorClassname?: string;
}

export const InputNewNurseryPlant = ({
  label,
  name,
  control,
  type = "text",
  placeholder,
  error,
  as = "text",
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
          as === "file" ? (
            <div className="flex flex-col items-center">
              <label
                htmlFor={`${name}-input`}
                className="cursor-pointer px-4 py-2 rounded border border-gray-400 bg-gray-200 hover:bg-gray-300 transition-colors font-[quicksand]"
              >
                Select file
              </label>
              <input
                id={`${name}-input`}
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    field.onChange(file);
                  }
                }}
              />
              {field.value && field.value instanceof File && <p className="text-xs mt-1">{field.value.name}</p>}
              {error && <p className={errorClassname}>{error.message}</p>}
            </div>
          ) : as === "select" ? (
            <>
              <select
                name={name}
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
