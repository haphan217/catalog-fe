import { Pagination } from "@ahaui/react";

interface Props {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginationCustom({ currentPage, totalPage, onPageChange }: Props) {
  const paginationItems = [];

  if (totalPage <= 7) {
    //render all pages, no ellipsis
    for (let i = 1; i < totalPage + 1; i++) {
      paginationItems.push(
        <Pagination.Item onClick={() => onPageChange(i)} active={i === currentPage} href={"#" + i}>
          {i}
        </Pagination.Item>,
      );
    }
  } else {
    let shouldSkip = false; //render or skip ellipsis
    for (let i = 1; i < totalPage + 1; i++) {
      if (i === 1 || (i <= 5 && currentPage < 5)) {
        //always render page 1
        //render from page 1-5 if current page is less than 5
        paginationItems.push(
          <Pagination.Item onClick={() => onPageChange(i)} active={i === currentPage} href={"#" + i}>
            {i}
          </Pagination.Item>,
        );
      } else if ((i >= totalPage - 4 && currentPage > totalPage - 4) || i === totalPage) {
        //always render last page
        //render from last page to last - 4 if current page is less than total - 4
        paginationItems.push(
          <Pagination.Item onClick={() => onPageChange(i)} active={i === currentPage} href={"#" + i}>
            {i}
          </Pagination.Item>,
        );
      } else if (currentPage === i) {
        //render 2 pages before current page + current page + 2 pages after
        shouldSkip = false;
        const twoPagesBefore = currentPage - 2;
        const twoPagesAfter = currentPage + 3;
        for (let j: number = twoPagesBefore; j < twoPagesAfter; j++) {
          paginationItems.push(
            <Pagination.Item onClick={() => onPageChange(j)} active={j === currentPage} href={"#" + j}>
              {j}
            </Pagination.Item>,
          );
        }
      } else if (!shouldSkip) {
        paginationItems.push(<Pagination.Ellipsis />);
        shouldSkip = true;
      }
    }
  }

  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage <= 1}
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
      />
      {paginationItems}
      <Pagination.Next
        disabled={currentPage >= totalPage}
        onClick={() => {
          if (currentPage < totalPage) {
            onPageChange(currentPage + 1);
          }
        }}
      />
    </Pagination>
  );
}