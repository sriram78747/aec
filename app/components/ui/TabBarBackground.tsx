import BlurTabBarBackground from "./TabBarBackground.ios";

// This is a shim for web and Android where the tab bar is generally opaque.
export default BlurTabBarBackground;

export function useBottomTabOverflow() {
  return 0;
}
