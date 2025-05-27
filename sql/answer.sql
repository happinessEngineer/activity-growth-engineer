/* Return views, purchases, and CVR per variant */
WITH impressions AS (
  SELECT 
    variant,
    COUNT(*) as total_impressions
  FROM events
  WHERE event_name = 'paywall_copy_b_impression'
  GROUP BY variant
),
conversions AS (
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
