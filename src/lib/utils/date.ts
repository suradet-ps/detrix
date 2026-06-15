const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

function safeLocaleDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('th-TH', DATE_OPTIONS);
  } catch {
    return dateStr;
  }
}

export function formatDate(start: string, end?: string | null): string {
  const startDate = safeLocaleDate(start);

  if (end && start !== end) {
    const endDate = safeLocaleDate(end);
    return `${startDate} ถึง ${endDate}`;
  }

  return startDate;
}
