/**
 * Provides a function to check if the app is running as a Progressive Web App (PWA).
 *
 * @returns {Object} An object containing the checkIfPWAIsUsed function.
 */
export const usePWA = () => {
  /**
   * Checks if the app is running in standalone mode (PWA).
   *
   * @returns {boolean} True if the app is in standalone mode, otherwise false.
   */
  const checkIfPWAIsUsed = () => {
    let displayMode = "browser tab";
    if (window.matchMedia("(display-mode: standalone)").matches) {
      displayMode = "standalone";
    }

    // Return true if the app is in standalone mode (PWA)
    return displayMode === "standalone";
  };

  // Return the checkIfPWAIsUsed function
  return { checkIfPWAIsUsed };
};