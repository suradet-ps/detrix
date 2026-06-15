import { getSupabase } from '$lib/supabase/client';
import { json, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { validatePortfolioInput } from '$lib/server/validation';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  create: async ({ request, cookies }: RequestEvent) => {
    const session = cookies.get('portfolio_session');
    if (!session) {
      return json({ success: false, error: 'กรุณาเข้าสู่ระบบก่อนบันทึกผลงาน' }, { status: 401 });
    }

    let body: Record<string, unknown>;

    const contentType = request.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const fd = await request.formData();
      body = Object.fromEntries(fd);
    }

    const validation = validatePortfolioInput(body);
    if (!validation.ok) {
      const firstError = validation.errors[0];
      return json({ success: false, error: firstError?.message ?? 'ข้อมูลไม่ถูกต้อง' }, { status: 400 });
    }

    const { data } = validation;
    const supabase = getSupabase();

    const { error: dbError } = await supabase.from('portfolio_items').insert([
      {
        title: data.title,
        description: data.description,
        category: data.category,
        start_date: data.start_date,
        end_date: data.end_date
      }
    ]);

    if (dbError) {
      console.error('Database insert error:', dbError.message);
      return json(
        { success: false, error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง' },
        { status: 500 }
      );
    }

    return json({ success: true });
  }
};
