<script lang="ts">
  import type { PortfolioItem } from '$lib/types/portfolio';
  import { formatDate } from '$lib/utils/date';
  import { focusTrap } from '$lib/utils/focusTrap';

  let { item, onclose }: { item: PortfolioItem; onclose: () => void } = $props();

  let modalRef: HTMLDivElement | undefined = $state();

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      onclose();
    }
  }

  function handleBackdropClick(e: MouseEvent): void {
    if (e.target === modalRef) {
      onclose();
    }
  }

  function handleOverlayKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      onclose();
    }
  }

  $effect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="modal-overlay"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  onclick={handleBackdropClick}
  onkeydown={handleOverlayKeydown}
  tabindex="-1"
  bind:this={modalRef}
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-content" tabindex="-1" use:focusTrap>
    <button
      class="modal-close-btn"
      onclick={onclose}
      aria-label="ปิด"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <h2 id="modal-title" class="modal-title">{item.title}</h2>

    <div class="modal-meta">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      <span>{formatDate(item.start_date, item.end_date)}</span>
    </div>

    {#if item.description}
      <p class="modal-description">{item.description}</p>
    {:else}
      <p class="modal-description modal-description--empty">
        <i>ไม่มีรายละเอียดเพิ่มเติม</i>
      </p>
    {/if}
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: var(--z-modal-backdrop);
  }

  .modal-content {
    background-color: var(--color-surface);
    border-radius: var(--radius-md);
    padding: var(--space-10);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
    max-inline-size: 600px;
    inline-size: min(90%, 600px);
    position: relative;
    max-block-size: 90vh;
    overflow-y: auto;
    animation: modalFadeIn 0.25s ease;
  }

  @keyframes modalFadeIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .modal-close-btn {
    position: absolute;
    inset-block-start: var(--space-4);
    inset-inline-end: var(--space-4);
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: var(--space-1);
    border-radius: var(--radius-sm);
    transition: color var(--transition-fast), background-color var(--transition-fast);
  }

  .modal-close-btn:hover {
    color: var(--color-text-primary);
    background-color: var(--color-bg);
  }

  .modal-title {
    font-size: var(--text-2xl);
    margin-block-end: var(--space-4);
    padding-inline-end: var(--space-8);
  }

  .modal-meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-text-secondary);
    margin-block-end: var(--space-6);
  }

  .modal-meta svg {
    stroke: var(--color-accent);
    flex-shrink: 0;
  }

  .modal-description {
    color: var(--color-text-primary);
    line-height: 1.8;
    white-space: pre-wrap;
  }

  .modal-description--empty {
    color: var(--color-text-muted);
    font-style: italic;
  }
</style>
