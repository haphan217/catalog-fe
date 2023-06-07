import { useState } from "react";

interface Validation {
  regex?: {
    value: string;
    message: string;
  };
}

type Validations<T> = Partial<Record<keyof T, Validation>>;
type Error<T> = Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<keyof T, any> = Record<string, unknown>>({
  initialData,
  onSubmit,
  validations,
}: {
  initialData?: Partial<T>;
  onSubmit: () => void;
  validations?: Validations<T>;
}) => {
  const [formData, setFormData] = useState<T>((initialData || {}) as T);
  const [errors, setErrors] = useState<Error<T>>({});

  const handleChange = (k: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [k]: event.target.value });
    if (validations) {
      for (const key in validations) {
        if (key === k) {
          const value = event.target.value;
          const validation = validations[key];

          if (validation?.regex?.value && !RegExp(validation.regex?.value).test(value) && !!value) {
            setErrors((prev) => ({ ...prev, [key]: validation?.regex?.message }));
          } else {
            setErrors((prev) => ({ ...prev, [key]: "" }));
          }
        }
      }
    }
  };

  const handleSubmit = async () => {
    onSubmit();
  };

  return { formData, handleChange, handleSubmit, errors };
};
