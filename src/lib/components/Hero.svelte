<script lang="ts">
  import MetricsGrid from './MetricsGrid.svelte';

  let { metrics }: {
    metrics: { academicWorks: number; speakerSessions: number; innovations: number; professionalsReached: number }
  } = $props();
</script>

<section class="hero-band">
  <div class="hero-content">
    <p class="hero-overline">Healthcare Innovator · Pharmacist · Speaker</p>
    <h1 class="hero-headline">Suradet Pratomsak</h1>
    <p class="hero-subhead">
      Clinical pharmacist at Saraburi Provincial Hospital, transforming healthcare
      through innovation, education, and public health advocacy.
    </p>
    <div class="hero-actions">
      <a href="#projects" class="btn-primary">Explore my work</a>
      <a href="#identity" class="btn-secondary">Learn more</a>
    </div>
  </div>
  <div class="hero-metrics">
    <MetricsGrid {metrics} />
  </div>
</section>

<style>
  .hero-band {
    background-color: var(--color-canvas);
    padding-block: var(--space-section);
  }

  .hero-content {
    max-inline-size: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-gutter);
    text-align: center;
  }

  .hero-overline {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
    text-transform: uppercase;
    margin-block-end: var(--space-lg);
  }

  .hero-headline {
    font-size: var(--text-display-lg);
    font-weight: var(--text-display-lg-weight);
    line-height: var(--text-display-lg-line);
    color: var(--color-ink);
    max-inline-size: 800px;
    margin-inline: auto;
    margin-block-end: var(--space-md);
  }

  .hero-subhead {
    font-size: var(--text-title-md);
    font-weight: var(--text-title-md-weight);
    line-height: var(--text-title-md-line);
    color: var(--color-body);
    max-inline-size: 640px;
    margin-inline: auto;
    margin-block-end: var(--space-xl);
  }

  .hero-actions {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    margin-block-end: var(--space-section);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    font-size: var(--text-button);
    font-weight: var(--text-button-weight);
    line-height: var(--text-button-line);
    border-radius: var(--radius-lg);
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .btn-primary:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }

  .btn-secondary {
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
    border: 1px solid var(--color-hairline);
    cursor: pointer;
    transition: border-color 0.15s ease;
  }

  .btn-secondary:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }

  .hero-metrics {
    max-inline-size: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-gutter);
  }

  @media (max-inline-size: 768px) {
    .hero-band {
      padding-block: var(--space-xxl);
    }

    .hero-headline {
      font-size: var(--text-display-md);
    }

    .hero-subhead {
      font-size: var(--text-body-md);
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }

    .hero-overline {
      font-size: var(--text-body-md);
    }
  }
</style>
