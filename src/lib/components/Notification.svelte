<script lang="ts">
  import { getNotifications, dismiss } from '$lib/stores/notification.svelte';

  let notifications = $derived(getNotifications());

  function handleDismiss(id: string): void {
    dismiss(id);
  }
</script>

{#if notifications.length > 0}
  <div class="notification-container" role="region" aria-label="การแจ้งเตือน" aria-live="polite">
    {#each notifications as notification (notification.id)}
      <div
        class="notification"
        class:notification--success={notification.type === 'success'}
        class:notification--error={notification.type === 'error'}
        class:notification--info={notification.type === 'info'}
        role="alert"
      >
        <span class="notification-message">{notification.message}</span>
        <button
          class="notification-close"
          onclick={() => handleDismiss(notification.id)}
          aria-label="ปิดการแจ้งเตือน"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    {/each}
  </div>
{/if}

<style>
  .notification-container {
    position: fixed;
    inset-block-start: var(--space-4);
    inset-inline-end: var(--space-4);
    z-index: var(--z-notification);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    max-inline-size: 400px;
    inline-size: calc(100% - var(--space-8));
  }

  .notification {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    animation: slideIn 0.25s ease;
    border: 1px solid;
  }

  .notification--success {
    background-color: var(--color-success-bg);
    border-color: var(--color-success);
    color: var(--color-success);
  }

  .notification--error {
    background-color: var(--color-error-bg);
    border-color: var(--color-error);
    color: var(--color-error);
  }

  .notification--info {
    background-color: var(--color-info-bg);
    border-color: var(--color-info);
    color: var(--color-info);
  }

  .notification-message {
    flex: 1;
    font-size: var(--text-sm);
    line-height: 1.5;
  }

  .notification-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-1);
    border-radius: var(--radius-sm);
    color: inherit;
    opacity: 0.7;
    transition: opacity var(--transition-fast);
    flex-shrink: 0;
  }

  .notification-close:hover {
    opacity: 1;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
