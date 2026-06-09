<script lang="ts">
  import { page } from '$app/stores';

  let isMenuOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'ผลงานทั้งหมด' },
    { href: '/add', label: 'เพิ่มผลงาน' }
  ];

  function toggleMenu(): void {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu(): void {
    isMenuOpen = false;
  }
</script>

<nav class="navbar" aria-label="Main navigation">
  <div class="nav-container">
    <a href="/" class="nav-brand" onclick={closeMenu}>
      Suradet | Portfolio
    </a>

    <button
      class="hamburger-menu"
      class:is-active={isMenuOpen}
      onclick={toggleMenu}
      aria-expanded={isMenuOpen}
      aria-controls="nav-links"
      aria-label={isMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>

    <div
      id="nav-links"
      class="nav-links"
      class:nav-links-mobile-active={isMenuOpen}
      role="menubar"
    >
      {#each navLinks as { href, label }}
        <a
          href={href}
          role="menuitem"
          class:active={$page.url.pathname === href}
          onclick={closeMenu}
        >
          {label}
        </a>
      {/each}
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: var(--color-surface);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-border);
    padding-block: var(--space-4);
    position: sticky;
    inset-block-start: 0;
    z-index: var(--z-sticky);
    box-shadow: var(--shadow-sm);
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-inline-size: 1100px;
    margin-inline: auto;
    padding-inline: var(--space-8);
  }

  .nav-brand {
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-text-primary);
    transition: color var(--transition-fast);
  }

  .nav-brand:hover {
    color: var(--color-accent);
  }

  .nav-links {
    display: flex;
    gap: var(--space-6);
  }

  .nav-links a {
    padding-block: var(--space-2);
    padding-inline: var(--space-4);
    font-weight: 500;
    color: var(--color-text-secondary);
    position: relative;
    transition: color var(--transition-fast);
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: 50%;
    transform: translateX(-50%);
    inline-size: 0;
    block-size: 2px;
    background-color: var(--color-accent);
    transition: inline-size var(--transition-base);
  }

  .nav-links a:hover::after,
  .nav-links a.active::after {
    inline-size: 100%;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: var(--color-text-primary);
  }

  .hamburger-menu {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    inline-size: 2rem;
    block-size: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: calc(var(--z-modal) + 1);
    padding: 0;
  }

  .hamburger-menu span {
    inline-size: 2rem;
    block-size: 2px;
    background: var(--color-text-primary);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
    transform-origin: center;
  }

  .hamburger-menu.is-active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .hamburger-menu.is-active span:nth-child(2) {
    opacity: 0;
    transform: translateX(-20px);
  }

  .hamburger-menu.is-active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  @media (max-inline-size: 768px) {
    .hamburger-menu {
      display: flex;
    }

    .nav-links {
      display: none;
      position: absolute;
      inset-block-start: 100%;
      inset-inline-start: 0;
      inline-size: 100%;
      flex-direction: column;
      align-items: center;
      background-color: var(--color-surface);
      padding-block: var(--space-4);
      border-block-start: 1px solid var(--color-border);
    }

    .nav-links.nav-links-mobile-active {
      display: flex;
    }

    .nav-links a {
      padding-block: var(--space-4);
      inline-size: 100%;
      text-align: center;
    }
  }
</style>
