-- Analysis of A/B test conversion rates for paywall headlines
-- This query calculates:
-- 1. Total impressions per variant
-- 2. Total conversions per variant
-- 3. Conversion rate as a percentage
-- 4. Handles cases where there are no conversions

WITH impressions AS (
  -- Count total impressions for each variant
  SELECT 
    variant,
    COUNT(*) as total_impressions
  FROM events
  WHERE event_name = 'paywall_copy_b_impression'
  GROUP BY variant
),
conversions AS (
  -- Count total conversions for each variant
  SELECT 
    variant,
    COUNT(*) as total_conversions
  FROM events
  WHERE event_name = 'paywall_copy_b_conversion'
  GROUP BY variant
)
SELECT 
  i.variant,
  i.total_impressions,
  COALESCE(c.total_conversions, 0) as total_conversions,
  ROUND(
    (COALESCE(c.total_conversions, 0)::numeric / i.total_impressions) * 100,
    2
  ) as conversion_rate
FROM impressions i
LEFT JOIN conversions c ON i.variant = c.variant
ORDER BY i.variant;
