import { getUserId } from "./user";
import { FEATURE_FLAGS } from "../constants/featureFlags";

/**
 * Feature flag implementation for controlling application features.
 */
export function getFlag(key: string): boolean {
  const featureFlag = FEATURE_FLAGS[key as keyof typeof FEATURE_FLAGS];
  if (!featureFlag) return false;

  // create a unique hash for this user and feature flag
  const userId = getUserId();
  const combinedString = userId + key;
  const percentage = hashToPercentage(combinedString);

  const thresholdPercentage = featureFlag.percentage / 100;
  return percentage < thresholdPercentage;
}

/**
 * Convert a string to a decimal between 0 and 0.9999
 */
function hashToPercentage(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return (Math.abs(hash) % 10000) / 10000;
}
