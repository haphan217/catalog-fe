import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCategoryModal from "components/HomePage/AddCategoryModal";
import { Category } from "utils/Types";

const sampleCategory: Category = {
  name: "sample category",
};
const renderEditModal = (onSubmitCategory: (c: Category) => void) => {
  render(<AddCategoryModal editingCategory={sampleCategory} onSubmitCategory={onSubmitCategory} />);
};
describe("AddCategoryModal", () => {
  const handleSubmitCategory = jest.fn();

  test("should open modal when user clicks on button", () => {
    render(<AddCategoryModal onSubmitCategory={handleSubmitCategory} />);
    const toggleBtn = screen.getByRole("button", { name: /category/i });
    userEvent.click(toggleBtn);
    const modalHeader = screen.getByRole("heading", { name: /add category/i });
    expect(modalHeader).toBeInTheDocument();
  });

  test("should be able to submit form after input category name", () => {
    render(<AddCategoryModal onSubmitCategory={handleSubmitCategory} />);
    const toggleBtn = screen.getByRole("button", { name: /category/i });
    userEvent.click(toggleBtn);
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeDisabled();
    userEvent.type(screen.getByLabelText(/name/i), sampleCategory.name);
    expect(addButton).toBeEnabled();
  });

  test("submit form with correct input category then close modal", () => {
    render(<AddCategoryModal onSubmitCategory={handleSubmitCategory} />);
    const toggleBtn = screen.getByRole("button", { name: /category/i });
    userEvent.click(toggleBtn);
    const addButton = screen.getByRole("button", { name: /add/i });
    userEvent.type(screen.getByLabelText(/name/i), sampleCategory.name);
    userEvent.click(addButton);
    expect(handleSubmitCategory).toHaveBeenCalledTimes(1);
    expect(handleSubmitCategory).toHaveBeenCalledWith(sampleCategory);
    expect(addButton).not.toBeInTheDocument();
  });

  test("should close the modal when user clicks cancel", () => {
    render(<AddCategoryModal onSubmitCategory={handleSubmitCategory} />);
    const toggleBtn = screen.getByRole("button", { name: /category/i });
    userEvent.click(toggleBtn);
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    userEvent.click(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();
  });

  test("should open edit modal when user clicks edit button", () => {
    renderEditModal(handleSubmitCategory);
    const toggleBtn = screen.getByRole("button", { name: /edit category/i });
    userEvent.click(toggleBtn);
    const modalHeader = screen.getByRole("heading", { name: /edit category/i });
    expect(modalHeader).toBeInTheDocument();
  });
});
