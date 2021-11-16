import { Link, useLocation } from "react-router-dom";
import { Header, Icon, Button, Dropdown } from "@ahaui/react";
import { useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import { selectUser, logout } from "store/slices/userSlice";

export default function TopNav() {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectUser);
  const location = useLocation();
  return (
    <Header className=" u-backgroundPrimaryLighter u-marginBottomSmall">
      {(location.pathname === "/login" || location.pathname === "/register") && (
        <Header.Left>
          <Link to="/">
            <Icon size="medium" name="arrowBack" className="u-textPrimary" />
          </Link>
        </Header.Left>
      )}
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
        ) : location.pathname === "/login" || location.pathname === "/register" ? (
          ""
        ) : (
          <Link to="/login">
            <Button size="small">Login</Button>
          </Link>
        )}
      </Header.Right>
    </Header>
  );
}
