const preset = require('@react-native/jest-preset');

module.exports = {
  ...preset,
  setupFilesAfterEnv: [
    ...(preset.setupFilesAfterEnv || []),
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|@react-native-firebase|@react-native-community|@react-native-async-storage|react-native-feather|react-native-svg|react-native-safe-area-context|react-native-screens)/)',
  ],
};
