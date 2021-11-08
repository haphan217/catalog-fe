import { useState } from "react";
import { SidebarMenu } from "@ahaui/react";
import { useHistory } from "react-router-dom";
import AddGenreModal from "components/HomePage/AddGenreModal";
interface Props {
  isOpen: boolean;
}

export default function GenresList({ isOpen }: Props) {
  const [selectedGenres, setSelectedGenres] = useState<string>("recent");
  const history = useHistory();
  const onSelectGenre = (id: string) => {
    setSelectedGenres(id);
    history.push(id);
  };

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
