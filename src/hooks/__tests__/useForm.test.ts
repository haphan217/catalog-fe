import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "hooks/useForm";
import React from "react";
import { FormValidation } from "utils/constants";

const sampleValidation = {
  email: {
    regex: {
      value: FormValidation.EMAIL_REGEX,
      message: FormValidation.EMAIL_ERROR,
    },
  },
};

describe("test useForm hook with fake component", () => {
  const submitForm = jest.fn();
  test("useForm without initial data", () => {
    const { result } = renderHook(useForm, { initialProps: { onSubmit: submitForm } });
    expect(result.current.formData).toMatchObject({});
  });

  test("useForm with initial data", () => {
    const { result } = renderHook(useForm, { initialProps: { onSubmit: submitForm, initialData: { name: "name" } } });
    expect(result.current.formData).toMatchObject({ name: "name" });
  });

  test("expose handleChange function without validation", () => {
    const { result } = renderHook(useForm, { initialProps: { onSubmit: submitForm, initialData: { name: "" } } });
    act(() => result.current.handleChange("name")({ target: { value: "x" } } as React.ChangeEvent<HTMLInputElement>));
    expect(result.current.formData).toMatchObject({ name: "x" });
  });

  test("expose handleChange function with email validation", () => {
    const { result } = renderHook(useForm, {
      initialProps: { onSubmit: submitForm, initialData: { email: "" }, validations: sampleValidation },
    });
    act(() => result.current.handleChange("email")({ target: { value: "x" } } as React.ChangeEvent<HTMLInputElement>));
    expect(result.current.errors).toMatchObject({ email: FormValidation.EMAIL_ERROR });
  });

  test("expose handleSubmit function", async () => {
    const { result } = renderHook(useForm, { initialProps: { onSubmit: submitForm, initialData: { name: "" } } });
    await act(() => result.current.handleSubmit());
    expect(submitForm).toHaveBeenCalledTimes(1);
  });
});
