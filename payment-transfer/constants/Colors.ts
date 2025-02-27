/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  primary: '#3b5aff',
  background: '#f3f7fb',
  backgroundSection: '#f6efec',
  success: '#37c8c2',
  disabled: '#c0c0c0',
  warning: '#d62828',
  darkGrey: '#555',
  midDarkGrey: '#757575',
  midLightGrey: '#bdbdbd',
  lightGrey: '#e0e0e0',
  white: '#fff',
};
