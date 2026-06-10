<script lang="ts">
  import type { PortfolioItem } from '$lib/types/portfolio';
  import { formatDate } from '$lib/utils/date';

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

  function handleBackdropKeydown(e: KeyboardEvent): void {
    if (e.target === modalRef && (e.key === 'Enter' || e.key === ' ')) {
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
  onkeydown={handleBackdropKeydown}
  tabindex="-1"
  bind:this={modalRef}
>
  <div class="modal-content">
    <button
      class="modal-close"
      onclick={onclose}
      aria-label="Close"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <h2 id="modal-title" class="modal-title">{item.title}</h2>

    <div class="modal-meta">
      <span class="modal-category">{item.category}</span>
      <span class="modal-date">{formatDate(item.start_date, item.end_date)}</span>
    </div>

    {#if item.description}
      <p class="modal-description">{item.description}</p>
    {:else}
      <p class="modal-description modal-description--empty">No additional details available.</p>
    {/if}
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(24, 29, 38, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: var(--z-modal-backdrop);
  }

  .modal-content {
    background-color: var(--color-canvas);
    border-radius: var(--radius-lg);
    padding: var(--space-xxl);
    max-inline-size: 640px;
    inline-size: min(90%, 640px);
    position: relative;
    max-block-size: 85vh;
    overflow-y: auto;
  }

  .modal-close {
    position: absolute;
    inset-block-start: var(--space-lg);
    inset-inline-end: var(--space-lg);
    background: none;
    border: none;
    color: var(--color-muted);
    cursor: pointer;
    padding: var(--space-xxs);
    border-radius: var(--radius-sm);
    transition: color 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-title {
    font-size: var(--text-title-lg);
    font-weight: var(--text-title-lg-weight);
    line-height: var(--text-title-lg-line);
    color: var(--color-ink);
    margin-block-end: var(--space-md);
    padding-inline-end: var(--space-xxl);
  }

  .modal-meta {
    display: flex;
    gap: var(--space-sm);
    align-items: center;
    margin-block-end: var(--space-xl);
  }

  .modal-category {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
    padding: var(--space-xxs) var(--space-sm);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-sm);
  }

  .modal-date {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
  }

  .modal-description {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    line-height: var(--text-body-md-line);
    color: var(--color-body);
    white-space: pre-wrap;
  }

  .modal-description--empty {
    color: var(--color-muted);
    font-style: italic;
  }
</style>
