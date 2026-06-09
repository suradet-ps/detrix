import type { Action } from 'svelte/action';

export const scrollReveal: Action<HTMLElement, void> = (node) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        node.classList.add('is-revealed');
        observer.unobserve(node);
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(node);

  return {
    destroy(): void {
      observer.disconnect();
    }
  };
};
