import { Dropdown, Header, Icon, Button } from "@ahaui/react";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopNav({ isOpen, setIsOpen }: Props) {
  return (
    <Header className=" u-backgroundPrimaryLighter u-marginBottomSmall">
      <Header.Left className="md:u-hidden">
        <Icon
          className={isOpen ? "u-textPrimary" : ""}
          size="medium"
          name="menu"
          role="button"
          onClick={() => setIsOpen(!isOpen)}
        />
      </Header.Left>
      <Header.Right>
        <Link to="/login">
          <Button size="small">Login</Button>
        </Link>
        {/* <Dropdown alignRight>
          <Dropdown.Toggle className="u-textLight u-lineHeightNone">
            <Icon name="contact" size="medium" />
          </Dropdown.Toggle>
          <Dropdown.Container className="u-paddingVerticalExtraSmall">
            <Dropdown.Item>
              <Icon name="power" size="small" />
              <span className="u-marginLeftExtraSmall">Logout</span>
            </Dropdown.Item>
          </Dropdown.Container>
        </Dropdown> */}
      </Header.Right>
    </Header>
  );
}
