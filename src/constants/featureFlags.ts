export const FEATURE_FLAGS = {
  paywall_copy_b: {
    percentage: 50,
  }
};

export type FeatureFlag = {
  percentage: number;  // 0-100
};
