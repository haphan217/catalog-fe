import { Card, EmptyState } from "@ahaui/react";
import { useHistory } from "react-router-dom";
import AddCategoryModal from "./AddCategoryModal";
import ItemCard from "./ItemCard";

const BlankPage = () => {
  return (
    <div className="u-flex u-justifyContentCenter u-marginTopLarge">
      <EmptyState src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/emptyState/general.svg">
        <EmptyState.Description>You have not created any categories.</EmptyState.Description>
        <EmptyState.Heading className="u-marginBottomSmall">Start creating one!</EmptyState.Heading>
        <AddCategoryModal />
      </EmptyState>
    </div>
  );
};

export default function RecentlyAdded() {
  const history = useHistory();
  return (
    <div className="u-sizeFull md:u-size8of10">
      <h3>Recently Added</h3>
      <h5 className="u-marginRightSmall">Categories</h5>
      <div className="u-flex u-flexWrap">
        {[1, 2, 3, 4].map((category) => (
          <Card
            role="button"
            size="small"
            key={category}
            body
            className="u-marginHorizontalSmall u-shadowSmall"
            onClick={() => history.push(category.toString())}
          >
            Category {category}
          </Card>
        ))}
      </div>
      <h5>Items</h5>

      <div className="u-flex u-flexWrap">
        {[1, 2, 3, 4].map((item) => (
          <ItemCard key={item} itemId={item} />
        ))}
      </div>
    </div>
  );
}
