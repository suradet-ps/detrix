export function formatDate(start: string, end?: string | null): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const startDate = new Date(start).toLocaleDateString('th-TH', options);

  if (end && start !== end) {
    const endDate = new Date(end).toLocaleDateString('th-TH', options);
    return `${startDate} ถึง ${endDate}`;
  }

  return startDate;
}
