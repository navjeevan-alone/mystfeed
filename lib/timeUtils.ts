// utils/timeUtils.js
import { formatDistanceToNow, parseISO } from "date-fns";

export function formatRelativeTime(dateString: any) {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}
