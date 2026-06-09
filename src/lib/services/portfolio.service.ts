import { getSupabase } from '$lib/supabase/client';
import type { PortfolioItem, PortfolioItemInput, ApiResponse, PortfolioFormData, FormErrors } from '$lib/types/portfolio';

export class PortfolioService {
  private static instance: PortfolioService;

  static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  async fetchAll(): Promise<ApiResponse<PortfolioItem[]>> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;

      return { success: true, data: data ?? [] };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch portfolio items';
      return { success: false, error: message };
    }
  }

  async create(input: PortfolioItemInput, secretKey: string): Promise<ApiResponse<PortfolioItem>> {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, secretKey })
      });

      const result: ApiResponse<PortfolioItem> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? 'Failed to create portfolio item');
      }

      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create portfolio item';
      return { success: false, error: message };
    }
  }

  validateForm(data: PortfolioFormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.title.trim()) {
      errors.title = 'กรุณากรอกชื่อเรื่อง';
    }

    if (!data.category) {
      errors.category = 'กรุณาเลือกประเภท';
    }

    if (!data.start_date) {
      errors.start_date = 'กรุณากรอกวันที่';
    }

    if (!data.secret_key.trim()) {
      errors.secret_key = 'กรุณากรอกรหัสสำหรับบันทึกผลงาน';
    }

    return errors;
  }

  groupByCategory(items: PortfolioItem[]): Record<string, PortfolioItem[]> {
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
    for (const [category, items] of Object.entries(groups)) {
      sorted[category] = items;
    }

    return sorted;
  }
}
