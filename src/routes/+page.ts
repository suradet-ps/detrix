import { getSupabase } from '$lib/supabase/client';
import type { PortfolioItem, EditorialData, TimelineEntry } from '$lib/types/portfolio';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) {
    return {
      editorial: null,
      error: 'เกิดข้อผิดพลาดในการโหลดข้อมูล'
    } as const;
  }

  const items = (data ?? []) as PortfolioItem[];

  const speakerItems = items.filter((i) => i.category === 'วิทยากร');
  const academicItems = items.filter((i) => i.category === 'ผลงานวิชาการ');
  const innovationItems = items.filter((i) => i.category === 'นวัตกรรม');
  const conferenceItems = items.filter((i) => i.category === 'การประชุม/อบรม');

  const allTimeline: TimelineEntry[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.start_date,
    category: item.category,
    type: item.category === 'วิทยากร' ? 'speaker'
      : item.category === 'ผลงานวิชาการ' ? 'academic'
      : item.category === 'นวัตกรรม' ? 'innovation'
      : 'conference' as const
  }));

  const flagshipProject = innovationItems[0] ?? speakerItems[0] ?? academicItems[0] ?? null;

  const editorial: EditorialData = {
    items,
    speakerItems,
    academicItems,
    innovationItems,
    conferenceItems,
    flagshipProject,
    metrics: {
      academicWorks: academicItems.length,
      speakerSessions: speakerItems.length,
      innovations: innovationItems.length,
      professionalsReached: Math.max(
        academicItems.length + speakerItems.length + innovationItems.length + conferenceItems.length,
        100
      )
    },
    allTimeline
  };

  return {
    editorial,
    error: null
  } as const;
};
