import { useEffect, useState } from "react";
import { SidebarMenu } from "@ahaui/react";
import { useHistory } from "react-router-dom";
import AddGenreModal from "components/HomePage/AddGenreModal";
interface Props {
  isOpen: boolean;
}

export default function GenresList({ isOpen }: Props) {
  const history = useHistory();
  const [selectedGenres, setSelectedGenres] = useState<string>(history.location.pathname.split("/")[2]);
  const onSelectGenre = (id: string) => {
    setSelectedGenres(id);
    history.push(id);
  };

  useEffect(() => {
    setSelectedGenres(history.location.pathname.split("/")[2]);
  }, [history.location.pathname]);

  return (
    <div className={`Collapse ${isOpen ? "Show " : ""}sidenav u-sizeFull md:u-size2of10`}>
      <AddGenreModal />
      <SidebarMenu size="small" current={selectedGenres} onSelect={onSelectGenre}>
        <SidebarMenu.Item eventKey="recent">Recently added</SidebarMenu.Item>
        {[1, 2, 3, 4, 5].map((i) => (
          <SidebarMenu.Item key={i} eventKey={i}>
            Genre {i}
          </SidebarMenu.Item>
        ))}
      </SidebarMenu>
    </div>
  );
}
