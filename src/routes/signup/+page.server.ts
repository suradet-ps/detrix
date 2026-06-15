import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.session) {
    throw redirect(302, '/add');
  }
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;

    if (!email || !password) {
      return fail(400, { error: 'กรุณากรอกอีเมลและรหัสผ่าน' });
    }

    if (password !== confirmPassword) {
      return fail(400, { error: 'รหัสผ่านไม่ตรงกัน' });
    }

    if (password.length < 6) {
      return fail(400, { error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' });
    }

    const { error } = await locals.supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return fail(400, {
        error: error.message === 'User already registered'
          ? 'อีเมลนี้ถูกใช้สมัครสมาชิกแล้ว'
          : 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
      });
    }

    return { success: true };
  }
};
