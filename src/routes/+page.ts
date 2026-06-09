import { getSupabase } from '$lib/supabase/client';
import type { PortfolioItem } from '$lib/types/portfolio';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) {
    return {
      items: [],
      grouped: {},
      error: 'เกิดข้อผิดพลาดในการโหลดข้อมูล'
    };
  }

  const items = (data ?? []) as PortfolioItem[];

  const categoryOrder = ['วิทยากร', 'ผลงานวิชาการ', 'นวัตกรรม', 'การประชุม/อบรม'];

  const groups: Record<string, PortfolioItem[]> = {};
  for (const item of items) {
    const category = item.category || 'อื่นๆ';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category]!.push(item);
  }

  const sorted: Record<string, PortfolioItem[]> = {};
  for (const category of categoryOrder) {
    if (groups[category]) {
      sorted[category] = groups[category]!;
      delete groups[category];
    }
  }
  for (const [category, categoryItems] of Object.entries(groups)) {
    sorted[category] = categoryItems;
  }

  return {
    items,
    grouped: sorted,
    error: null
  };
};
