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
    gap: 5px;
    inline-size: 32px;
    block-size: 32px;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
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
    }

    .nav-menu {
      display: none;
      position: absolute;
      inset-block-start: 64px;
      inset-inline-start: 0;
      inline-size: 100%;
      flex-direction: column;
      gap: 0;
      background-color: var(--color-canvas);
      border-bottom: 1px solid var(--color-hairline);
      padding-block: var(--space-sm);
    }

    .nav-menu--open {
      display: flex;
    }

    .nav-link {
      padding: var(--space-md) var(--container-gutter);
      inline-size: 100%;
    }
  }
</style>
