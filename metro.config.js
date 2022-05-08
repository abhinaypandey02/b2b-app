module.exports = {
  dependencies: {
    ...require('expo-dev-client/dependencies'),
  },
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
};
