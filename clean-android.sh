#!/bin/bash

echo "Cleaning Android build cache..."

# Stop any running React Native server
npx react-native --stop

# Remove build directories
rm -rf android/app/build
rm -rf android/.gradle
rm -rf android/build

# Clean Gradle cache
cd android && ./gradlew clean && cd ..

# Remove node_modules and reinstall (optional)
# rm -rf node_modules
# yarn install

echo "Android build cache cleaned successfully!"
echo "Now you can run 'yarn android' again for a fresh build." 