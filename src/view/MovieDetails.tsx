import AddMovieModal from "components/HomePage/AddMovieModal";
import { useState, useEffect } from "react";
import { Movie } from "utils/Types";
import DeleteModal from "components/common/DeleteModal";
import { Dropdown, Icon } from "@ahaui/react";
import { Link } from "react-router-dom";
interface Props {
  movieId: number;
}

export default function MovieDetails({ movieId }: Props) {
  const [movie, setMovie] = useState<Movie>({ genre: "", description: "", title: "" });

  useEffect(() => {
    //getMovieById here
    console.log(movieId);
    setMovie({ genre: "comedy", description: "Awesome movie with awesome description", title: "Awesome movie" });
  }, []);
  const onDelete = () => {
    console.log(movie.title);
  };
  return (
    <div className="Container">
      {movie.title && (
        <div className="u-flex u-justifyContentBetween">
          <h2 className="u-textUppercase">{movie.title}</h2>
          <Dropdown alignRight>
            <Dropdown.Toggle className="u-textLight u-lineHeightNone">
              <Icon name="more" size="medium" />
            </Dropdown.Toggle>
            <Dropdown.Container className="u-paddingVerticalExtraSmall">
              <Dropdown.Item>
                <AddMovieModal genre={movie.genre} editingMovie={movie} />
              </Dropdown.Item>
              <Dropdown.Item>
                <DeleteModal type="movie" item={movie} onDelete={onDelete} />
              </Dropdown.Item>
            </Dropdown.Container>
          </Dropdown>
        </div>
      )}
      <p>
        <span className="u-fontBold">Genre &nbsp;</span>
        <Link
          className="u-textCapitalize u-textDark hover:u-textPrimary"
          style={{ textDecoration: "none" }}
          to={`/genres/1`}
        >
          {movie.genre}
        </Link>
      </p>
      <p>{movie.description}</p>
    </div>
  );
}
