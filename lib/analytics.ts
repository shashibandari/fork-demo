export type AnalyticsEvent =
  | "number_submitted"
  | "vanity_match_found"
  | "vanity_result_copied"
  | "vanity_result_shared"
  | "no_match_found";

export interface AnalyticsPayload {
  phoneNumber?: string;
  matchWord?: string;
  formatted?: string;
}

export function trackEvent(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, payload);
  }
}
