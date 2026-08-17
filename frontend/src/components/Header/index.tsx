import Heading from "../base-components/Heading";
import DynamicLink from "./DynamicLink";
import { FC } from "react";
import "./Header.css";

/**
 * A component that renders the header of the app.
 */
const Header: FC = () => {
  return (
    <div>
      <div className="header__center">
        <Heading text="jontools" size="very-big" />
      </div>

      <div className="header__center">
        <DynamicLink route="/" text="about" />
        <DynamicLink route="/midi-inverter" text="midi inverter" />
        <DynamicLink route="/midi-transformer" text="midi transformer" />
        <DynamicLink route="/lrms-player" text="lrms player" />
        <DynamicLink route="/iching" text="i ching" />
      </div>
    </div>
  );
};

export default Header;
