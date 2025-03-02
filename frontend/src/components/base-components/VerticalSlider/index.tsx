import "./VerticalSlider.css";
import { FC } from "react";

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  labelOne?: string;
  labelTwo?: string;
};

/**
 * A component that renders a vertical slider with customizable min, max, and current value.
 */
const VerticalSlider: FC<Props> = ({
  min,
  max,
  value,
  onChange,
  labelOne,
  labelTwo,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="vertical-slider__container">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="vertical-slider__input"
      />
      {labelOne && <div>{labelOne}</div>}
      {labelTwo && <div>{labelTwo}</div>}
    </div>
  );
};

export default VerticalSlider;
