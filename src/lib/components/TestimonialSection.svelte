<script lang="ts">
  let { children }: { children: import('svelte').Snippet } = $props();
</script>

<div class="testimonial-grid">
  {@render children()}
</div>

<style>
  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }

  @media (max-inline-size: 1024px) {
    .testimonial-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-inline-size: 768px) {
    .testimonial-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
