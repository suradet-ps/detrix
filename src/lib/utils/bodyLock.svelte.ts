let lockCount = $state(0);

export function lockBodyScroll(): () => void {
  lockCount++;

  if (lockCount === 1) {
    document.body.style.overflow = 'hidden';
  }

  return () => {
    lockCount--;
    if (lockCount <= 0) {
      lockCount = 0;
      document.body.style.overflow = '';
    }
  };
}
