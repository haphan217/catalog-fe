import DeleteModal from "components/common/DeleteModal";
import PaginationCustom from "components/layout/CustomPagination";
import { useEffect, useState } from "react";
import { Genre } from "utils/Types";
import AddGenreModal from "./AddGenreModal";
import AddMovieModal from "./AddMovieModal";
import MovieCard from "./MovieCard";

interface Props {
  genreId: number;
}

export default function MovieList({ genreId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(10);

  const [genre, setGenre] = useState<Genre>({ title: "" });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  useEffect(() => {
    //getMovieByGenreId, getGenreDetails here
    setGenre({ title: "comedy" });
  }, []);

  const onDelete = () => {
    console.log(genre.title);
  };

  return (
    <div className="u-sizeFull md:u-size8of10">
      {genre.title && (
        <div className="u-flex u-alignItemsCenter u-marginBottomSmall">
          <h3 style={{ marginBottom: 0 }}>{genre.title} movies</h3>
          <AddGenreModal editingGenre={genre} />
          <DeleteModal type="genre" item={genre} onDelete={onDelete} />
        </div>
      )}
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
