<script lang="ts">
  let { children }: { children: import('svelte').Snippet } = $props();

  let node: HTMLDivElement | undefined = $state();
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

<div
  bind:this={node}
  class="section-reveal"
  class:is-revealed={isRevealed}
>
  {@render children()}
</div>

<style>
  .section-reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
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
