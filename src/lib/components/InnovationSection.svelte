<script lang="ts">
  import type { PortfolioItem } from '$lib/types/portfolio';

  let { items }: { items: PortfolioItem[] } = $props();
</script>

<div class="innovation-grid">
  {#each items as item (item.id)}
    <article class="innovation-card">
      <div class="innovation-header">
        <span class="innovation-icon" aria-hidden="true">◆</span>
      </div>
      <h3 class="innovation-title">{item.title}</h3>
      {#if item.description}
        <p class="innovation-description">{item.description}</p>
      {/if}
    </article>
  {/each}
</div>

<style>
  .innovation-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }

  .innovation-card {
    padding: var(--space-xl);
    background-color: var(--color-canvas);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .innovation-header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .innovation-icon {
    font-size: var(--text-title-sm);
    color: var(--color-signature-coral);
  }

  .innovation-title {
    font-size: var(--text-label-md);
    font-weight: var(--text-label-md-weight);
    line-height: var(--text-label-md-line);
    color: var(--color-ink);
  }

  .innovation-description {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    line-height: var(--text-body-md-line);
    color: var(--color-body);
  }

  @media (max-inline-size: 768px) {
    .innovation-grid {
      grid-template-columns: 1fr;
    }

    .innovation-card {
      padding: var(--space-lg);
    }
  }
</style>
