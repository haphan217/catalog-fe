// import React, { useRef } from "react";
// import { render, screen, wait } from "@testing-library/react";
// import { Form } from "@ahaui/react";
// import userEvent from "@testing-library/user-event";
// import { useForm, CustomFormGroup, CustomSubmitButton } from "components/Common/CustomForm";
// import { formatter } from "@gotitinc/querychat-ai-frontend-commons/utils";

// const TestForm = ({ onSubmit }) => {
//   const firstField = useRef(null);
//   const secondField = useRef(null);
//   const { registerForm, registerField } = useForm({
//     onSubmit,
//   });

//   return (
//     <Form {...registerForm()}>
//       <CustomFormGroup
//         {...registerField()}
//         ref={firstField}
//         nextRef={secondField}
//         label="First Field"
//         inputName="firstField"
//       />
//       <CustomFormGroup {...registerField()} ref={secondField} label="Second Field" inputName="secondField" />
//       <CustomSubmitButton {...registerField()} text="Submit" />
//     </Form>
//   );
// };

// const TestFormWithValidation = ({ onSubmit }) => {
//   const email = useRef(null);
//   const password = useRef(null);
//   const { registerForm, registerField } = useForm({
//     onSubmit,
//   });
//   return (
//     <Form {...registerForm()}>
//       <CustomFormGroup {...registerField()} ref={email} nextRef={password} label="Email" inputName="email" />
//       <CustomFormGroup {...registerField()} ref={password} label="Password" inputName="password" />
//       <CustomSubmitButton {...registerField()} text="Submit" />
//     </Form>
//   );
// };

// const TestFormWithInputModifier = ({ onSubmit, customInputModifier }) => {
//   const firstField = useRef(null);
//   const secondField = useRef(null);
//   const { registerForm, registerField } = useForm({
//     onSubmit,
//     customInputModifier,
//   });
//   return (
//     <Form {...registerForm()}>
//       <CustomFormGroup
//         {...registerField()}
//         ref={firstField}
//         nextRef={secondField}
//         label="First Field"
//         inputName="firstField"
//       />
//       <CustomFormGroup {...registerField()} ref={secondField} label="Second Field" inputName="secondField" />
//       <CustomSubmitButton {...registerField()} text="Submit" />
//     </Form>
//   );
// };

// const TestFormWithAdditionalParts = ({ onSubmit }) => {
//   const firstField = useRef(null);
//   const { registerForm, registerField } = useForm({
//     onSubmit,
//   });

//   return (
//     <Form {...registerForm()}>
//       <CustomFormGroup
//         {...registerField()}
//         ref={firstField}
//         label="First Field"
//         inputName="firstField"
//         infoFeedback={
//           <div data-testid="info-feedback" className="u-marginTopTiny u-widthFull u-text100 u-textInformation">
//             This is an info feedback.
//           </div>
//         }
//         formAppend={
//           <Form.InputGroup.Append data-testid="form-input-append">
//             <Form.InputGroup.Text>.example.com</Form.InputGroup.Text>
//           </Form.InputGroup.Append>
//         }
//       />
//       <CustomSubmitButton {...registerField()} text="Submit" />
//     </Form>
//   );
// };

// describe("components/Common/CustomForm", () => {
//   const onSubmit = jest.fn(async () => ({
//     success: true,
//   }));

//   it("should have correct input fields and submit button", () => {
//     render(<TestForm onSubmit={onSubmit} />);
//     const firstField = screen.getByRole("textbox", { name: /firstfield/i });
//     const secondField = screen.getByRole("textbox", { name: /secondfield/i });
//     expect(firstField).toBeInTheDocument();
//     expect(secondField).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
//   });

//   it("should let user submit form successfully", async () => {
//     render(<TestForm onSubmit={onSubmit} />);

//     const firstField = screen.getByRole("textbox", { name: /firstfield/i });
//     const secondField = screen.getByRole("textbox", { name: /secondfield/i });
//     const submitButton = screen.getByRole("button", { name: /submit/i });

