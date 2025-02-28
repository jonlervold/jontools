import versionFile from "../../../versionFile.json";
import { FC } from "react";
import "./Footer.css";

/**
 * A component that renders the footer of the app.
 */
const Footer: FC = () => {
  const currentYear: number = new Date().getFullYear();
  const yearDisplay: string =
    currentYear === 2025 ? "2025" : `2025-${currentYear.toString()}`;

  const versionDisplay: string = `v${versionFile.major}.${versionFile.minor}.${versionFile.patch}`;

  return (
    <div className="footer__wrapper">
      <div className="footer__row">
        <a href="https://jonlervold.com" target="_blank">
          jonlervold.com
        </a>

        <div>//</div>

        <a href="https://github.com/jonlervold/jontools" target="_blank">
          GitHub
        </a>

        <div>//</div>

        <div>{yearDisplay}</div>
      </div>

      <div className="footer__row footer__version-display">
        {versionDisplay}
      </div>
    </div>
  );
};

export default Footer;
