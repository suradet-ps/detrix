<script lang="ts">
  let { children }: { children: import('svelte').Snippet } = $props();

  let node: HTMLElement | undefined = $state();
  let isRevealed = $state(false);

  $effect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isRevealed = true;
          observer.unobserve(node!);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  });
</script>

{#if isRevealed}
  <div bind:this={node} class="section-reveal is-revealed">
    {@render children()}
  </div>
{:else}
  <div bind:this={node} class="section-reveal">
    {@render children()}
  </div>
{/if}

<style>
  .section-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .section-reveal.is-revealed {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .section-reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
