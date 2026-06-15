import { VALID_CATEGORIES, type PortfolioCategory } from '$lib/constants/categories';

export interface PortfolioInput {
  title: string;
  description: string | null;
  category: PortfolioCategory;
  start_date: string;
  end_date: string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validatePortfolioInput(input: Record<string, unknown>): {
  ok: true;
  data: PortfolioInput;
} | {
  ok: false;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];

  const title = typeof input['title'] === 'string' ? input['title'].trim() : '';
  const description = typeof input['description'] === 'string' ? input['description'].trim() || null : null;
  const category = typeof input['category'] === 'string' ? input['category'] : '';
  const start_date = typeof input['start_date'] === 'string' ? input['start_date'] : '';
  const end_date = typeof input['end_date'] === 'string' ? input['end_date'].trim() || null : null;

  if (!title) {
    errors.push({ field: 'title', message: 'กรุณากรอกชื่อเรื่อง' });
  } else if (title.length > 500) {
    errors.push({ field: 'title', message: 'ชื่อเรื่องต้องไม่เกิน 500 ตัวอักษร' });
  }

  if (description && description.length > 5000) {
    errors.push({ field: 'description', message: 'รายละเอียดต้องไม่เกิน 5,000 ตัวอักษร' });
  }

  if (!category || !VALID_CATEGORIES.includes(category as PortfolioCategory)) {
    errors.push({ field: 'category', message: 'กรุณาเลือกประเภทที่ถูกต้อง' });
  }

  if (!start_date) {
    errors.push({ field: 'start_date', message: 'กรุณากรอกวันที่' });
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(start_date)) {
    errors.push({ field: 'start_date', message: 'รูปแบบวันที่ไม่ถูกต้อง (YYYY-MM-DD)' });
  }

  if (end_date && !/^\d{4}-\d{2}-\d{2}$/.test(end_date)) {
    errors.push({ field: 'end_date', message: 'รูปแบบวันที่สิ้นสุดไม่ถูกต้อง (YYYY-MM-DD)' });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      title,
      description,
      category: category as PortfolioCategory,
      start_date,
      end_date
    }
  };
}
