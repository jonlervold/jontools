import { LrmsSignalOptions } from "../types/LrmsSignalOptions";

/**
 * Responsible for extracting L, C, and R signals from the stereo input signal,
 * controlling the volume of each of those signals,
 * and then reconstructing the stereo signal from the L, C, and R signals.
 */
class AdvancedAudioPlayerSvc {
  static FIRST_OUTPUT_CHANNEL_OF_SOURCE = 0;
  static LEFT_INPUT_OF_DESTINATION = 0;
  static RIGHT_INPUT_OF_DESTINATION = 1;

  // The audio element on the page, source audio is extracted from this
  audioElementRef: React.RefObject<HTMLAudioElement>;
  // The audio context is used to manipulate the source audio and then output the final signal
  audioContext: AudioContext;

  // The source left and right signals are used to feed the Mid/Side extractions
  sourceLeftSignal: GainNode;
  sourceRightSignal: GainNode;

  // The output signals are used to feed the final output
  outputLeftSignal: GainNode;
  outputRightSignal: GainNode;
  outputMidSignal: GainNode;
  outputSideSignal: GainNode;

  /**
   * Initializes the service
   */
  constructor(audioElementRef: React.RefObject<HTMLAudioElement>) {
    this.audioElementRef = audioElementRef;
    this.audioContext = new AudioContext();

    this.sourceLeftSignal = this.audioContext.createGain();
    this.sourceRightSignal = this.audioContext.createGain();

    this.outputLeftSignal = this.audioContext.createGain();
    this.outputRightSignal = this.audioContext.createGain();
    this.outputMidSignal = this.audioContext.createGain();
    this.outputSideSignal = this.audioContext.createGain();

    this.extractLeftAndRightSignals()
      .extractMidSignal()
      .extractSideSignal()
      .connectToOutput()
      .playSignal("original");
  }

  /**************************
   * INITIALIZATION METHODS *
   **************************/

  /**
   * Extracts the L and R signals from the source audio
   * These signals are used to feed the Mid/Side extractions as well as the final output
   */
  extractLeftAndRightSignals = () => {
    if (!this.audioElementRef.current) {
      throw new Error("Missing Audio Element Ref");
    }

    // Split the source into L & R signals
    const sourceSignal = this.audioContext.createMediaElementSource(
      this.audioElementRef.current
    );
    const splitter = this.audioContext.createChannelSplitter(2);
    sourceSignal.connect(splitter);

    // Connect L & R to the SOURCE signal variables to feed the Mid/Side extractions
    splitter.connect(
      this.sourceLeftSignal,
      AdvancedAudioPlayerSvc.LEFT_INPUT_OF_DESTINATION
    );
    splitter.connect(
      this.sourceRightSignal,
      AdvancedAudioPlayerSvc.RIGHT_INPUT_OF_DESTINATION
    );

    // Connect L & R to the OUTPUT signal variables to feed the final output
    splitter.connect(
      this.outputLeftSignal,
      AdvancedAudioPlayerSvc.LEFT_INPUT_OF_DESTINATION
    );
    splitter.connect(
      this.outputRightSignal,
      AdvancedAudioPlayerSvc.RIGHT_INPUT_OF_DESTINATION
    );

    return this;
  };

  /**
   * Extracts the Mid signal from the source L and R signals
   * Sums L and R, dividing each by 2 to maintain original volume
   */
  extractMidSignal = () => {
    const midMerger = this.audioContext.createChannelMerger(1);

    const midLeftGain = this.audioContext.createGain();
    const midRightGain = this.audioContext.createGain();
    midLeftGain.gain.value = 0.5;
    midRightGain.gain.value = 0.5;

    this.sourceLeftSignal.connect(midLeftGain);
    this.sourceRightSignal.connect(midRightGain);

    midLeftGain.connect(midMerger);
    midRightGain.connect(midMerger);

    midMerger.connect(this.outputMidSignal);

    return this;
  };

