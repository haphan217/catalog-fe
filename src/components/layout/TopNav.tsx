import { Avatar, Header, Icon } from "@ahaui/react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopNav({ isOpen, setIsOpen }: Props) {
  return (
    <Header>
      <Header.Left className="md:u-hidden">
        <Icon size="medium" name="menu" role="button" onClick={() => setIsOpen(!isOpen)} />
      </Header.Left>
      <Header.Right>
        <Avatar className="u-backgroundPrimaryLight u-text200" text="AB" />
      </Header.Right>
    </Header>
  );
}
