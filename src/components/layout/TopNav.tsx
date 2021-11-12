import { Link } from "react-router-dom";
import { Header, Icon, Button, Dropdown } from "@ahaui/react";
import { useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import { selectUser, logout } from "store/slices/userSlice";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopNav({ isOpen, setIsOpen }: Props) {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);
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
        {profile.isAuthenticated ? (
          <Dropdown alignRight>
            <span>Hi, {profile.user.name}</span>
            <Dropdown.Toggle className="u-textLight u-lineHeightNone u-marginLeftExtraSmall">
              <Icon name="contact" size="medium" />
            </Dropdown.Toggle>
            <Dropdown.Container className="u-paddingVerticalExtraSmall">
              <Dropdown.Item>
                <Icon name="power" size="small" />
                <span
                  className="u-marginLeftExtraSmall u-widthFull"
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispatch(logout());
                  }}
                >
                  Logout
                </span>
              </Dropdown.Item>
            </Dropdown.Container>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button size="small">Login</Button>
          </Link>
        )}
      </Header.Right>
    </Header>
  );
}
