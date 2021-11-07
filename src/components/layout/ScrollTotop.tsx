import { useLocation } from "react-router-dom";
import React from "react";

interface Props {
  mainContent: React.RefObject<HTMLDivElement>;
}

const ScrollToTop = ({ mainContent }: Props) => {
  const location = useLocation();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    if (mainContent.current) {
      mainContent.current.scrollTop = 0;
    }
  }, [location]);
  return null;
};

export default ScrollToTop;
