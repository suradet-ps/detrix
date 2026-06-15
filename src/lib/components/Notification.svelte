<script lang="ts">
  import { getNotifications, dismiss } from '$lib/stores/notification.svelte';

  let notifications = $derived(getNotifications());
</script>

{#if notifications.length > 0}
  <div class="notifications-container" aria-live="polite" aria-label="Notifications">
    {#each notifications as n (n.id)}
      <div class="notification" class:notification--success={n.type === 'success'} class:notification--error={n.type === 'error'} class:notification--info={n.type === 'info'} role="status">
        <span class="notification-message">{n.message}</span>
        <button class="notification-dismiss" onclick={() => dismiss(n.id)} aria-label="Dismiss notification" type="button">
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
  .notifications-container {
    position: fixed;
    inset-block-start: var(--space-lg);
    inset-inline-end: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    z-index: var(--z-modal);
    max-inline-size: min(90vw, 400px);
    pointer-events: none;
  }

  .notification {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-canvas);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-md);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    pointer-events: auto;
    animation: notification-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .notification--success {
    border-inline-start: 3px solid var(--color-success-border);
  }

  .notification--error {
    border-inline-start: 3px solid var(--color-info);
  }

  .notification--info {
    border-inline-start: 3px solid var(--color-info-border);
  }

  .notification-message {
    flex: 1;
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    line-height: var(--text-body-md-line);
    color: var(--color-ink);
  }

  .notification-dismiss {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 28px;
    block-size: 28px;
    min-inline-size: 44px;
    min-block-size: 44px;
    background: none;
    border: none;
    color: var(--color-muted);
    cursor: pointer;
    border-radius: var(--radius-sm);
    margin: calc(-1 * var(--space-sm));
  }

  .notification-dismiss:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }

  @keyframes notification-in {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .notification {
      animation: none;
    }
  }

  @media (max-inline-size: 768px) {
    .notifications-container {
      inset-inline: var(--space-md);
      inset-block-start: var(--space-md);
      max-inline-size: none;
    }
  }
</style>