  /**
   * Extracts the Side signal from the source L and R signals
   * Sums L and inverted R, dividing each by 2 to maintain original volume
   */
  extractSideSignal = () => {
    const sideMerger = this.audioContext.createChannelMerger(1);

    const sideLeftGain = this.audioContext.createGain();
    const sideRightGain = this.audioContext.createGain();
    sideLeftGain.gain.value = 0.5;
    sideRightGain.gain.value = -0.5;

    this.sourceLeftSignal.connect(sideLeftGain);
    this.sourceRightSignal.connect(sideRightGain);

    sideLeftGain.connect(sideMerger);
    sideRightGain.connect(sideMerger);

    sideMerger.connect(this.outputSideSignal);

    return this;
  };

  /**
   * Sends the output signals to the output
   */
  connectToOutput = () => {
    // These can be directly connected due to being mono signals
    this.outputMidSignal.connect(this.audioContext.destination);
    this.outputSideSignal.connect(this.audioContext.destination);

    // These need to be merged due to being one stereo signal
    // Puts L on L side and R on R side
    const lrMerger = this.audioContext.createChannelMerger(2);
    this.outputLeftSignal.connect(
      lrMerger,
      AdvancedAudioPlayerSvc.FIRST_OUTPUT_CHANNEL_OF_SOURCE,
      AdvancedAudioPlayerSvc.LEFT_INPUT_OF_DESTINATION
    );
    this.outputRightSignal.connect(
      lrMerger,
      AdvancedAudioPlayerSvc.FIRST_OUTPUT_CHANNEL_OF_SOURCE,
      AdvancedAudioPlayerSvc.RIGHT_INPUT_OF_DESTINATION
    );
    lrMerger.connect(this.audioContext.destination);

    return this;
  };

  /*******************
   * UTILITY METHODS *
   *******************/

  /**
   * Checks if the audio is currently playing
   */
  isPlaying = (): boolean => {
    if (!this.audioElementRef.current) {
      throw new Error("Missing Audio Element Ref");
    }

    return !this.audioElementRef.current.paused;
  };

  /************************
   * USER CONTROL METHODS *
   ************************/

  /**
   * Updates the audio path of the audio element
   * The regular 'audioPath' prop of the AudioPlayer component can't update in real time
   * Used when the user uploads a new file
   */
  updateAudioPath = (audioPath: string) => {
    if (!this.audioElementRef.current) {
      throw new Error("Missing Audio Element Ref");
    }

    this.audioElementRef.current.src = audioPath;
  };

  /**
   * Resumes the audio context if it is suspended
   * Used when the user pushes the play button
   * Required due to browser autoplay restrictions
   */
  resumeAudioContext = () => {
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  };

  /**
   * Mutes the volume of all non-selected signals and unmutes the selected signal
   */
  playSignal = (signalToPlay: LrmsSignalOptions) => {
    this.outputLeftSignal.gain.value = 0;
    this.outputRightSignal.gain.value = 0;
    this.outputMidSignal.gain.value = 0;
    this.outputSideSignal.gain.value = 0;

    // Set the gain of the selected signal
    switch (signalToPlay) {
      case "original":
        this.outputLeftSignal.gain.value = 1;
        this.outputRightSignal.gain.value = 1;
        break;
      case "left":
        this.outputLeftSignal.gain.value = 1;
        break;
      case "right":
        this.outputRightSignal.gain.value = 1;
        break;
      case "mid":
        this.outputMidSignal.gain.value = 1;
        break;
      case "side":
        this.outputSideSignal.gain.value = 1;
        break;
    }
  };

  playFromSelectedTime = (
    startTimeMinutes: number,
    startTimeSeconds: number
  ) => {
    if (!this.audioElementRef.current) {
      throw new Error("Missing Audio Element Ref");
    }

    const startTime = startTimeMinutes * 60 + startTimeSeconds;
    this.audioElementRef.current.currentTime = startTime;
    this.resumeAudioContext();
    this.audioElementRef.current.play();
  };

  setPlaybackSpeed = (speed: number) => {
    if (!this.audioElementRef.current) {
      throw new Error("Missing Audio Element Ref");
    }

    this.audioElementRef.current.playbackRate = speed;
  };
}

export default AdvancedAudioPlayerSvc;
