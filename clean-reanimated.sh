#!/bin/bash

echo "Cleaning React Native Reanimated caches..."

# Remove Reanimated build artifacts
rm -rf android/app/src/main/jniLibs/
rm -rf node_modules/react-native-reanimated/android/build/
rm -rf android/app/build/generated/source/codegen/

# Clear the metro cache
rm -rf $TMPDIR/metro-*
yarn start --reset-cache &
sleep 5
pkill -f "metro"

echo "Reanimated caches cleaned successfully!"
echo "Now you can run 'yarn android-fast' again for a fresh build." 