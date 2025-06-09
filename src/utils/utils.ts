import { useWindowDimensions } from 'react-native';

/**
 * Function to convert date to full format - eg Thu, Jun 4, 2025
 */
export const formatFullDateWithComma = (rawDate: Date | string) => {
  const date = typeof rawDate === 'string' ? new Date(rawDate) : rawDate;

  if (isNaN(date.getTime())) {
    console.warn('Invalid date passed to formatFullDateWithComma:', rawDate);
    return '';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Function to check if device is in landscape/potrait
 */
export const useOrientation = (): 'portrait' | 'landscape' => {
  const { width, height } = useWindowDimensions();
  return width > height ? 'landscape' : 'portrait';
};