<script lang="ts">
  import type { TimelineEntry } from '$lib/types/portfolio';

  let { entries }: { entries: TimelineEntry[] } = $props();

  function formatYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }

  function categoryLabel(type: string): string {
    const labels: Record<string, string> = {
      speaker: 'Speaking',
      academic: 'Research',
      innovation: 'Innovation',
      conference: 'Conference'
    };
    return labels[type] ?? type;
  }
</script>

<ol class="timeline">
  {#each entries as entry (entry.id)}
    <li class="timeline-item">
      <div class="timeline-dot" aria-hidden="true"></div>
      <div class="timeline-content">
        <div class="timeline-meta">
          <time class="timeline-year">{formatYear(entry.date)}</time>
          <span class="timeline-badge">{categoryLabel(entry.type)}</span>
        </div>
        <p class="timeline-title">{entry.title}</p>
      </div>
    </li>
  {/each}
</ol>

<style>
  .timeline {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }

  .timeline::before {
    content: '';
    position: absolute;
    inset-inline-start: 7px;
    inset-block-start: 0;
    inset-block-end: 0;
    inline-size: 2px;
    background-color: var(--color-hairline);
  }

  .timeline-item {
    display: flex;
    gap: var(--space-md);
    padding-block-end: var(--space-lg);
    position: relative;
  }

  @media (min-inline-size: 768px) {
    .timeline-item {
      gap: var(--space-xl);
      padding-block-end: var(--space-xl);
    }
  }

  .timeline-dot {
    flex-shrink: 0;
    inline-size: 16px;
    block-size: 16px;
    border-radius: var(--radius-full);
    background-color: var(--color-canvas);
    border: 2px solid var(--color-signature-coral);
    position: relative;
    z-index: var(--z-base);
    margin-block-start: var(--space-xxs);
  }

  .timeline-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
  }

  .timeline-meta {
    display: flex;
    gap: var(--space-sm);
    align-items: center;
  }

  .timeline-year {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
  }

  .timeline-badge {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    letter-spacing: var(--text-caption-spacing);
    color: var(--color-muted);
    padding: 2px var(--space-xs);
    border: 1px solid var(--color-hairline);
    border-radius: var(--radius-sm);
  }

  .timeline-title {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    line-height: var(--text-body-md-line);
    color: var(--color-ink);
  }
</style>
