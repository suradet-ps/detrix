<script lang="ts">
  import type { PortfolioItem } from '$lib/types/portfolio';

  let { items }: { items: PortfolioItem[] } = $props();
</script>

<div class="speaker-grid">
  {#each items as item (item.id)}
    <article class="speaker-card">
      <div class="speaker-card-body">
        <h3 class="speaker-title">{item.title}</h3>
        {#if item.description}
          <p class="speaker-description">{item.description}</p>
        {/if}
      </div>
    </article>
  {/each}
</div>

<style>
  .speaker-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }

  .speaker-card {
    padding: var(--space-xl);
    background-color: var(--color-canvas);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-md);
    overflow-wrap: anywhere;
  }

  .speaker-card-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    min-inline-size: 0;
  }

  .speaker-title {
    font-size: var(--text-label-md);
    font-weight: var(--text-label-md-weight);
    line-height: var(--text-label-md-line);
    color: var(--color-ink);
    overflow-wrap: break-word;
  }

  .speaker-description {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    line-height: var(--text-body-md-line);
    color: var(--color-body);
    overflow-wrap: break-word;
  }

  @media (max-inline-size: 1024px) {
    .speaker-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-inline-size: 768px) {
    .speaker-grid {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    .speaker-card {
      padding: var(--space-lg);
    }
  }
</style>
