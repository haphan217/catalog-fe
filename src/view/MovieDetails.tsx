import AddMovieModal from "components/HomePage/AddMovieModal";
import { useState, useEffect } from "react";
import { Movie } from "utils/Types";
import { useRouteMatch } from "react-router-dom";

export default function MovieDetails() {
  const { path } = useRouteMatch();

  const [movie, setMovie] = useState<Movie>({ genre: "", description: "", title: "" });
  useEffect(() => {
    setMovie({ genre: "comedy", description: "aaa", title: "aaa" });
  }, []);
  return (
    <div>
      Movie Details
      {movie.title && <AddMovieModal genre={movie.genre} editingMovie={movie} />}
    </div>
  );
}
