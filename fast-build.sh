#!/bin/bash

echo "Starting optimized Android build process..."

# Set environment variable to disable auto-linking temporarily
export SKIP_PREFLIGHT_CHECK=true

# Stop any running React Native server
pkill -f "metro" || true

# Clean essential build files without full rebuild
rm -rf android/app/build/intermediates
rm -rf android/app/build/generated/source/codegen
rm -rf android/app/src/main/jniLibs
rm -rf node_modules/react-native-reanimated/android/build/
rm -rf $TMPDIR/metro-*

# Start the Metro bundler in the background
yarn start --reset-cache &
METRO_PID=$!

# Give Metro time to start up
sleep 5

# Run the build with optimized flags
cd android && ./gradlew assembleDebug --max-workers=4 --parallel --configure-on-demand
BUILD_RESULT=$?

# Kill Metro when done
kill $METRO_PID

# Check if build was successful
if [ $BUILD_RESULT -eq 0 ]; then
  echo "Build completed successfully!"
  echo "Now running on device..."
  ./gradlew installDebug
  cd .. && react-native start
else
  echo "Build failed with error code $BUILD_RESULT"
  echo "Try running 'yarn clean-reanimated' and then 'yarn android' instead."
fi 