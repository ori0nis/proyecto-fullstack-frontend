import { Controller, type Control, type FieldError } from "react-hook-form";
import type { EditProfileFormValues } from "../../../../zod/edit-profile.schema";

interface SelectOptions {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: keyof EditProfileFormValues;
  control: Control<EditProfileFormValues>;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  as?: "text" | "textarea" | "file" | "select";
  options?: SelectOptions[];
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  containerClassname?: string;
  labelClassname?: string;
  inputClassname?: string;
  errorClassname?: string;
}

export const InputEditProfile = ({
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
  onChange = () => {},
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
          as === "textarea" ? (
            <>
              <textarea
                id={name}
                placeholder={placeholder}
                maxLength={60}
                rows={3}
                cols={1}
                value={typeof field.value === "string" ? field.value : ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onChange(e.target.value);
                }}
                onFocus={onFocus}
                onBlur={() => {
                  field.onBlur();
                  onBlur();
                }}
                className={`${inputClassname} resize-none`}
              />
              {error && <p className={errorClassname}>{error.message}</p>}
            </>
          ) : as === "file" ? (
            <>
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
                  onFocus={onFocus}
                  onBlur={() => {
                    field.onBlur();
                    onBlur();
                  }}
                />

                {field.value && field.value instanceof File && <p className="text-xs mt-1">{field.value.name}</p>}

                {error && <p className={errorClassname}>{error.message}</p>}
              </div>
            </>
          ) : as === "select" ? (
            <>
              <select
                id={name}
                onFocus={onFocus}
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
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                onFocus={onFocus}
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
