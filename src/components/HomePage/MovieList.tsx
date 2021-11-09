import PaginationCustom from "components/layout/CustomPagination";
import { useState } from "react";
import AddMovieModal from "./AddMovieModal";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(10);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  return (
    <div className="u-sizeFull md:u-size8of10">
      <h3>Movie List</h3>
      <AddMovieModal genre="genre 1" />
      <div className="u-flex u-flexWrap u-marginTopSmall">
        {[1, 2, 3, 4].map((movie) => (
          <MovieCard key={movie} />
        ))}
      </div>
      {totalPage > 1 && (
        <PaginationCustom currentPage={currentPage} onPageChange={onPageChange} totalPage={totalPage} />
      )}
    </div>
  );
}
