import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteModal from "components/common/DeleteModal";
import { Item } from "utils/Types";

describe("DeleteModal", () => {
  const handleDelete = jest.fn();
  const item: Item = {
    name: "sample item",
    description: "sample description",
  };
  test("should open modal when user clicks on button", () => {
    render(<DeleteModal type="item" item={item} onDelete={handleDelete} />);
    const toggleBtn = screen.getByRole("button", { name: "Delete item" });
    userEvent.click(toggleBtn);
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeInTheDocument();
  });

  test("should let user delete item then close the modal", () => {
    render(<DeleteModal type="item" item={item} onDelete={handleDelete} />);
    const toggleBtn = screen.getByRole("button", { name: "Delete item" });
    userEvent.click(toggleBtn);
    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    userEvent.click(deleteBtn);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(item);
    expect(deleteBtn).not.toBeInTheDocument();
  });

  test("should close the modal when user clicks cancel", () => {
    render(<DeleteModal type="item" item={item} onDelete={handleDelete} />);
    const toggleBtn = screen.getByRole("button", { name: "Delete item" });
    userEvent.click(toggleBtn);
    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    userEvent.click(cancelBtn);
    expect(cancelBtn).not.toBeInTheDocument();
  });
});
