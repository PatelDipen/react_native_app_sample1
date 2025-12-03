import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import { isTablet, isLandscape, dimensions } from '@/utils/responsive';

interface ResponsiveState {
  width: number;
  height: number;
  isTablet: boolean;
  isLandscape: boolean;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    width: dimensions.width,
    height: dimensions.height,
    isTablet: dimensions.isTablet,
    isLandscape: dimensions.isLandscape,
  });

  useEffect(() => {
    const handleChange = ({ window }: { window: ScaledSize }) => {
      setState({
        width: window.width,
        height: window.height,
        isTablet: isTablet(),
        isLandscape: isLandscape(),
      });
    };

    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  return state;
};
