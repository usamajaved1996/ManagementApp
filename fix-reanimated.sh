#!/bin/bash

echo "Fixing React Native Reanimated issues..."

# Clean metro cache
rm -rf $TMPDIR/metro-*

# Force reinstall reanimated (this often resolves issues)
yarn remove react-native-reanimated
yarn cache clean react-native-reanimated
yarn add react-native-reanimated@3.16.7

# Make sure the babel plugin is properly setup
if ! grep -q "react-native-reanimated/plugin" babel.config.js; then
  echo "Adding Reanimated babel plugin to babel.config.js"
  sed -i '' 's/module.exports = {/module.exports = {\n  plugins: ["react-native-reanimated\/plugin"],/' babel.config.js
fi

# Clean Android build files
./clean-reanimated.sh

echo "Reanimated fixed! Now building the app..."
yarn android-fast 