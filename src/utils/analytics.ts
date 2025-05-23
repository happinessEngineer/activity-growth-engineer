/**
 * Type definition for analytics event properties
 */
type AnalyticsProps = Record<string, string | number | boolean | null>;

/**
 * Tracks an analytics event with optional properties.
 * This is a wrapper around our analytics implementation that will be replaced
 * with a real analytics provider like Mixpanel or Segment in production.
 * 
 * @param event - The name of the event to track
 * @param props - Optional properties to include with the event
 */
export function track(event: string, props: AnalyticsProps = {}): void {
  // Replace with Mixpanel / Segment in prod
  // eslint-disable-next-line no-console
  console.log(`[analytics] ${event}`, props);
} 