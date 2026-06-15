<script lang="ts">
  let { children, id, label, surface = 'canvas' }: {
    children: import('svelte').Snippet;
    id?: string;
    label?: string;
    surface?: 'canvas' | 'soft' | 'cream';
  } = $props();
</script>

<section
  class="editorial-section"
  class:surface-canvas={surface === 'canvas'}
  class:surface-soft={surface === 'soft'}
  class:surface-cream={surface === 'cream'}
  {id}
>
  <div class="section-inner">
    {#if label}
      <h2 class="section-label">{label}</h2>
    {/if}
    {@render children()}
  </div>
</section>

<style>
  .editorial-section {
    padding-block: var(--section-padding);
  }

  .surface-canvas {
    background-color: var(--color-canvas);
  }

  .surface-soft {
    background-color: var(--color-surface-soft);
  }

  .surface-cream {
    background-color: var(--color-signature-cream);
  }

  .section-inner {
    max-inline-size: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-gutter);
  }

  .section-label {
    font-size: clamp(1.5rem, 4vw, var(--text-display-md));
    font-weight: var(--text-display-md-weight);
    line-height: var(--text-display-md-line);
    color: var(--color-ink);
    margin-block-end: var(--space-xxl);
    max-inline-size: 640px;
  }
</style>
