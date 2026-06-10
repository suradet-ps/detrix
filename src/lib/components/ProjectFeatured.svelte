<script lang="ts">
  import type { PortfolioItem } from '$lib/types/portfolio';

  let { item }: { item: PortfolioItem } = $props();
</script>

<article class="project-featured">
  <div class="project-body">
    <p class="project-label">Flagship Project</p>
    <h3 class="project-title">{item.title}</h3>
    {#if item.description}
      <p class="project-description">{item.description}</p>
    {/if}
    <div class="project-meta">
      <span class="project-category">{item.category}</span>
    </div>
  </div>
</article>

<style>
  .project-featured {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .project-body {
    max-inline-size: 720px;
  }

  .project-label {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
    text-transform: uppercase;
    margin-block-end: var(--space-md);
  }

  .project-title {
    font-size: var(--text-title-lg);
    font-weight: var(--text-title-lg-weight);
    line-height: var(--text-title-lg-line);
    letter-spacing: var(--text-title-lg-spacing);
    color: var(--color-ink);
    margin-block-end: var(--space-md);
  }

  .project-description {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    line-height: var(--text-body-md-line);
    color: var(--color-body);
    margin-block-end: var(--space-lg);
  }

  .project-meta {
    display: flex;
    gap: var(--space-sm);
  }

  .project-category {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
    padding: var(--space-xxs) var(--space-sm);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-sm);
  }
</style>
