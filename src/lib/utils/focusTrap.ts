import type { Action } from 'svelte/action';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const focusTrap: Action<HTMLElement, void> = (node) => {
  function handleKeydown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;

    const focusableElements = node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusableElements.length === 0) return;

    const first = focusableElements[0]!;
    const last = focusableElements[focusableElements.length - 1]!;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  node.addEventListener('keydown', handleKeydown);

  const previouslyFocused = document.activeElement as HTMLElement | null;

  requestAnimationFrame(() => {
    const firstFocusable = node.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();
  });

  return {
    destroy(): void {
      node.removeEventListener('keydown', handleKeydown);
      previouslyFocused?.focus();
    }
  };
};
