import { useHistory } from "react-router-dom";
import { Card } from "@ahaui/react";

export default function ItemCard({ itemId }: { itemId: number }) {
  const history = useHistory();
  const toItemDetails = () => {
    history.push(`/item/${itemId}`);
  };
  return (
    <Card
      style={{ width: 300 }}
      size="medium"
      className="u-marginHorizontalSmall u-shadowMedium hover:u-shadowLarge"
      onClick={toItemDetails}
      role="button"
    >
      <Card.Body>
        <h3>Item name</h3>
        <p>Item description</p>
      </Card.Body>
    </Card>
  );
}
