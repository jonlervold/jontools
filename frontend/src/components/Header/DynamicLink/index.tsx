import { Link, useLocation } from "wouter";
import { FC } from "react";
import "./DynamicLink.css";

type Props = {
  route: string;
  text: string;
};

/**
 * A component that renders a link to a route.
 * This component is used to highlight the current page in the header.
 */
const DynamicLink: FC<Props> = ({ route, text }) => {
  const [location] = useLocation();
  const isCurrentPage = location === route;

  return (
    <>
      {isCurrentPage && <div className="header__current-page">{text}</div>}
      {!isCurrentPage && <Link href={route}>{text}</Link>}
    </>
  );
};

export default DynamicLink;
