import { EXTRA_LARGE_SPACING, MEDIUM_SPACING } from '@/theme/style';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * When changing any of the constants, make sure to test a variety of devices, e.g.:
 *
 * iPhone SE (3rd generation) - Small screen, no notch
 * iPhone 15 - Large screen, large rounded corners, notch
 * iPad Pro 11-inch (3rd generation) - Large screen, small rounded corners but no notch
 * Various Android phones
 *
 * Be sure to test in both portrait and landscape mode on a variety of screens.
 *
 * Tested on these devices
 * - iPhone 15 Pro
 * - iPad Pro 11-inch
 * - Pixel Tablet 10-inch 2560x1600
 * - Small Android phone 4.65 720x1280
 */
export const MAX_CONTENT_WIDTH = 672; // max width of the content, beyond which it will be centered

const PADDING_HORIZONTAL_LANDSCAPE_MIN = 56; // min horizontal spacing including the notch
const PADDING_HORIZONTAL_LANDSCAPE_EXTRA = 0; // horizontal spacing beyond the notch (if any)
const PADDING_HORIZONTAL_PORTRAIT = MEDIUM_SPACING; // horizontal spacing beyond the notch (if any)

const PADDING_TOP_LANDSCAPE_MIN = EXTRA_LARGE_SPACING; // min top spacing including the notch (if any)
const PADDING_TOP_LANDSCAPE_EXTRA = EXTRA_LARGE_SPACING; // top spacing beyond the notch (if any)
const PADDING_TOP_PORTRAIT_MIN = 48; // min top spacing including the notch
const PADDING_TOP_PORTRAIT_EXTRA = MEDIUM_SPACING; // top spacing beyond the notch (if any)

const PADDING_BOTTOM_LANDSCAPE_MIN = EXTRA_LARGE_SPACING; // min bottom spacing including the notch (if any)
const PADDING_BOTTOM_LANDSCAPE_EXTRA = EXTRA_LARGE_SPACING; // padding spacing including the notch (if any)
const PADDING_BOTTOM_PORTRAIT_MIN = EXTRA_LARGE_SPACING; // min bottom spacing including the notch
const PADDING_BOTTOM_PORTRAIT_EXTRA = 0; // bottom spacing beyond the notch (if any)

export const usePadding = (ignoreMaxWidth = false) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLandscape = width >= height;

  let paddingLeft = isLandscape
    ? Math.max(
        PADDING_HORIZONTAL_LANDSCAPE_MIN,
        insets.left + PADDING_HORIZONTAL_LANDSCAPE_EXTRA,
      )
    : PADDING_HORIZONTAL_PORTRAIT;
  let paddingRight = isLandscape
    ? Math.max(
        PADDING_HORIZONTAL_LANDSCAPE_MIN,
        insets.right + PADDING_HORIZONTAL_LANDSCAPE_EXTRA,
      )
    : PADDING_HORIZONTAL_PORTRAIT;
  const paddingTop = isLandscape
    ? Math.max(
        PADDING_TOP_LANDSCAPE_MIN,
        insets.top + PADDING_TOP_LANDSCAPE_EXTRA,
      )
    : Math.max(
        PADDING_TOP_PORTRAIT_MIN,
        insets.top + PADDING_TOP_PORTRAIT_EXTRA,
      );
  const paddingBottom = isLandscape
    ? Math.max(
        PADDING_BOTTOM_LANDSCAPE_MIN,
        insets.bottom + PADDING_BOTTOM_LANDSCAPE_EXTRA,
      )
    : Math.max(
        PADDING_BOTTOM_PORTRAIT_MIN,
        insets.bottom + PADDING_BOTTOM_PORTRAIT_EXTRA,
      );

  // Adjust left/right padding for max content width
  if (!ignoreMaxWidth)
    paddingLeft = Math.max(paddingLeft, (width - MAX_CONTENT_WIDTH) / 2);
  if (!ignoreMaxWidth)
    paddingRight = Math.max(paddingRight, (width - MAX_CONTENT_WIDTH) / 2);

  const containerStyles = {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  };

  return {
    containerStyles,
  };
};
