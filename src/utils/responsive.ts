import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Detect device type
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;

  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  }

  return (
    (Platform.OS === 'ios' && (SCREEN_WIDTH >= 768 || SCREEN_HEIGHT >= 768)) ||
    (Platform.OS === 'android' && (SCREEN_WIDTH >= 600 || SCREEN_HEIGHT >= 600))
  );
};

export const isLandscape = () => SCREEN_WIDTH > SCREEN_HEIGHT;

// Scale size based on device
export const scaleSize = (size: number): number => {
  if (isTablet()) {
    return size * 1.5;
  }
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

// Scale font size
export const scaleFontSize = (size: number): number => {
  if (isTablet()) {
    return size * 1.3;
  }
  return size;
};

// Responsive width/height
export const wp = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

export const hp = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

// Get dimension values
export const dimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isTablet: isTablet(),
  isLandscape: isLandscape(),
};

// Responsive value selector
export const responsive = <T>(phone: T, tablet: T): T => {
  return isTablet() ? tablet : phone;
};
