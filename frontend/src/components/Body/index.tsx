import FadeContainerDynamic from "../base-components/FadeContainerDynamic";
import Transformer from "./Transformer";
import InvalidUrl from "./InvalidUrl";
import { useLocation } from "wouter";
import { useEffect } from "react";
import Inverter from "./Inverter";
import Home from "./Home";
import "./Body.css";

/**
 * The main component for the body of the app.
 */
const Body = () => {
  /**
   * Gets the current route from the URL.
   */
  const [location] = useLocation();

  /**
   * The base title of the page.
   */
  const basePageTitle = "jontools";

  /**
   * A list of registered routes and their corresponding titles.
   */
  const registeredRoutes: {
    [key: string]: { pageTitle: string; component: JSX.Element };
  } = {
    "/": { pageTitle: basePageTitle, component: <Home /> },
    "/midi-inverter": {
      pageTitle: basePageTitle + " - MIDI Inverter",
      component: <Inverter />,
    },
    "/midi-transformer": {
      pageTitle: basePageTitle + " - MIDI Transformer",
      component: <Transformer />,
    },
  };

  /**
   * Changes the title of the page based on the current route.
   */
  useEffect(() => {
    document.title =
      registeredRoutes[location]?.pageTitle ||
      basePageTitle + " - Page Not Found";
  }, [location]);

  /**
   * Determines whether a page should be visible based on the current route.
   * Returns an empty string (visible) if the route matches, or "hidden" if it doesn't.
   * This allows for a simple way for pages to persist their state, preventing unmounting between route changes
   *   while avoiding hook prop drilling.
   */
  const getPageVisibility = (route: string): string => {
    return location === route ? "" : "hidden";
  };

  /**
   * Determines whether the Invalid URLpage should be visible based on the current route.
   * Returns an empty string (visible) if the route isn't in the registered list, or "hidden" if it is.
   */
  const getInvalidUrlPageVisibility = !Object.keys(registeredRoutes).includes(
    location
  )
    ? ""
    : "hidden";

  /**
   * Ensures the body fills the entire height of the page remaining other than the header and footer.
   */
  const fadeContainerStyling: React.CSSProperties = {
    display: "inline-flex",
    flex: 1,
  };

  return (
    <div className="body__outer-container">
      <FadeContainerDynamic
        fadeTriggers={location}
        customStyles={fadeContainerStyling}
      >
        <div className="body__inner-container">
          {/* Conditionally render the page based on the current route */}
          {Object.keys(registeredRoutes).includes(location) ? (
            <div className={getPageVisibility(location)}>
              {registeredRoutes[location].component}
            </div>
          ) : (
            <div className={getInvalidUrlPageVisibility}>
              <InvalidUrl />
            </div>
          )}
        </div>
      </FadeContainerDynamic>
    </div>
  );
};

export default Body;
