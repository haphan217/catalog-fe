import { Card, Dropdown, Icon } from "@ahaui/react";
import { Item } from "utils/Types";

import AddItemModal from "components/HomePage/AddItemModal";
import DeleteModal from "components/common/DeleteModal";

export default function ItemCard({ item }: { item: Item }) {
  const onDelete = () => {
    console.log(item?.name);
  };

  const onEditItem = (editingItem: Item) => {
    console.log(editingItem);
  };
  return (
    <Card
      style={{ width: 300 }}
      size="medium"
      className="u-marginHorizontalSmall u-shadowSmall hover:u-shadowMedium"
      role="button"
    >
      <Card.Body>
        <div className="u-flex u-justifyContentBetween">
          <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <Dropdown alignRight>
            <Dropdown.Toggle className="u-textLight u-lineHeightNone">
              <Icon name="more" size="small" />
            </Dropdown.Toggle>
            <Dropdown.Container className="u-paddingVerticalExtraSmall">
              <Dropdown.Item>
                <AddItemModal onSubmitItem={onEditItem} editingItem={item} />
              </Dropdown.Item>
              <Dropdown.Item>
                <DeleteModal type="item" item={item} onDelete={onDelete} />
              </Dropdown.Item>
            </Dropdown.Container>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
}
