<script lang="ts">
  import { enhance } from '$app/forms';
  import { notify } from '$lib/stores/notification.svelte';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
  let isLoading = $state(false);

  $effect(() => {
    if (form?.error) {
      notify(form.error, 'error');
    }
  });
</script>

<div class="auth-page">
  <div class="auth-card">
    <h2 class="auth-heading">เข้าสู่ระบบ</h2>

    <form
      method="POST"
      use:enhance={() => {
        isLoading = true;
        return async ({ update }) => {
          await update();
          isLoading = false;
        };
      }}
    >
      <div class="form-group">
        <label for="email">
          อีเมล
          <span class="required" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">
          รหัสผ่าน
          <span class="required" aria-hidden="true">*</span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autocomplete="current-password"
          required
        />
      </div>

      <button type="submit" class="submit-btn" disabled={isLoading}>
        {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
      </button>

      <p class="auth-link">
        ยังไม่มีบัญชี? <a href="/signup">สมัครสมาชิก</a>
      </p>
    </form>
  </div>
</div>

<style>
  .auth-page {
    max-inline-size: 420px;
    margin-inline: auto;
    padding-inline: var(--container-gutter);
    padding-block: var(--space-section);
  }

  .auth-card {
    background-color: var(--color-canvas);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
  }

  @media (max-inline-size: 480px) {
    .auth-card {
      padding: var(--space-lg);
    }

    .auth-heading {
      font-size: var(--text-title-lg);
      margin-block-end: var(--space-xl);
    }
  }

  .auth-heading {
    font-size: var(--text-display-md);
    font-weight: var(--text-display-md-weight);
    line-height: var(--text-display-md-line);
    color: var(--color-ink);
    text-align: center;
    margin-block-end: var(--space-xxl);
  }

  .form-group {
    margin-block-end: var(--space-lg);
  }

  .form-group label {
    display: block;
    margin-block-end: var(--space-xs);
    font-size: var(--text-label-md);
    font-weight: var(--text-label-md-weight);
    line-height: var(--text-label-md-line);
    color: var(--color-body);
  }

  .required {
    color: var(--color-info);
  }

  .form-group input {
    inline-size: 100%;
    min-block-size: 48px;
    padding: var(--space-sm) var(--space-md);
    background-color: var(--color-canvas);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-sm);
    color: var(--color-ink);
    font-family: var(--font-body);
    font-size: var(--text-body-md);
    transition: border-color 0.15s ease;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--color-info-border);
  }

  .submit-btn {
    inline-size: 100%;
    padding: var(--space-md) var(--space-lg);
    margin-block-start: var(--space-lg);
    border: none;
    border-radius: var(--radius-lg);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    font-family: var(--font-body);
    font-size: var(--text-button);
    font-weight: var(--text-button-weight);
    cursor: pointer;
    transition: background-color 0.15s ease;
    min-block-size: 48px;
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .auth-link {
    text-align: center;
    margin-block-start: var(--space-lg);
    color: var(--color-muted);
    font-size: var(--text-body-md);
  }

  .auth-link a {
    color: var(--color-primary);
    font-weight: 500;
  }
</style>
