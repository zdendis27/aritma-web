export function formatDate(value: string) {
  return new Intl.DateTimeFormat("cs-CZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function isUpcoming(value: string) {
  return new Date(value).getTime() > Date.now();
}

export function scoreLabel(homeScore: number | null, awayScore: number | null) {
  if (homeScore === null || awayScore === null) {
    return "vs";
  }
  return `${homeScore}:${awayScore}`;
}
