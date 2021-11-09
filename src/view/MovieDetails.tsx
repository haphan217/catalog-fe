import AddMovieModal from "components/HomePage/AddMovieModal";
import { useState, useEffect } from "react";
import { Movie } from "utils/Types";
import DeleteModal from "components/common/DeleteModal";

interface Props {
  movieId: number;
}

export default function MovieDetails({ movieId }: Props) {
  const [movie, setMovie] = useState<Movie>({ genre: "", description: "", title: "" });
  useEffect(() => {
    //getMovieById here
    console.log(movieId);
    setMovie({ genre: "comedy", description: "aaa", title: "aaa" });
  }, []);
  const onDelete = () => {
    console.log(movie.title);
  };
  return (
    <div>
      Movie Details
      {movie.title && (
        <div className="u-flex u-alignItemsCenter">
          <AddMovieModal genre={movie.genre} editingMovie={movie} />
          <DeleteModal type="movie" item={movie} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}
