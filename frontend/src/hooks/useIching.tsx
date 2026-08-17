import { formatReadingExport, castIchingReading } from "../util/iching";
import { IchingReading } from "../types/Iching";
import { useCheckbox } from "./base-component-hooks/useCheckbox";
import saveFile from "../util/saveFile";
import { useState } from "react";

/**
 * A hook that manages the state of the I Ching reading feature.
 */
export const useIching = () => {
  /***************
   * HELP TOGGLE *
   ***************/
  const { isChecked: showHelp, handleToggleCheckbox: handleShowHelpClick } =
    useCheckbox(false);

  /************
   * QUESTION *
   ************/
  const [question, setQuestion] = useState<string>("");

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestion(event.target.value);
  };

  /***********
   * READING *
   ***********/
  const [reading, setReading] = useState<IchingReading | null>(null);

  const handleCast = () => {
    setReading(castIchingReading(question));
  };

  const handleReset = () => {
    setQuestion("");
    setReading(null);
  };

  const handleExport = () => {
    if (!reading) return;

    const text = formatReadingExport(reading);
    const filename = `iching-reading-${reading.castAt.slice(0, 10)}.txt`;
    saveFile(new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
  };

  return {
    showHelp,
    handleShowHelpClick,
    question,
    handleQuestionChange,
    reading,
    handleCast,
    handleReset,
    handleExport,
  };
};
