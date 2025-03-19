// const { getDefaultConfig } = require('expo/metro-config')
const { getSentryExpoConfig } = require('@sentry/react-native/metro')
const { withNativeWind } = require('nativewind/metro')

// const config = getDefaultConfig(__dirname)
const config = getSentryExpoConfig(__dirname)
config.resolver.sourceExts.push('cjs')

module.exports = withNativeWind(config, { input: './global.css' })
