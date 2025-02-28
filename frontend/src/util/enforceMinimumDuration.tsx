/**
 * This function ensures a minimum loading time for aesthetics' sake.
 *
 * To use, create a Date() startTime before an async call.
 * After awaiting the call, await this function, passing in the startTime.
 * This will calculate the current time as the end time and calculate the amount of time the call took in ms.
 * - If the minimum duration has passed, the promise will immediately resolve.
 * - If the minimum duration has not passed, the promise will resolve once the minimum duration has passed.
 */
const enforceMinimumDuration = async (startTime: Date): Promise<null> => {
  const minCallDuration = 1000;

  const endTime = new Date();
  const runTime = endTime.getTime() - startTime.getTime();
  const remainingTime =
    minCallDuration - runTime < 0 ? 0 : minCallDuration - runTime;

  return new Promise((resolve) => {
    setTimeout(() => resolve(null), remainingTime);
  });
};

export default enforceMinimumDuration;
