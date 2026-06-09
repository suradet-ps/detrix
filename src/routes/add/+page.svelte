<script lang="ts">
  import { enhance } from '$app/forms';
  import { notify } from '$lib/stores/notification.svelte';
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';

  let { form, data }: PageProps = $props();

  let isSubmitting = $state(false);

  let formData = $state({
    title: '',
    description: '',
    category: '',
    start_date: '',
    end_date: '',
    secret_key: ''
  });

  let validationErrors = $state<Record<string, string>>({});

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = 'กรุณากรอกชื่อเรื่อง';
    }

    if (!formData.category) {
      errors.category = 'กรุณาเลือกประเภท';
    }

    if (!formData.start_date) {
      errors.start_date = 'กรุณากรอกวันที่';
    }

    if (!formData.secret_key.trim()) {
      errors.secret_key = 'กรุณากรอกรหัสสำหรับบันทึกผลงาน';
    }

    validationErrors = errors;
    return Object.keys(errors).length === 0;
  }

  function handleInput(field: keyof typeof formData, value: string): void {
    formData[field] = value;
    if (validationErrors[field]) {
      const next = { ...validationErrors };
      delete next[field];
      validationErrors = next;
    }
  }
</script>

<main class="container">
  <div class="form-card">
    <h2>เพิ่มผลงานใหม่</h2>

    <form
      method="POST"
      action="?/create"
      use:enhance={async ({ formElement, submitter, formData: fd, cancel }) => {
        isSubmitting = true;
        validationErrors = {};

        const raw = Object.fromEntries(fd) as Record<string, string>;
        const clientData = {
          title: raw.title ?? '',
          description: raw.description ?? '',
          category: raw.category ?? '',
          start_date: raw.start_date ?? '',
          end_date: raw.end_date ?? '',
          secret_key: raw.secret_key ?? ''
        };

        if (!validate()) {
          isSubmitting = false;
          return;
        }

        try {
          const response = await fetch(formElement.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData)
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            notify(result.error ?? 'เกิดข้อผิดพลาดในการบันทึก', 'error');
            isSubmitting = false;
            return;
          }

          notify('บันทึกผลงานสำเร็จ!', 'success');
          goto('/');
        } catch {
          notify('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
          isSubmitting = false;
        }
      }}
      novalidate
    >
      <div class="form-group">
        <label for="title">
          ชื่อเรื่อง
          <span class="required" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          bind:value={formData.title}
          oninput={(e) => handleInput('title', (e.target as HTMLInputElement).value)}
          aria-invalid={validationErrors.title ? 'true' : undefined}
          aria-describedby={validationErrors.title ? 'title-error' : undefined}
          required
        />
        {#if validationErrors.title}
          <p id="title-error" class="field-error" role="alert">{validationErrors.title}</p>
        {/if}
      </div>

      <div class="form-group">
        <label for="description">รายละเอียด</label>
        <textarea
          id="description"
          name="description"
          bind:value={formData.description}
          oninput={(e) => handleInput('description', (e.target as HTMLTextAreaElement).value)}
        ></textarea>
      </div>

      <div class="form-group">
        <label for="category">
          ประเภท
          <span class="required" aria-hidden="true">*</span>
        </label>
        <select
          id="category"
          name="category"
          bind:value={formData.category}
          onchange={(e) => handleInput('category', (e.target as HTMLSelectElement).value)}
          aria-invalid={validationErrors.category ? 'true' : undefined}
          aria-describedby={validationErrors.category ? 'category-error' : undefined}
          required
        >
          <option disabled value="">กรุณาเลือกประเภท</option>
          <option value="วิทยากร">วิทยากร</option>
          <option value="ผลงานวิชาการ">ผลงานวิชาการ</option>
          <option value="การประชุม/อบรม">การประชุม/อบรม</option>
          <option value="นวัตกรรม">นวัตกรรม</option>
        </select>
        {#if validationErrors.category}
          <p id="category-error" class="field-error" role="alert">{validationErrors.category}</p>
        {/if}
      </div>

      <div class="form-group">
        <label for="start_date">
          วันที่
          <span class="required" aria-hidden="true">*</span>
        </label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          bind:value={formData.start_date}
          oninput={(e) => handleInput('start_date', (e.target as HTMLInputElement).value)}
          aria-invalid={validationErrors.start_date ? 'true' : undefined}
          aria-describedby={validationErrors.start_date ? 'start-date-error' : undefined}
          required
        />
        {#if validationErrors.start_date}
          <p id="start-date-error" class="field-error" role="alert">{validationErrors.start_date}</p>
        {/if}
      </div>

      <div class="form-group">
        <label for="end_date">ถึงวันที่ (หากเป็นงานวันเดียวไม่ต้องกรอก)</label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          bind:value={formData.end_date}
          oninput={(e) => handleInput('end_date', (e.target as HTMLInputElement).value)}
        />
      </div>

      <div class="form-group">
        <label for="secret_key">
          รหัสสำหรับบันทึกผลงาน
          <span class="required" aria-hidden="true">*</span>
        </label>
        <input
          type="password"
          id="secret_key"
          name="secret_key"
          autocomplete="off"
          bind:value={formData.secret_key}
          oninput={(e) => handleInput('secret_key', (e.target as HTMLInputElement).value)}
          aria-invalid={validationErrors.secret_key ? 'true' : undefined}
          aria-describedby={validationErrors.secret_key ? 'secret-key-error' : undefined}
          required
        />
        {#if validationErrors.secret_key}
          <p id="secret-key-error" class="field-error" role="alert">{validationErrors.secret_key}</p>
        {/if}
      </div>

      <button type="submit" class="form-button" disabled={isSubmitting}>
        {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกผลงาน'}
      </button>
    </form>
  </div>
</main>

<style>
  .container {
    max-inline-size: 1100px;
    margin-inline: auto;
    padding-inline: var(--space-8);
    padding-block: var(--space-8);
  }

  .form-card {
    background-color: var(--color-surface);
    border-radius: var(--radius-md);
    padding: var(--space-10);
    margin-block: var(--space-8);
    border: 1px solid var(--color-border);
  }

  .form-card h2 {
    font-size: var(--text-2xl);
    text-align: center;
    margin-block-end: var(--space-10);
  }

  .form-group {
    margin-block-end: var(--space-6);
  }

  .form-group label {
    display: block;
    margin-block-end: var(--space-2);
    font-weight: 500;
    color: var(--color-text-secondary);
  }

  .required {
    color: var(--color-error);
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    inline-size: 100%;
    padding: var(--space-3) var(--space-4);
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    font-size: var(--text-base);
    transition: all var(--transition-fast);
  }

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(43, 108, 176, 0.15);
  }

  .form-group input[aria-invalid="true"],
  .form-group select[aria-invalid="true"] {
    border-color: var(--color-error);
  }

  .form-group input[aria-invalid="true"]:focus,
  .form-group select[aria-invalid="true"]:focus {
    box-shadow: 0 0 0 2px rgba(197, 48, 48, 0.15);
  }

  .form-group textarea {
    min-block-size: 120px;
    resize: vertical;
  }

  .field-error {
    color: var(--color-error);
    font-size: var(--text-sm);
    margin-block-start: var(--space-1);
    margin-block-end: 0;
  }

  .form-button {
    inline-size: 100%;
    padding: var(--space-4) var(--space-6);
    margin-block-start: var(--space-4);
    border: none;
    border-radius: var(--radius-md);
    background-color: var(--color-accent);
    color: var(--color-white);
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: var(--text-base);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .form-button:hover:not(:disabled) {
    background-color: var(--color-accent-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .form-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-inline-size: 768px) {
    .container {
      padding-inline: var(--space-4);
    }

    .form-card {
      padding: var(--space-6);
    }
  }
</style>
