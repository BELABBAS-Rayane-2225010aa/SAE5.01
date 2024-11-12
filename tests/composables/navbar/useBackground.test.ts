import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import { useBackground } from '@/composables/navbar/useBackground'; // Adjust the path as necessary
import { useRoute } from 'vue-router';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('useBackground', () => {
  let navbar: Ref<HTMLElement | null>;

  beforeEach(() => {
    // Mock navbar element and its classList
    navbar = ref(document.createElement('div'));
    navbar.value!.classList.add = vi.fn();
    navbar.value!.classList.remove = vi.fn();

    // Set default route path to "/"
    (useRoute as unknown as () => { path: string }).mockReturnValue({ path: '/' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should add "navbar-scrolled" and other classes when scrolled down on non-home page', () => {
    (useRoute as unknown as () => { path: string }).mockReturnValue({ path: '/about' });
    const { changeBackground } = useBackground({ navbar });

    // Simulate scroll down
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 100, configurable: true });
    changeBackground();

    expect(navbar.value!.classList.add).toHaveBeenCalledWith(
      'navbar-scrolled',
      'bg-white',
      'dark:bg-black'
    );
  });

  it('should remove "navbar-scrolled" and other classes when scrolled to top on home page', () => {
    (useRoute as unknown as () => { path: string }).mockReturnValue({ path: '/' });
    const { changeBackground } = useBackground({ navbar });

    // Simulate scroll at the top
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, configurable: true });
    changeBackground();

    expect(navbar.value!.classList.remove).toHaveBeenCalledWith(
      'navbar-scrolled',
      'bg-white',
      'dark:bg-black'
    );
  });

  it('should add animation classes when scrolled on the home page', () => {
    (useRoute as unknown as () => { path: string }).mockReturnValue({ path: '/' });
    const { onScroll } = useBackground({ navbar });

    // Simulate window scroll
    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true });
    onScroll();

    expect(navbar.value!.classList.add).toHaveBeenCalledWith(
      'navbar-scrolled',
      'bg-white',
      'dark:bg-black',
      'animate__animated',
      'animate__fadeInDown',
      'animate__faster'
    );
  });

  it('should remove animation classes when scrolled back to top on the home page', () => {
    (useRoute as unknown as () => { path: string }).mockReturnValue({ path: '/' });
    const { onScroll } = useBackground({ navbar });

    // Simulate no scroll
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    onScroll();

    expect(navbar.value!.classList.remove).toHaveBeenCalledWith(
      'navbar-scrolled',
      'bg-white',
      'dark:bg-black',
      'animate__animated',
      'animate__fadeInDown',
      'animate__faster'
    );
  });
});
