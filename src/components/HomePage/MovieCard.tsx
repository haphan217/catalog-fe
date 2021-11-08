import { Card } from "@ahaui/react";

export default function MovieCard() {
  return (
    <Card style={{ width: 300 }} size="medium" className="u-marginHorizontalSmall">
      <img className="u-widthFull" src="/logo192.png" alt="" />
      <Card.Body>
        <h3>Movie title</h3>
        <p>Movie description</p>
      </Card.Body>
    </Card>
  );
}
