import { useHistory } from "react-router-dom";
import { Card } from "@ahaui/react";

export default function MovieCard({ movieId }: { movieId: number }) {
  const history = useHistory();
  const toMovieDetails = () => {
    history.push(`/movie/${movieId}`);
  };
  return (
    <Card
      style={{ width: 300 }}
      size="medium"
      className="u-marginHorizontalSmall u-shadowMedium hover:u-shadowLarge"
      onClick={toMovieDetails}
      role="button"
    >
      <img className="u-widthFull" src="/logo192.png" alt="" />
      <Card.Body>
        <h3>Movie title</h3>
        <p>Movie description</p>
      </Card.Body>
    </Card>
  );
}
