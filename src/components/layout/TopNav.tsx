import { Avatar, Header, Icon } from "@ahaui/react";

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
        <Avatar className="u-backgroundPrimary u-text200" text="AB" />
      </Header.Right>
    </Header>
  );
}
