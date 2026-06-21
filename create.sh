#!/bin/bash
set -euo pipefail

# ------------------------------------------------------------------
# create.sh — Create a new project from the ReactNativeTemplate
#
# Usage:
#   ./create.sh <project-name> <destination-path> <package-namespace>
#
# Example:
#   ./create.sh MyApp ~/Projects/MyApp com.mycompany.myapp
#
# Arguments:
#   project-name      PascalCase name for the app (e.g., MyApp)
#   destination-path  Absolute or relative path where the project
#                     should be created
#   package-namespace Java/Kotlin package + iOS bundle ID
#                     (e.g., com.mycompany.myapp)
# ------------------------------------------------------------------

if [ $# -ne 3 ]; then
  echo "Usage: $0 <project-name> <destination-path> <package-namespace>"
  echo ""
  echo "Examples:"
  echo "  $0 MyApp ~/Projects/MyApp com.mycompany.myapp"
  echo "  $0 MyApp ./MyApp com.example.myapp"
  exit 1
fi

NEW_NAME="$1"
DEST_PATH="${2%/}"
NAMESPACE="$3"

TEMPLATE_DIR="$(cd "$(dirname "$0")" && pwd)"
OLD_NAME="ReactNativeTemplate"
OLD_NAMESPACE="com.reactnativetemplate"
OLD_SLUG="reactnativetemplate"
NEW_SLUG="$(echo "$NEW_NAME" | tr '[:upper:]' '[:lower:]')"

# ------------------------------------------------------------------
# Validation
# ------------------------------------------------------------------
if [ -d "$DEST_PATH" ]; then
  echo "Error: Destination path already exists: $DEST_PATH"
  exit 1
fi

if ! echo "$NEW_NAME" | grep -qE '^[A-Z][A-Za-z0-9]+$'; then
  echo "Error: Project name must be PascalCase (e.g., MyApp, BigProject2)"
  exit 1
fi

if ! echo "$NAMESPACE" | grep -qE '^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$'; then
  echo "Error: Package namespace must be valid (e.g., com.mycompany.myapp)"
  exit 1
fi

echo "Creating project '$NEW_NAME' at '$DEST_PATH'"
echo "  Package: $NAMESPACE"
echo ""

# ------------------------------------------------------------------
# Step 1: Copy template to destination (exclude build artifacts)
# ------------------------------------------------------------------
echo "[1/5] Copying template..."
mkdir -p "$DEST_PATH"
rsync -a \
  --exclude='node_modules' \
  --exclude='ios/Pods' \
  --exclude='ios/build' \
  --exclude='android/.gradle' \
  --exclude='android/app/build' \
  --exclude='android/build' \
  --exclude='*.lock' \
  --exclude='create.sh' \
  "$TEMPLATE_DIR/" "$DEST_PATH/"

# ------------------------------------------------------------------
# Step 2: Rename files and directories
# ------------------------------------------------------------------
echo "[2/5] Renaming files and directories..."

# iOS directories (rename bottom-up to avoid path breakage)
# The order matters: schemes inside xcodeproj, then xcodeproj/xcworkspace
if [ -d "$DEST_PATH/ios/$OLD_NAME.xcodeproj/xcshareddata/xcschemes/$OLD_NAME.xcscheme" ]; then
  mv "$DEST_PATH/ios/$OLD_NAME.xcodeproj/xcshareddata/xcschemes/$OLD_NAME.xcscheme" \
     "$DEST_PATH/ios/$OLD_NAME.xcodeproj/xcshareddata/xcschemes/$NEW_NAME.xcscheme"
fi

if [ -d "$DEST_PATH/ios/$OLD_NAME.xcodeproj" ]; then
  mv "$DEST_PATH/ios/$OLD_NAME.xcodeproj" "$DEST_PATH/ios/$NEW_NAME.xcodeproj"
fi

if [ -d "$DEST_PATH/ios/$OLD_NAME.xcworkspace" ]; then
  mv "$DEST_PATH/ios/$OLD_NAME.xcworkspace" "$DEST_PATH/ios/$NEW_NAME.xcworkspace"
fi

if [ -d "$DEST_PATH/ios/$OLD_NAME" ]; then
  mv "$DEST_PATH/ios/$OLD_NAME" "$DEST_PATH/ios/$NEW_NAME"
fi

# Android package directories
OLD_PACKAGE_PATH="$(echo "$OLD_NAMESPACE" | tr '.' '/')"
NEW_PACKAGE_PATH="$(echo "$NAMESPACE" | tr '.' '/')"

for variant_dir in main; do
  src_dir="$DEST_PATH/android/app/src/$variant_dir/java"
  old_android_dir="$src_dir/$OLD_PACKAGE_PATH"
  new_android_dir="$src_dir/$NEW_PACKAGE_PATH"

  if [ -d "$old_android_dir" ]; then
    mkdir -p "$(dirname "$new_android_dir")"
    mv "$old_android_dir" "$new_android_dir"
    # Remove old empty parent dirs (e.g., com/reactnativetemplate → com/ may be empty)
    # We leave cleanup — the old leaf dir was moved, so parent dirs remain
  fi
done

# ------------------------------------------------------------------
# Step 3: Replace content in all text files
# ------------------------------------------------------------------
echo "[3/5] Replacing template strings in project files..."

replace_in_files() {
  local pattern="$1"
  local replacement="$2"
  LC_ALL=C grep -rIl "$pattern" \
    "$DEST_PATH" \
    --exclude-dir='.git' \
    --exclude-dir='.yarn' \
    --exclude-dir='node_modules' \
    --exclude-dir='Pods' \
    --exclude-dir='build' \
    --exclude-dir='.gradle' \
    --exclude='*.png' \
    --exclude='*.jpg' \
    --exclude='*.jpeg' \
    --exclude='*.gif' \
    --exclude='*.ico' \
    --exclude='*.icns' \
    --exclude='*.jar' \
    --exclude='*.keystore' \
    --exclude='*.lock' \
    --exclude='*.pbxproj' \
    2>/dev/null | while IFS= read -r file; do
    LC_ALL=C sed -i '' "s/$pattern/$replacement/g" "$file"
  done
}

# First handle the pbxproj separately (it's big, but sed can handle it)
find "$DEST_PATH/ios" -name 'project.pbxproj' -exec env LC_ALL=C sed -i '' "s/$OLD_NAME/$NEW_NAME/g" {} +
find "$DEST_PATH/ios" -name '*.xcscheme' -exec env LC_ALL=C sed -i '' "s/$OLD_NAME/$NEW_NAME/g" {} +
find "$DEST_PATH/ios" -name '*.xcworkspacedata' -exec env LC_ALL=C sed -i '' "s/$OLD_NAME/$NEW_NAME/g" {} +

# Replace project name in all text files
replace_in_files "$OLD_NAME" "$NEW_NAME"

# Replace old namespace with new namespace
replace_in_files "$OLD_NAMESPACE" "$NAMESPACE"

# Replace old slug with new slug (lowercase version of new name)
replace_in_files "$OLD_SLUG" "$NEW_SLUG"

# Also replace Pods-OLD_NAME / Pods_OLD_NAME patterns in pbxproj
find "$DEST_PATH/ios" -name 'project.pbxproj' -exec env LC_ALL=C sed -i '' "s/Pods-$OLD_NAME/Pods-$NEW_NAME/g" {} +
find "$DEST_PATH/ios" -name 'project.pbxproj' -exec env LC_ALL=C sed -i '' "s/Pods_$OLD_NAME/Pods_$NEW_NAME/g" {} +

# ------------------------------------------------------------------
# Step 4: Clean up generated/build artifacts
# ------------------------------------------------------------------
echo "[4/5] Cleaning up..."

# Remove generated files that reference old names
rm -rf "$DEST_PATH/android/app/build"
rm -rf "$DEST_PATH/android/.gradle"
rm -rf "$DEST_PATH/android/app/.cxx"
rm -rf "$DEST_PATH/ios/Pods"
rm -rf "$DEST_PATH/node_modules"
rm -f "$DEST_PATH/yarn.lock"

# ------------------------------------------------------------------
# Step 5: Summary
# ------------------------------------------------------------------
echo "[5/5] Done!"
echo ""
echo "Project created at: $DEST_PATH"
echo ""
echo "Next steps:"
echo "  cd $DEST_PATH"
echo "  yarn install"
echo "  npx pod-install        # iOS only - links native modules"
echo "  npx react-native run-ios    # or run-android"
echo ""
echo "Note:"
echo "  - Android package: $NAMESPACE"
echo "  - iOS bundle ID: $NAMESPACE"
echo "  - App name: $NEW_NAME"
echo ""
