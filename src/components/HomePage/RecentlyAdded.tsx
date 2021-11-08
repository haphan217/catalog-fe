import MovieCard from "./MovieCard";
import { Card } from "@ahaui/react";

export default function RecentlyAdded() {
  return (
    <div className="u-sizeFull md:u-size8of10">
      <h3>Recently Added</h3>
      <h5>Genres</h5>
      <div className="u-flex u-flexWrap">
        {[1, 2, 3].map((genre) => (
          <Card size="small" key={genre} body className="u-marginHorizontalSmall">
            Genre {genre}
          </Card>
        ))}
      </div>
      <h5>Movies</h5>
      <div className="u-flex u-flexWrap">
        {[1, 2, 3].map((movie) => (
          <MovieCard key={movie} />
        ))}
      </div>
    </div>
  );
}
