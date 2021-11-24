import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomPagination from "components/common/CustomPagination";

describe("Custom Pagination", () => {
  const handleSelectPage = jest.fn();

  test("show all pages when total page less than 7", () => {
    render(<CustomPagination currentPage={1} totalPage={3} onPageChange={handleSelectPage} />);
    const first = screen.getByText("1");
    const second = screen.getByRole("button", { name: "2" });
    const third = screen.getByRole("button", { name: "3" });
    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(third).toBeInTheDocument();
  });

  test("active page got highlighted", async () => {
    render(<CustomPagination currentPage={1} totalPage={3} onPageChange={handleSelectPage} />);
    const first = screen.getByText("1");
    expect(first).toHaveClass("u-backgroundPrimary");
  });

  test("correct page number is called on page change", () => {
    render(<CustomPagination currentPage={1} totalPage={3} onPageChange={handleSelectPage} />);
    userEvent.click(screen.getByRole("button", { name: "2" }));
    expect(handleSelectPage).toHaveBeenCalled();
    expect(handleSelectPage).toHaveBeenCalledWith(2);
  });

  test("more than 7 pages and current page < 5 should render page 1-5", () => {
    render(<CustomPagination currentPage={1} totalPage={8} onPageChange={handleSelectPage} />);
    const first = screen.getByText("1");
    const fifth = screen.getByRole("button", { name: "5" });
    userEvent.click(fifth);
    expect(first).toBeInTheDocument();
    expect(fifth).toBeInTheDocument();
  });

  test("more than 7 pages and current page > totalPage - 4 should render last 5 page", () => {
    render(<CustomPagination currentPage={7} totalPage={8} onPageChange={handleSelectPage} />);
    const last = screen.getByRole("button", { name: "8" });
    const fifth = screen.getByRole("button", { name: "5" });
    userEvent.click(fifth);
    expect(last).toBeInTheDocument();
    expect(fifth).toBeInTheDocument();
  });

  test("render current page and 4 of its neighbors", () => {
    render(<CustomPagination currentPage={7} totalPage={20} onPageChange={handleSelectPage} />);
    const seventh = screen.getByText("7");
    const nineth = screen.getByRole("button", { name: "9" });
    const fifth = screen.getByRole("button", { name: "5" });
    userEvent.click(seventh);
    expect(fifth).toBeInTheDocument();
    expect(seventh).toBeInTheDocument();
    expect(nineth).toBeInTheDocument();
  });

  test("go to previous page by click on prev button", () => {
    render(<CustomPagination currentPage={2} totalPage={2} onPageChange={handleSelectPage} />);
    const prev = screen.getByTestId("prev");
    userEvent.click(prev);
    expect(handleSelectPage).toHaveBeenCalled();
    expect(handleSelectPage).toHaveBeenCalledWith(1);
  });

  test("cannot click on prev button if at page 1", () => {
    const handlePrev = jest.fn();
    render(<CustomPagination currentPage={1} totalPage={2} onPageChange={handleSelectPage} />);
    const prev = screen.getByTestId("prev");
    userEvent.click(prev);
    expect(handlePrev).toHaveBeenCalledTimes(0);
  });

  test("go to next page by click on next button", () => {
    render(<CustomPagination currentPage={1} totalPage={2} onPageChange={handleSelectPage} />);
    const next = screen.getByTestId("next");
    userEvent.click(next);
    expect(handleSelectPage).toHaveBeenCalled();
    expect(handleSelectPage).toHaveBeenCalledWith(2);
  });

  test("cannot click on next button if at last page", () => {
    const handleNext = jest.fn();
    render(<CustomPagination currentPage={2} totalPage={2} onPageChange={handleSelectPage} />);
    const next = screen.getByTestId("next");
    userEvent.click(next);
    expect(handleNext).toHaveBeenCalledTimes(0);
  });
});
