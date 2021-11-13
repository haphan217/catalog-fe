import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Icon } from "@ahaui/react";
import { Item } from "utils/Types";
import AddItemModal from "components/HomePage/AddItemModal";
import DeleteModal from "components/common/DeleteModal";
interface Props {
  itemId: number;
}

export default function ItemDetails({ itemId }: Props) {
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    //getItemById here
    console.log(itemId);
    setItem({ categoryId: 1, description: "Awesome item with awesome description", name: "Awesome item" });
  }, []);

  const onDelete = () => {
    console.log(item?.name);
  };

  const onEditItem = (editingItem: Item) => {
    console.log(editingItem);
  };

  return (
    <div className="Container">
      {item && (
        <div className="u-flex u-justifyContentBetween">
          <h1 className="u-textUppercase">{item.name}</h1>
          <Dropdown alignRight>
            <Dropdown.Toggle className="u-textLight u-lineHeightNone">
              <Icon name="more" size="medium" />
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
      )}
      <p>
        <span className="u-fontBold">Category &nbsp;</span>
        <Link
          className="u-textCapitalize u-textDark hover:u-textPrimary"
          style={{ textDecoration: "none" }}
          to={`/category/1`}
        >
          {item?.categoryId}
        </Link>
      </p>
      <p>{item?.description}</p>
    </div>
  );
}
