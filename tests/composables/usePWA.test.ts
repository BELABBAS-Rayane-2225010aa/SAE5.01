import { usePWA } from "@/composables/usePWA"
import {describe, expect, it, vi} from "vitest"

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
  return vi.fn().mockImplementation((query: string) => ({
    matches: matches, // This is where the true/false value comes from
    media: query,
    addListener: vi.fn(),  // Deprecated, but needed for compatibility
    removeListener: vi.fn(), // Deprecated, but needed for compatibility
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};


describe('usePWA', () => {
  it('should return true if the app is in standalone mode', () => {
    // Mock window.matchMedia to return true for standalone mode
    window.matchMedia = mockMatchMedia(true);

    // Use the usePWA function and check the result
    const { checkIfPWAIsUsed } = usePWA();
    const result = checkIfPWAIsUsed();

    // Expect that the function returns true for standalone mode
    expect(result).toBe(true);
  });

  it('should return false if the app is not in standalone mode', () => {
    // Mock window.matchMedia to return false for standalone mode
    window.matchMedia = mockMatchMedia(false);

    // Use the usePWA function and check the result
    const { checkIfPWAIsUsed } = usePWA();
    const result = checkIfPWAIsUsed();

    // Expect that the function returns false when not in standalone mode
    expect(result).toBe(false);
  });
});
