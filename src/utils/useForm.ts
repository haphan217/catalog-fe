import { useState } from "react";

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
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

  const handleChange = (key: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [key]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validations) {
      let isValid = true;
      const newErrors = {} as Error<T>;
      for (const key in validations) {
        const value = formData[key];
        const validation = validations[key];

        //Required field
        if (validation?.required?.value && !value) {
          isValid = false;
          newErrors[key] = validation.required.message;
        }

        //Regex field
        if (validation?.regex?.value && !RegExp(validation.regex?.value).test(value)) {
          isValid = false;
          newErrors[key] = validation.regex.message;
        }
      }
      if (!isValid) {
        setErrors(newErrors);
        return;
      }
    }
    setErrors({});
    onSubmit();
  };

  return { formData, handleChange, handleSubmit, errors };
};
