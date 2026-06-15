<script lang="ts">
  let { metrics }: {
    metrics: { academicWorks: number; speakerSessions: number; innovations: number; professionalsReached: number }
  } = $props();
</script>

<div class="metrics-grid">
  <div class="metric-item">
    <span class="metric-value">{metrics.academicWorks}+</span>
    <span class="metric-label">Academic Works</span>
  </div>
  <div class="metric-item">
    <span class="metric-value">{metrics.speakerSessions}+</span>
    <span class="metric-label">Speaker Sessions</span>
  </div>
  <div class="metric-item">
    <span class="metric-value">{metrics.innovations}+</span>
    <span class="metric-label">Innovations</span>
  </div>
  <div class="metric-item">
    <span class="metric-value">{metrics.professionalsReached}+</span>
    <span class="metric-label">Healthcare Professionals Reached</span>
  </div>
</div>

<style>
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-lg);
    border-top: 1px solid var(--color-hairline);
    padding-block-start: var(--space-xxl);
  }

  .metric-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    text-align: center;
  }

  .metric-value {
    font-size: var(--text-display-md);
    font-weight: var(--text-display-md-weight);
    line-height: var(--text-display-md-line);
    color: var(--color-ink);
  }

  .metric-label {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
  }

  @media (max-inline-size: 768px) {
    .metrics-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-lg);
    }

    .metric-value {
      font-size: var(--text-title-lg);
    }

    .metric-label {
      word-break: break-word;
      hyphens: auto;
    }
  }

  @media (max-inline-size: 480px) {
    .metrics-grid {
      gap: var(--space-md);
    }

    .metric-label {
      font-size: 12px;
    }
  }
</style>
