import React from 'react';
import { type StyleProp, type ImageStyle } from 'react-native';
import { Image } from 'expo-image';

type ContentFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

interface OptimizedImageProps {
  source: string;
  style?: StyleProp<ImageStyle>;
  contentFit?: ContentFit;
  placeholder?: string;
  transition?: number;
  testID?: string;
  accessibilityLabel?: string;
}

/**
 * Optimized image component using expo-image.
 * Features: disk/memory caching, blurhash placeholders, smooth transitions.
 */
export const OptimizedImage = ({
  source,
  style,
  contentFit = 'cover',
  placeholder,
  transition = 200,
  testID,
  accessibilityLabel,
}: OptimizedImageProps) => {
  return (
    <Image
      source={source}
      style={style}
      contentFit={contentFit}
      placeholder={placeholder}
      transition={transition}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      cachePolicy="memory-disk"
    />
  );
};
