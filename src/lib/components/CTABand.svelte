<script lang="ts">
  let { headline, supporting, label }: {
    headline: string;
    supporting?: string;
    label?: string;
  } = $props();
</script>

<section class="cta-band">
  <div class="cta-inner">
    {#if label}
      <p class="cta-overline">{label}</p>
    {/if}
    <h2 class="cta-headline">{headline}</h2>
    {#if supporting}
      <p class="cta-supporting">{supporting}</p>
    {/if}
    <div class="cta-actions">
      <a href="/add" class="btn-primary">Get in touch</a>
    </div>
  </div>
</section>

<style>
  .cta-band {
    background-color: var(--color-surface-dark);
    padding-block: var(--space-section);
  }

  .cta-inner {
    max-inline-size: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-gutter);
    text-align: center;
  }

  .cta-overline {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-on-primary);
    opacity: 0.7;
    text-transform: uppercase;
    margin-block-end: var(--space-md);
  }

  .cta-headline {
    font-size: var(--text-display-md);
    font-weight: var(--text-display-md-weight);
    line-height: var(--text-display-md-line);
    color: var(--color-on-primary);
    max-inline-size: 640px;
    margin-inline: auto;
    margin-block-end: var(--space-lg);
  }

  .cta-supporting {
    font-size: var(--text-title-md);
    font-weight: var(--text-title-md-weight);
    line-height: var(--text-title-md-line);
    color: var(--color-on-primary);
    opacity: 0.8;
    max-inline-size: 560px;
    margin-inline: auto;
    margin-block-end: var(--space-xl);
  }

  .cta-actions {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-canvas);
    color: var(--color-ink);
    font-size: var(--text-button);
    font-weight: var(--text-button-weight);
    line-height: var(--text-button-line);
    border-radius: var(--radius-lg);
    text-decoration: none;
    border: none;
    cursor: pointer;
    box-shadow: var(--elevation-button);
    transition: background-color 0.15s ease;
  }

  .btn-primary:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }
</style>
