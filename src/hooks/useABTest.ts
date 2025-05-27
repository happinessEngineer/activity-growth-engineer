import { useCallback } from 'react';
import { getFlag } from '../utils/featureFlags';
import { track } from '../utils/analytics';

/**
 * Configuration for an A/B test
 * @template T - Type of the variant values (must be compatible with analytics tracking)
 */
type ABTestConfig<T extends string | number | boolean | null> = {
  /** Unique identifier for the A/B test */
  key: string;
  /** Variant values for A and B */
  variants: {
    a: T;
    b: T;
  };
  /** Whether to track impression events (default: true) */
  trackImpression?: boolean;
  /** Whether to track conversion events (default: true) */
  trackConversion?: boolean;
};

/**
 * Hook for running A/B tests with automatic tracking
 * @param config - A/B test configuration
 * @returns Object containing the current variant value and tracking functions
 * @throws Error if variant values are invalid or if tracking fails
 */
export function useABTest<T extends string | number | boolean | null>({ 
  key, 
  variants, 
  trackImpression: shouldTrackImpression = true, 
  trackConversion: shouldTrackConversion = true 
}: ABTestConfig<T>) {
  if (!key) throw new Error('A/B test key is required');
  if (!variants?.a || !variants?.b) throw new Error('Both variant values are required');

  const showVariantB = getFlag(key);
  const value = showVariantB ? variants.b : variants.a;

  const trackImpression = useCallback(() => {
    if (shouldTrackImpression) {
      try {
        track(`${key}_impression`, {
          variant: showVariantB ? "b" : "a",
          value,
        });
      } catch (error) {
        console.error(`Failed to track impression for ${key}:`, error);
      }
    }
  }, [key, showVariantB, value, shouldTrackImpression]);

  const trackConversion = useCallback(() => {
    if (shouldTrackConversion) {
      try {
        track(`${key}_conversion`, {
          variant: showVariantB ? "b" : "a",
          value,
        });
      } catch (error) {
        console.error(`Failed to track conversion for ${key}:`, error);
      }
    }
  }, [key, showVariantB, value, shouldTrackConversion]);

  return {
    value,
    variant: showVariantB ? "b" : "a",
    trackImpression,
    trackConversion
  };
} 