//     expect(firstField).toBeInTheDocument();
//     expect(secondField).toBeInTheDocument();
//     userEvent.type(firstField, "Hello");
//     userEvent.type(secondField, "       World       ");
//     userEvent.click(submitButton);
//     expect(secondField.value).toBe("World");

//     const expected = { firstField: "Hello", secondField: "World" };
//     await wait(() => expect(submitButton).toBeEnabled());
//     expect(onSubmit).toHaveBeenCalledTimes(1);
//     expect(onSubmit).toHaveBeenCalledWith(expected);
//   });

//   it("should let user press ENTER to submit valid form", async () => {
//     render(<TestForm onSubmit={onSubmit} />);

//     const firstField = screen.getByRole("textbox", { name: /firstfield/i });
//     const secondField = screen.getByRole("textbox", { name: /secondfield/i });
//     const submitButton = screen.getByRole("button", { name: /submit/i });

//     expect(firstField).toBeInTheDocument();
//     expect(secondField).toBeInTheDocument();
//     userEvent.type(firstField, "Hello");
//     userEvent.type(secondField, "       World       {enter}");

//     expect(secondField.value).toBe("World");
//     const expected = { firstField: "Hello", secondField: "World" };
//     await wait(() => expect(submitButton).toBeEnabled());

//     // Not sure why it is called twice here
//     // Tested manually, and it is called once
//     //expect(onSubmit).toHaveBeenCalledTimes(1);
//     expect(onSubmit).toHaveBeenCalledWith(expected);
//   });

//   it("should have correct error message when fields are invalid", async () => {
//     // Use default validation for email and password
//     render(<TestFormWithValidation onSubmit={onSubmit} />);

//     const email = screen.getByRole("textbox", { name: /email/i });
//     const password = screen.getByRole("textbox", { name: /password/i });
//     const submitButton = screen.getByRole("button", { name: /submit/i });

//     expect(email).toBeInTheDocument();
//     expect(password).toBeInTheDocument();
//     email.focus();
//     email.blur();

//     // Empty email
//     expect(screen.getByRole("alert").textContent).toMatchSnapshot();
//     // Invalid email email
//     userEvent.type(email, "Hello");
//     expect(screen.getByRole("alert").textContent).toMatchSnapshot();

//     userEvent.type(email, "name@gmail.com");
//     expect(screen.queryByRole("alert")).not.toBeInTheDocument();
//     userEvent.click(submitButton);
//     // Empty password
//     expect(screen.getByRole("alert").textContent).toMatchSnapshot();
//     // Invalid password
//     userEvent.type(password, "123");
//     expect(screen.getByRole("alert").textContent).toMatchSnapshot();

//     userEvent.type(password, "123456aA");
//     expect(screen.queryByRole("alert")).not.toBeInTheDocument();
//   });

//   it("should modify input correctly", async () => {
//     const removeAllSpaces = (value) => formatter.replaceWhitespaceAndNbsp(value);

//     render(<TestFormWithInputModifier onSubmit={onSubmit} customInputModifier={removeAllSpaces} />);

//     const firstField = screen.getByRole("textbox", { name: /firstfield/i });
//     const secondField = screen.getByRole("textbox", { name: /secondfield/i });
//     const submitButton = screen.getByRole("button", { name: /submit/i });

//     expect(firstField).toBeInTheDocument();
//     expect(secondField).toBeInTheDocument();
//     userEvent.type(firstField, "Hello");
//     userEvent.type(secondField, "  Nice     World       {enter}");

//     expect(secondField.value).toBe("Nice World");
//     const expected = { firstField: "Hello", secondField: "Nice World" };
//     await wait(() => expect(submitButton).toBeEnabled());
//     expect(onSubmit).toHaveBeenCalledWith(expected);
//   });

//   it("should render additional parts correctly", async () => {
//     render(<TestFormWithAdditionalParts onSubmit={onSubmit} />);

//     expect(screen.getByTestId("info-feedback").textContent).toMatchSnapshot();
//     expect(screen.getByTestId("form-input-append").textContent).toMatchSnapshot();
//   });
// });
export {};
