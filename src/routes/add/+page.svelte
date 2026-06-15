<script lang="ts">
  import { enhance } from '$app/forms';
  import { notify } from '$lib/stores/notification.svelte';
  import { goto } from '$app/navigation';
  import type { PageProps } from './$types';
  import { PORTFOLIO_CATEGORIES } from '$lib/constants/categories';

  let { data }: PageProps = $props();

  let isSubmitting = $state(false);

  let formData = $state({
    title: '',
    description: '',
    category: '',
    start_date: '',
    end_date: ''
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

<div class="add-page">
  <div class="add-card">
    <h2 class="add-heading">เพิ่มผลงานใหม่</h2>

    <form
      method="POST"
      action="?/create"
      use:enhance={async ({ formElement, cancel }) => {
        cancel();
        isSubmitting = true;
        validationErrors = {};

        if (!validate()) {
          isSubmitting = false;
          return;
        }

        try {
          const submitData = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            start_date: formData.start_date,
            end_date: formData.end_date
          };

          const response = await fetch(formElement.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify(submitData)
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
          <option value={PORTFOLIO_CATEGORIES.SPEAKER}>{PORTFOLIO_CATEGORIES.SPEAKER}</option>
          <option value={PORTFOLIO_CATEGORIES.ACADEMIC}>{PORTFOLIO_CATEGORIES.ACADEMIC}</option>
          <option value={PORTFOLIO_CATEGORIES.CONFERENCE}>{PORTFOLIO_CATEGORIES.CONFERENCE}</option>
          <option value={PORTFOLIO_CATEGORIES.INNOVATION}>{PORTFOLIO_CATEGORIES.INNOVATION}</option>
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

      <button type="submit" class="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกผลงาน'}
      </button>
    </form>
  </div>
</div>

<style>
  .add-page {
    max-inline-size: 640px;
    margin-inline: auto;
    padding-inline: var(--container-gutter);
    padding-block: var(--space-section);
  }

  .add-card {
    background-color: var(--color-canvas);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
  }

  @media (max-inline-size: 480px) {
    .add-card {
      padding: var(--space-lg);
    }

    .add-heading {
      font-size: var(--text-title-lg);
      margin-block-end: var(--space-xl);
    }
  }

  .add-heading {
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

  .form-group input,
  .form-group textarea,
  .form-group select {
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

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: var(--color-info-border);
  }

  .form-group input[aria-invalid="true"],
  .form-group select[aria-invalid="true"] {
    border-color: var(--color-info);
  }

  .form-group textarea {
    min-block-size: 120px;
    resize: vertical;
  }

  .field-error {
    color: var(--color-info);
    font-size: var(--text-body-md);
    margin-block-start: var(--space-xxs);
    margin-block-end: 0;
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
</style>
