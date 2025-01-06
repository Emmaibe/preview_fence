const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('obj');
defaultConfig.resolver.assetExts.push('glb');
defaultConfig.resolver.assetExts.push('mtl');
defaultConfig.resolver.assetExts.push('bin');

module.exports = defaultConfig;