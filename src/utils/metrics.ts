import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const fontScale = (size: number = 1, screenWidth: number = width) =>(size * screenWidth * 0.037) / 14;


//font scaling responsive for all devices
const font = fontHeight => {
  // Parse string percentage input and convert it to number.
  const elemHeight = typeof fontHeight === "number" ? fontHeight : parseFloat(fontHeight);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(height * elemHeight / 100);
};

/**
 * fontSize is reusable for common fontscale with different sizes
 */
const fontSize={
  px8:font(1),
  px10:font(1.2),
  px12:font(1.5),
  px13:font(1.65),
  px14:font(1.8),
  px16:font(1.9),
  px17:font(2),
  px18:font(2.2),
  px20:font(2.5),
  px21:font(2.65),
  px22:font(2.8),
  px24:font(3),
  px26:font(3.2),
  px28:font(3.4),
  px30:font(3.6),
  px32:font(4),
  px34:font(4.2),
  px36:font(4.4),
  px38:font(4.6),
}

export { horizontalScale, verticalScale, moderateScale, fontScale, width ,height, font,fontSize};
