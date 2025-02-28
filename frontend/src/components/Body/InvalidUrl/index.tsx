import { FC } from "react";

/**
 * A component that renders an error message for invalid URLs.
 */
const InvalidUrl: FC = () => {
  return (
    <div>
      This URL does not exist on jontools. Try one of the links above instead.
    </div>
  );
};

export default InvalidUrl;
