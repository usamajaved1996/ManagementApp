#!/bin/bash

echo "Starting optimized React Native development environment..."

# Kill any running metro instances
pkill -f "metro" || true

# Clear the react-native cache
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
watchman watch-del-all 2>/dev/null || true

# Increase max file watchers if needed
if [[ "$(uname)" == "Darwin" ]]; then
  # For macOS
  current=$(sysctl kern.maxfiles | awk '{print $2}')
  if [[ $current -lt 524288 ]]; then
    echo "Increasing file watch limits for better performance..."
    sudo sysctl -w kern.maxfiles=524288 >/dev/null 2>&1 || echo "Failed to increase kern.maxfiles (you may need sudo)"
    sudo sysctl -w kern.maxfilesperproc=524288 >/dev/null 2>&1 || echo "Failed to increase kern.maxfilesperproc (you may need sudo)"
  fi
fi

# Start the React Native packager with optimized settings
REACT_NATIVE_MAX_WORKERS=4 yarn start --reset-cache 