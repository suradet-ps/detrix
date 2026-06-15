import { getSupabaseServer } from '$lib/supabase/server-public';
import type { PortfolioItem, EditorialData, TimelineEntry } from '$lib/types/portfolio';
import type { PageServerLoad } from './$types';
import { PORTFOLIO_CATEGORIES } from '$lib/constants/categories';

export const load: PageServerLoad = async () => {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from('portfolio_items')
    .select('id, title, description, category, start_date, end_date')
    .order('start_date', { ascending: false })
    .limit(200);

  if (error) {
    return {
      editorial: null,
      error: 'เกิดข้อผิดพลาดในการโหลดข้อมูล'
    } as const;
  }

  const items = (data ?? []) as PortfolioItem[];

  const speakerItems = items.filter((i) => i.category === PORTFOLIO_CATEGORIES.SPEAKER);
  const academicItems = items.filter((i) => i.category === PORTFOLIO_CATEGORIES.ACADEMIC);
  const innovationItems = items.filter((i) => i.category === PORTFOLIO_CATEGORIES.INNOVATION);

  const allTimeline: TimelineEntry[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.start_date,
    category: item.category,
    type: item.category === PORTFOLIO_CATEGORIES.SPEAKER ? 'speaker'
      : item.category === PORTFOLIO_CATEGORIES.ACADEMIC ? 'academic'
      : item.category === PORTFOLIO_CATEGORIES.INNOVATION ? 'innovation'
      : 'conference' as const
  }));

  const flagshipProject = innovationItems[0] ?? speakerItems[0] ?? academicItems[0] ?? null;

  const editorial: EditorialData = {
    items,
    speakerItems,
    academicItems,
    innovationItems,
    flagshipProject,
    metrics: {
      academicWorks: academicItems.length,
      speakerSessions: speakerItems.length,
      innovations: innovationItems.length
    },
    allTimeline
  };

  return {
    editorial,
    error: null
  } as const;
};
