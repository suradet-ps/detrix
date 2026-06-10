<script lang="ts">
  import type { PortfolioItem } from '$lib/types/portfolio';

  let { item, onclick }: { item: PortfolioItem; onclick: () => void } = $props();
</script>

<button class="project-card" onclick={onclick} type="button" aria-label="View details: {item.title}">
  <h3 class="card-title">{item.title}</h3>
  {#if item.description}
    <p class="card-description">{item.description}</p>
  {/if}
  <div class="card-footer">
    <span class="card-category">{item.category}</span>
  </div>
</button>

<style>
  .project-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-xl);
    background-color: var(--color-canvas);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-md);
    text-align: start;
    cursor: pointer;
    transition: border-color 0.15s ease;
    font-family: var(--font-body);
    inline-size: 100%;
  }

  .project-card:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }

  .card-title {
    font-size: var(--text-label-md);
    font-weight: var(--text-label-md-weight);
    line-height: var(--text-label-md-line);
    color: var(--color-ink);
  }

  .card-description {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    line-height: var(--text-body-md-line);
    color: var(--color-body);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    overflow: hidden;
  }

  .card-footer {
    display: flex;
    gap: var(--space-sm);
    margin-block-start: auto;
  }

  .card-category {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
    padding: var(--space-xxs) var(--space-sm);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-sm);
  }
</style>
