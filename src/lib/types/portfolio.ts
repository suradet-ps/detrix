export interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  start_date: string;
  end_date: string | null;
  created_at: string | null;
}

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface EditorialData {
  items: PortfolioItem[];
  speakerItems: PortfolioItem[];
  academicItems: PortfolioItem[];
  innovationItems: PortfolioItem[];
  conferenceItems: PortfolioItem[];
  flagshipProject: PortfolioItem | null;
  metrics: {
    academicWorks: number;
    speakerSessions: number;
    innovations: number;
    professionalsReached: number;
  };
  allTimeline: TimelineEntry[];
}

export interface TimelineEntry {
  id: string;
  title: string;
  date: string;
  category: string;
  type: 'speaker' | 'academic' | 'innovation' | 'conference';
}
