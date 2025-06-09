const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const config = {
  resetCache: true,
};

const mergedConfig = mergeConfig(getDefaultConfig(__dirname), config);

// Wrap the merged config with Reanimated wrapper
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
