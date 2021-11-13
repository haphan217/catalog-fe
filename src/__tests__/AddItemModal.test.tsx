import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddItemModal from "components/HomePage/AddItemModal";
import { Item } from "utils/Types";

const sampleItem: Item = {
  name: "sample item",
  description: "sample description",
};
const renderEditModal = (onSubmitItem: (i: Item) => void) => {
  render(<AddItemModal editingItem={sampleItem} onSubmitItem={onSubmitItem} />);
};
describe("AddItemModal", () => {
  const handleSubmitItem = jest.fn();

  test("should open modal when user clicks on button", () => {
    render(<AddItemModal onSubmitItem={handleSubmitItem} />);
    const toggleBtn = screen.getByRole("button", { name: /item/i });
    userEvent.click(toggleBtn);
    const modalHeader = screen.getByRole("heading", { name: /add item/i });
    expect(modalHeader).toBeInTheDocument();
  });

  test("should be able to submit form after fill out both fields", () => {
    render(<AddItemModal onSubmitItem={handleSubmitItem} />);
    const toggleBtn = screen.getByRole("button", { name: /item/i });
    userEvent.click(toggleBtn);
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeDisabled();
    userEvent.type(screen.getByLabelText(/name/i), sampleItem.name);
    userEvent.type(screen.getByLabelText(/description/i), sampleItem.description);
    expect(addButton).toBeEnabled();
  });

  test("submit form with correct input item then close modal", () => {
    render(<AddItemModal onSubmitItem={handleSubmitItem} />);
    const toggleBtn = screen.getByRole("button", { name: /item/i });
    userEvent.click(toggleBtn);
    const addButton = screen.getByRole("button", { name: /add/i });
    userEvent.type(screen.getByLabelText(/name/i), sampleItem.name);
    userEvent.type(screen.getByLabelText(/description/i), sampleItem.description);
    userEvent.click(addButton);
    expect(handleSubmitItem).toHaveBeenCalledTimes(1);
    expect(handleSubmitItem).toHaveBeenCalledWith(sampleItem);
    expect(addButton).not.toBeInTheDocument();
  });

  test("should close the modal when user clicks cancel", () => {
    render(<AddItemModal onSubmitItem={handleSubmitItem} />);
    const toggleBtn = screen.getByRole("button", { name: /item/i });
    userEvent.click(toggleBtn);
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    userEvent.click(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();
  });

  test("should open edit modal when user clicks edit button", () => {
    renderEditModal(handleSubmitItem);
    const toggleBtn = screen.getByRole("button", { name: /edit item/i });
    userEvent.click(toggleBtn);
    const modalHeader = screen.getByRole("heading", { name: /edit item/i });
    expect(modalHeader).toBeInTheDocument();
  });
});
