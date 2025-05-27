import { useCallback } from 'react';
import { getFlag } from '../utils/featureFlags';
import { track } from '../utils/analytics';

type ABTestConfig<T extends string | number | boolean | null> = {
  key: string;
  variants: {
    a: T;
    b: T;
  };
  trackImpression?: boolean;
  trackConversion?: boolean;
};

export function useABTest<T extends string | number | boolean | null>({ key, variants, trackImpression: shouldTrackImpression = true, trackConversion: shouldTrackConversion = true }: ABTestConfig<T>) {
  const showVariantB = getFlag(key);
  const value = showVariantB ? variants.b : variants.a;

  const trackImpression = useCallback(() => {
    if (shouldTrackImpression) {
      track(`${key}_impression`, {
        variant: showVariantB ? "b" : "a",
        value,
      });
    }
  }, [key, showVariantB, value, shouldTrackImpression]);

  const trackConversion = useCallback(() => {
    if (shouldTrackConversion) {
      track(`${key}_conversion`, {
        variant: showVariantB ? "b" : "a",
        value,
      });
    }
  }, [key, showVariantB, value, shouldTrackConversion]);

  return {
    value,
    variant: showVariantB ? "b" : "a",
    trackImpression,
    trackConversion
  };
} 