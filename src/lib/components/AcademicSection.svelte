<script lang="ts">
  import type { PortfolioItem } from '$lib/types/portfolio';

  let { items }: { items: PortfolioItem[] } = $props();
</script>

<div class="academic-list">
  {#each items as item (item.id)}
    <article class="academic-item">
      <div class="academic-marker" aria-hidden="true"></div>
      <div class="academic-body">
        <h3 class="academic-title">{item.title}</h3>
        {#if item.description}
          <p class="academic-description">{item.description}</p>
        {/if}
      </div>
    </article>
  {/each}
</div>

<style>
  .academic-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .academic-item {
    display: flex;
    gap: var(--space-lg);
    padding: var(--space-lg);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-md);
    background-color: var(--color-canvas);
  }

  .academic-marker {
    flex-shrink: 0;
    inline-size: 4px;
    border-radius: var(--radius-xs);
    background-color: var(--color-signature-coral);
  }

  .academic-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    min-inline-size: 0;
  }

  .academic-title {
    font-size: var(--text-label-md);
    font-weight: var(--text-label-md-weight);
    line-height: var(--text-label-md-line);
    color: var(--color-ink);
  }

  .academic-description {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    line-height: var(--text-body-md-line);
    color: var(--color-body);
  }
</style>
