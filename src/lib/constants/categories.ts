export const PORTFOLIO_CATEGORIES = {
  SPEAKER: 'วิทยากร',
  ACADEMIC: 'ผลงานวิชาการ',
  CONFERENCE: 'การประชุม/อบรม',
  INNOVATION: 'นวัตกรรม'
} as const;

export type PortfolioCategory = typeof PORTFOLIO_CATEGORIES[keyof typeof PORTFOLIO_CATEGORIES];

export const VALID_CATEGORIES: readonly PortfolioCategory[] = [
  PORTFOLIO_CATEGORIES.SPEAKER,
  PORTFOLIO_CATEGORIES.ACADEMIC,
  PORTFOLIO_CATEGORIES.CONFERENCE,
  PORTFOLIO_CATEGORIES.INNOVATION
];
