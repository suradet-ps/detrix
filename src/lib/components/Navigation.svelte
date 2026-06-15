<script lang="ts">
  let isMenuOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#identity', label: 'Profile' },
    { href: '#projects', label: 'Projects' },
    { href: '#speaker', label: 'Speaking' },
    { href: '#academic', label: 'Research' },
    { href: '#innovations', label: 'Innovations' },
    { href: '/add', label: 'Add' }
  ];

  function toggleMenu(): void {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu(): void {
    isMenuOpen = false;
  }

  $effect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<nav class="top-nav" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="/" class="nav-brand" onclick={closeMenu}>
      <span class="brand-name">SP</span>
      <span class="brand-divider" aria-hidden="true">·</span>
      <span class="brand-role">Portfolio</span>
    </a>

    <button
      class="hamburger"
      class:hamburger--active={isMenuOpen}
      onclick={toggleMenu}
      aria-expanded={isMenuOpen}
      aria-controls="nav-menu"
      aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      type="button"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>

    <div
      id="nav-menu"
      class="nav-menu"
      class:nav-menu--open={isMenuOpen}
      role="list"
      aria-hidden={!isMenuOpen}
    >
      {#each navLinks as { href, label }}
        <a
          href={href}
          class="nav-link"
          onclick={closeMenu}
        >
          {label}
        </a>
      {/each}
    </div>
  </div>
</nav>

<style>
  .top-nav {
    position: sticky;
    inset-block-start: 0;
    z-index: var(--z-sticky);
    height: 64px;
    background-color: var(--color-canvas);
    border-bottom: 1px solid var(--color-hairline);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-inline-size: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-gutter);
    height: 100%;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--color-ink);
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    text-decoration: none;
  }

  .brand-name {
    font-weight: 500;
  }

  .brand-divider {
    color: var(--color-muted);
  }

  .brand-role {
    color: var(--color-muted);
  }

  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    min-inline-size: 44px;
    min-block-size: 44px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .hamburger span {
    display: block;
    inline-size: 20px;
    block-size: 2px;
    background-color: var(--color-ink);
    border-radius: var(--radius-xs);
    transition: transform 0.2s ease;
    transform-origin: center;
  }

  .hamburger--active span:first-child {
    transform: rotate(45deg) translate(2px, 5px);
  }

  .hamburger--active span:last-child {
    transform: rotate(-45deg) translate(2px, -5px);
  }

  @media (prefers-reduced-motion: reduce) {
    .hamburger span {
      transition: none;
    }
  }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: var(--space-xl);
  }

  .nav-link {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    color: var(--color-body);
    text-decoration: none;
    transition: color 0.15s ease;
    padding-block: var(--space-xs);
  }

  .nav-link:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 4px;
    border-radius: var(--radius-xs);
  }

  @media (max-inline-size: 768px) {
    .hamburger {
      display: flex;
      z-index: calc(var(--z-modal) + 1);
    }

    .nav-menu {
      display: none;
      position: fixed;
      inset: 0;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: var(--space-xl);
      background-color: var(--color-canvas);
      z-index: var(--z-modal);
    }

    .nav-menu--open {
      display: flex;
    }

    .nav-link {
      padding: var(--space-md);
      font-size: var(--text-title-md);
      font-weight: var(--text-title-md-weight);
    }
  }
</style>
