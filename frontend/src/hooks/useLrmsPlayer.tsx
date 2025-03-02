import { useUploadFileList } from "./base-component-hooks/useUploadFileList";
import { useErrorReadout } from "./base-component-hooks/useErrorReadout";
import AdvancedAudioPlayerSvc from "../svc/AdvancedAudioPlayerSvc";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCheckbox } from "./base-component-hooks/useCheckbox";
import { LrmsSignalOptions } from "../types/LrmsSignalOptions";

const useLrmsPlayer = () => {
  /****************
   * AUDIO PLAYER *
   ****************/

  // React Strict mode causes the the component to double render,
  // causing issues when the audio context is created twice.
  // This is a workaround to prevent that from happening.
  const isFirstRender = useRef(true);

  // The source audio comes from the audio element on the page.
  const audioElementRef = useRef<HTMLAudioElement>(new Audio());

  // The LRMS service extracts the left, right, mid, and side signals from the stereo signal
  // and controls the volume and pan of each of those signals.
  const advancedAudioPlayerSvc = useRef<AdvancedAudioPlayerSvc | null>(null);

  // On first render, create the LRMS service
  useEffect(() => {
    if (isFirstRender.current) {
      advancedAudioPlayerSvc.current = new AdvancedAudioPlayerSvc(
        audioElementRef
      );

      isFirstRender.current = false;
    }
  }, []);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const updateIsPlaying = () => {
    if (advancedAudioPlayerSvc.current) {
      setIsPlaying(advancedAudioPlayerSvc.current.isPlaying());
    }
  };

  // When the user clicks the play button, resume the audio context to play the audio
  const handlePlay = () => {
    advancedAudioPlayerSvc.current?.resumeAudioContext();
    audioElementRef.current?.play();
    updateIsPlaying();
  };

  // Items from this section needed on the template
  const audioPlayerTemplateItems = {
    isPlaying,
    audioElementRef,
    handlePlay,
  };

  /*******************
   * SIGNAL SELECTOR *
   *******************/

  // State for which signal to play
  const [selectedSignal, setSelectedSignal] = useState<string>("original");

  // Handler for when the user selects a different signal to play
  const handleSignalSelectionClick = (selector: string) => {
    setSelectedSignal(selector);
    advancedAudioPlayerSvc.current?.playSignal(selector as LrmsSignalOptions);
  };

  const signalSelectorTemplateItems = {
    selectedSignal,
    handleSignalSelectionClick,
  };

  /************************************
   * USE START TIME SELECTOR CHECKBOX *
   ************************************/
  // Handles use start time selector checkbox
  const {
    isChecked: useStartTimeSelector,
    resetCheckbox: resetUseStartTimeSelector,
    handleToggleCheckbox: handleUseStartTimeSelectorClick,
  } = useCheckbox(false);

  // Items from this section needed on the template
  const useStartTimeSelectorTemplateItems = {
    useStartTimeSelector,
    handleUseStartTimeSelectorClick,
  };

  /***********************
   * START FROM SELECTOR *
   ***********************/

  // State for the length of the audio
  const [lengthMinutes, setLengthMinutes] = useState<number>(0);
  const [lengthSeconds, setLengthSeconds] = useState<number>(0);

  // When metadata is loaded, set the length of the audio
  const handleLoadedMetadata = () => {
    const duration = audioElementRef.current.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    setLengthMinutes(minutes);
    setLengthSeconds(seconds);
    setSelectableSeconds(59);
  };

  // On initial load, add an event listener to the audio element to get the duration
  useEffect(() => {
    audioElementRef.current.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );
  }, []);

  // State for the number of seconds that can be selected,
  // which is 59 if the start time minutes is the same as the length minutes
  // otherwise it is the length seconds
  const [selectableSeconds, setSelectableSeconds] = useState<number>(0);

  // State for the selected start time
  const [startTimeMinutes, setStartTimeMinutes] = useState<number>(0);
  const [startTimeSeconds, setStartTimeSeconds] = useState<number>(0);

  // Handles when the user changes the start time dropdowns
  // Resets the seconds to 0 because the selectable seconds may change if they've selected the final minute
  const handleStartTimeMinutesChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(event.target.value);
    setStartTimeMinutes(value);
    setStartTimeSeconds(0);

    setSelectableSeconds(value === lengthMinutes ? lengthSeconds : 59);
  };

  // Handles when the user changes the seconds dropdown
  const handleStartTimeSecondsChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(event.target.value);
    setStartTimeSeconds(value);
  };

  const playFromSelectedTime = () => {
    advancedAudioPlayerSvc.current?.playFromSelectedTime(
      startTimeMinutes,
      startTimeSeconds
    );
  };

  const handlePause = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      updateIsPlaying();
    }
  };

  // Items from this section needed on the template
  const startFromTemplateItems = {
    lengthMinutes,
    lengthSeconds,
    startTimeMinutes,
    startTimeSeconds,
    handleStartTimeMinutesChange,
    handleStartTimeSecondsChange,
    selectableSeconds,
    playFromSelectedTime,
    handlePause,
  };

  /****************************************
   * USE PLAYBACK SPEED SELECTOR CHECKBOX *
   ****************************************/

  // Doesn't use checkbox hook due to needing custom handler.
  // Must reset playback speed to 1 when checkbox is unchecked.

  // Set playback speed checkbox state
  const [usePlaybackSpeedSelector, setUsePlaybackSpeedSelector] =
    useState<boolean>(false);

  // Changes set playback speed checkbox to opposite state
  const handleUsePlaybackSpeedSelectorChange = (): void => {
    setUsePlaybackSpeedSelector(!usePlaybackSpeedSelector);

    advancedAudioPlayerSvc.current?.setPlaybackSpeed(1);
    setPlaybackSpeed(1);
  };

  // Items from this section needed on the template
  const usePlaybackSpeedSelectorTemplateItems = {
    usePlaybackSpeedSelector,
    handleUsePlaybackSpeedSelectorChange,
  };

  /***************************
   * PLAYBACK SPEED SELECTOR *
   ***************************/

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const handlePlaybackSpeedChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const speedSelection = Number(event.target.value);
    setPlaybackSpeed(speedSelection);
    advancedAudioPlayerSvc.current?.setPlaybackSpeed(speedSelection);
  };

  const playbackSpeedSelectorTemplateItems = {
    playbackSpeed,
    handlePlaybackSpeedChange,
  };

  /*********************
   * LOADING INDICATOR *
   *********************/

  // Submission loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Items from this section needed on the template
  const loadingTemplateItems = {
    isLoading,
  };

  /*****************
   * ERROR MESSAGE *
   *****************/

  // Handles the error message and failures.
  const {
    failures,
    errorMessage,
    setErrorMessage,
    failuresDescription,
    handleCloseErrorModalClick,
  } = useErrorReadout();

  // Items from this section needed on the template
  const errorMessageTemplateItems = {
    failures,
    errorMessage,
    failuresDescription,
    handleCloseErrorModalClick,
  };

  /***************
   * HELP TOGGLE *
   ***************/
  // Toggle button functions the same as a basic checkbox
  const { isChecked: showHelp, handleToggleCheckbox: handleShowHelpClick } =
    useCheckbox(false);

  // Items from this section needed on the template
  const helpToggleTemplateItems = {
    showHelp,
    handleShowHelpClick,
  };

  /*******************************
   * UPLOAD FILE BUTTON AND LIST *
   *******************************/
  const maximumFileUploadCount = 1;
  // Handles the upload file button and list.
  const { uploadFiles, clearUploadFiles, handleUploadFilesChange } =
    useUploadFileList(setIsLoading, setErrorMessage, maximumFileUploadCount);

  // Updates the audio path of the audio element when a new file is uploaded
  useEffect(() => {
    const audioPath = uploadFiles?.[0]
      ? URL.createObjectURL(uploadFiles[0])
      : "";

    advancedAudioPlayerSvc.current?.updateAudioPath(audioPath);
    advancedAudioPlayerSvc.current?.setPlaybackSpeed(playbackSpeed);
    setLengthMinutes(0);
    setLengthSeconds(0);
    setStartTimeMinutes(0);
    setStartTimeSeconds(0);
    setSelectableSeconds(0);
    setIsPlaying(false);
  }, [uploadFiles]);

  // Items from this section needed on the template
  const uploadFileListTemplateItems = {
    uploadFiles,
    handleUploadFilesChange,
  };

  /****************
   * RESET BUTTON *
   ****************/
  // Clears the state of the files list
  const handleReset = (): void => {
    clearUploadFiles();
    setLengthMinutes(0);
    setLengthSeconds(0);
    setStartTimeMinutes(0);
    setStartTimeSeconds(0);
    setSelectableSeconds(0);
    setIsPlaying(false);
    setSelectedSignal("original");
    setPlaybackSpeed(1);
    setUsePlaybackSpeedSelector(false);
    resetUseStartTimeSelector();
  };

  // Items from this section needed on the template
  const resetButtonTemplateItems = {
    handleReset,
  };

  return {
    ...audioPlayerTemplateItems,
    ...signalSelectorTemplateItems,
    ...useStartTimeSelectorTemplateItems,
    ...startFromTemplateItems,
    ...usePlaybackSpeedSelectorTemplateItems,
    ...playbackSpeedSelectorTemplateItems,
    ...errorMessageTemplateItems,
    ...helpToggleTemplateItems,
    ...loadingTemplateItems,
    ...uploadFileListTemplateItems,
    ...resetButtonTemplateItems,
  };
};

export default useLrmsPlayer;
