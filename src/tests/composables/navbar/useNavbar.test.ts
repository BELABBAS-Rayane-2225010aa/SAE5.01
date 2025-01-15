// FILE: tests/composables/useNavbar.spec.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NavbarState, Link } from "../../../composables/navbar/useNavbar";

describe("NavbarState", () => {
  let navbarState: NavbarState;

  beforeEach(() => {
    navbarState = new NavbarState(); // Initialize a new NavbarState for each test
  });

  it("should initialize with default properties", () => {
    expect(navbarState.isMenuOpen).toBe(false); // Menu should be closed by default
    expect(navbarState.refLinks).toEqual(navbarState.links); // refLinks should equal links initially
    expect(navbarState.links).toBeInstanceOf(Array); // Links should be an array
    expect(navbarState.subLinks).toBeInstanceOf(Array); // SubLinks should be an array
  });

  it("should toggle the menu state and update refLinks", () => {
    // Initially, menu is closed
    expect(navbarState.isMenuOpen).toBe(false);
    expect(navbarState.refLinks).toEqual(navbarState.links);

    // Toggle the menu to open
    navbarState.toggleMenu();
    expect(navbarState.isMenuOpen).toBe(true); // Menu should be open
    expect(navbarState.refLinks).toEqual(navbarState.links); // refLinks should still be links

    // Toggle the menu to close
    navbarState.toggleMenu();
    expect(navbarState.isMenuOpen).toBe(false); // Menu should be closed
    expect(navbarState.refLinks).toEqual([]); // refLinks should be empty
  });

  it("should switch to subLinks when toggleMenuWithSubLinks is called", () => {
    navbarState.toggleMenuWithSubLinks();
    expect(navbarState.refLinks).toEqual(navbarState.subLinks); // refLinks should now be subLinks
  });

  it("should return to main links when toggleBackMenuWithSubLinks is called", () => {
    // Start with subLinks
    navbarState.toggleMenuWithSubLinks();
    expect(navbarState.refLinks).toEqual(navbarState.subLinks);

    // Go back to main links
    navbarState.toggleBackMenuWithSubLinks();
    expect(navbarState.refLinks).toEqual(navbarState.links);
  });

  it("should notify observers when state changes", () => {
    const observer = vi.fn(); // Mock observer function
    navbarState.addObserver(observer);

    // Trigger state changes
    navbarState.toggleMenu();
    navbarState.toggleMenuWithSubLinks();
    navbarState.toggleBackMenuWithSubLinks();

    expect(observer).toHaveBeenCalledTimes(3); // Observer should be called for each state change
  });

  it("should allow adding multiple observers", () => {
    const observer1 = vi.fn();
    const observer2 = vi.fn();
    navbarState.addObserver(observer1);
    navbarState.addObserver(observer2);

    // Trigger state change
    navbarState.toggleMenu();

    expect(observer1).toHaveBeenCalled();
    expect(observer2).toHaveBeenCalled();
  });

  it("should not fail if there are no observers", () => {
    // Ensure no observers are added
    expect(navbarState.observers.length).toBe(0);

    // Trigger state change and ensure no errors occur
    expect(() => navbarState.toggleMenu()).not.toThrow();
    expect(() => navbarState.toggleMenuWithSubLinks()).not.toThrow();
    expect(() => navbarState.toggleBackMenuWithSubLinks()).not.toThrow();
  });

  it("should call onClick when defined in a link", () => {
    const onClickMock = vi.fn();
    const mockLink: Link = { name: "Test", onClick: onClickMock };

    // Call the onClick handler
    mockLink.onClick?.();

    expect(onClickMock).toHaveBeenCalled(); // Verify the onClick handler was called
  });

  it("should bind methods to the class instance", () => {
    // Ensure methods are bound to the instance
    const { toggleMenu, toggleMenuWithSubLinks, toggleBackMenuWithSubLinks } = navbarState;

    expect(() => toggleMenu()).not.toThrow();
    expect(() => toggleMenuWithSubLinks()).not.toThrow();
    expect(() => toggleBackMenuWithSubLinks()).not.toThrow();
  });
});
