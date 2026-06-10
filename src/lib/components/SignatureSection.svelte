<script lang="ts">
  let { children, id, surface = 'coral', label, headline, supporting }: {
    children: import('svelte').Snippet;
    id?: string;
    surface?: 'coral' | 'forest' | 'dark' | 'peach' | 'mint';
    label?: string;
    headline?: string;
    supporting?: string;
  } = $props();
</script>

<section
  class="signature-section"
  class:surface-coral={surface === 'coral'}
  class:surface-forest={surface === 'forest'}
  class:surface-dark={surface === 'dark'}
  class:surface-peach={surface === 'peach'}
  class:surface-mint={surface === 'mint'}
  {id}
>
  <div class="section-inner">
    {#if label}
      <p class="section-overline">{label}</p>
    {/if}
    {#if headline}
      <h2 class="section-headline">{headline}</h2>
    {/if}
    {#if supporting}
      <p class="section-supporting">{supporting}</p>
    {/if}
    {@render children()}
  </div>
</section>

<style>
  .signature-section {
    padding-block: var(--space-section);
  }

  .surface-coral {
    background-color: var(--color-signature-coral);
    color: var(--color-on-primary);
  }

  .surface-forest {
    background-color: var(--color-signature-forest);
    color: var(--color-on-primary);
  }

  .surface-dark {
    background-color: var(--color-surface-dark);
    color: var(--color-on-dark);
  }

  .surface-peach {
    background-color: var(--color-signature-peach);
    color: var(--color-ink);
  }

  .surface-mint {
    background-color: var(--color-signature-mint);
    color: var(--color-ink);
  }

  .section-inner {
    max-inline-size: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-gutter);
  }

  .section-overline {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    text-transform: uppercase;
    opacity: 0.8;
    margin-block-end: var(--space-md);
  }

  .section-headline {
    font-size: var(--text-display-md);
    font-weight: var(--text-display-md-weight);
    line-height: var(--text-display-md-line);
    margin-block-end: var(--space-lg);
    max-inline-size: 640px;
  }

  .surface-dark .section-headline,
  .surface-coral .section-headline,
  .surface-forest .section-headline {
    color: var(--color-on-primary);
  }

  .section-supporting {
    font-size: var(--text-title-md);
    font-weight: var(--text-title-md-weight);
    line-height: var(--text-title-md-line);
    opacity: 0.85;
    margin-block-end: var(--space-xxl);
    max-inline-size: 560px;
  }

  .surface-dark .section-supporting,
  .surface-coral .section-supporting,
  .surface-forest .section-supporting {
    color: var(--color-on-primary);
  }
</style>
