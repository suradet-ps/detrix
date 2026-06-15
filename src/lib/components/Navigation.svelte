<script lang="ts">
  import { lockBodyScroll } from '$lib/utils/bodyLock.svelte';
  import { page } from '$app/stores';

  let isMenuOpen = $state(false);
  let isMobile = $state(false);
  let isScrolled = $state(false);
  let isHidden = $state(false);

  let lastScrollY = 0;
  const SCROLL_THRESHOLD = 10;

  $effect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    isMobile = mql.matches;
    const handler = (e: MediaQueryListEvent) => { isMobile = e.matches; };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  });

  $effect(() => {
    function handleScroll(): void {
      const currentScrollY = window.scrollY;

      isScrolled = currentScrollY > 10;

      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) < SCROLL_THRESHOLD) {
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY < 64) {
        isHidden = false;
      } else if (diff > 0) {
        isHidden = true;
      } else {
        isHidden = false;
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#identity', label: 'Profile' },
    { href: '#projects', label: 'Projects' },
    { href: '#speaker', label: 'Speaking' },
    { href: '#academic', label: 'Research' },
    { href: '#innovations', label: 'Innovations' }
  ];

  let currentPath = $derived($page.url.pathname);
  let isLoggedIn = $derived(!!$page.data.session);

  function isActive(href: string): boolean {
    if (href.startsWith('#')) return false;
    return currentPath === href;
  }

  function toggleMenu(): void {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu(): void {
    isMenuOpen = false;
  }

  $effect(() => {
    if (isMenuOpen) {
      return lockBodyScroll();
    }
  });

  $effect(() => {
    if (!isMobile && isMenuOpen) {
      isMenuOpen = false;
    }
  });
</script>

<nav class="top-nav" class:nav--scrolled={isScrolled} class:nav--hidden={isHidden} aria-label="Main navigation">
  <div class="nav-inner">
    <a href="/" class="nav-brand" onclick={closeMenu} aria-label="Home">
      <span class="brand-mark" aria-hidden="true">SP</span>
    </a>

    {#if !isMobile}
      <div class="nav-desktop-links">
        {#each navLinks as { href, label }}
          <a
            href={href}
            class="nav-desktop-link"
            class:nav-desktop-link--active={isActive(href)}
          >
            {label}
            <span class="nav-desktop-link-indicator" aria-hidden="true"></span>
          </a>
        {/each}
        {#if isLoggedIn}
          <a href="/add" class="nav-desktop-cta">+ Add</a>
          <a href="/api/auth/logout" class="nav-desktop-cta nav-desktop-cta--logout">Logout</a>
        {:else}
          <a href="/login" class="nav-desktop-cta">Login</a>
        {/if}
      </div>
    {/if}

    {#if isMobile}
      <button
        class="hamburger"
        class:hamburger--active={isMenuOpen}
        onclick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="nav-menu"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        type="button"
      >
        <span class="hamburger-line" aria-hidden="true"></span>
        <span class="hamburger-line" aria-hidden="true"></span>
        <span class="hamburger-line" aria-hidden="true"></span>
      </button>
    {/if}
  </div>
</nav>

<!-- Mobile overlay menu -->
<div
  id="nav-menu"
  class="nav-overlay"
  class:nav-overlay--open={isMenuOpen}
  aria-hidden={!isMenuOpen}
  role="dialog"
  aria-modal="true"
  aria-label="Navigation menu"
>
  <!-- backdrop click closes menu -->
  <div class="nav-overlay-bg" aria-hidden="true" onclick={closeMenu}></div>

  <div class="nav-overlay-content" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="none">
    <button
      class="nav-overlay-close"
      onclick={closeMenu}
      aria-label="Close menu"
      type="button"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    {#each navLinks as { href, label }, i}
      <a
        href={href}
        class="nav-overlay-link"
        style="--i: {i}"
        onclick={closeMenu}
      >
        <span class="nav-overlay-link-index" aria-hidden="true">0{i + 1}</span>
        <span class="nav-overlay-link-label">{label}</span>
      </a>
    {/each}
    {#if isLoggedIn}
      <a
        href="/add"
        class="nav-overlay-cta"
        style="--i: {navLinks.length}"
        onclick={closeMenu}
      >
        + Add Portfolio Item
      </a>
      <a
        href="/api/auth/logout"
        class="nav-overlay-cta"
        style="--i: {navLinks.length + 1}"
        onclick={closeMenu}
      >
        Logout
      </a>
    {:else}
      <a
        href="/login"
        class="nav-overlay-cta"
        style="--i: {navLinks.length}"
        onclick={closeMenu}
      >
        Login
      </a>
    {/if}
  </div>
</div>

<style>
  /* ─── Container ─── */
  .top-nav {
    position: sticky;
    inset-block-start: 0;
    z-index: var(--z-sticky);
    height: 64px;
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-hairline);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.3s ease;
  }

  .top-nav.nav--scrolled {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
  }

  .top-nav.nav--hidden {
    transform: translateY(-100%);
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

  /* ─── Brand ─── */
  .nav-brand {
    text-decoration: none;
    flex-shrink: 0;
  }

  .brand-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 36px;
    block-size: 36px;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: var(--radius-sm);
    transition: transform 0.2s ease;
  }

  .nav-brand:hover .brand-mark {
    transform: scale(1.05);
  }

  .nav-brand:focus-visible .brand-mark {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }

  /* ─── Desktop Links ─── */
  .nav-desktop-links {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  @media (max-inline-size: 767px) {
    .nav-desktop-links {
      display: none;
    }
  }

  .nav-desktop-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--text-body-md);
    font-weight: 500;
    color: var(--color-muted);
    text-decoration: none;
    border-radius: var(--radius-sm);
    transition: color 0.2s ease;
  }

  .nav-desktop-link:hover {
    color: var(--color-ink);
  }

  .nav-desktop-link:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }

  .nav-desktop-link--active {
    color: var(--color-ink);
  }

  .nav-desktop-link-indicator {
    position: absolute;
    inset-inline: var(--space-sm);
    inset-block-end: 0;
    block-size: 2px;
    background-color: var(--color-ink);
    border-radius: var(--radius-xs);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-desktop-link:hover .nav-desktop-link-indicator,
  .nav-desktop-link--active .nav-desktop-link-indicator {
    transform: scaleX(1);
  }

  .nav-desktop-cta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xxs);
    margin-inline-start: var(--space-sm);
    padding: var(--space-xs) var(--space-md);
    font-size: var(--text-body-md);
    font-weight: 500;
    color: var(--color-on-primary);
    background-color: var(--color-primary);
    border-radius: var(--radius-sm);
    text-decoration: none;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  .nav-desktop-cta:hover {
    background-color: var(--color-primary-active);
    transform: translateY(-1px);
  }

  .nav-desktop-cta:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }

  .nav-desktop-cta--logout {
    background-color: transparent;
    color: var(--color-muted);
    border: 1px solid var(--color-hairline);
  }

  .nav-desktop-cta--logout:hover {
    background-color: var(--color-surface-soft);
    color: var(--color-ink);
    transform: translateY(-1px);
  }

  /* ─── Hamburger ─── */
  .hamburger {
    display: flex;
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
    z-index: calc(var(--z-modal) + 1);
  }

  .hamburger-line {
    display: block;
    inline-size: 22px;
    block-size: 2px;
    background-color: var(--color-ink);
    border-radius: var(--radius-xs);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.2s ease;
    transform-origin: center;
  }

  .hamburger--active .hamburger-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger--active .hamburger-line:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .hamburger--active .hamburger-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .hamburger-line {
      transition: none;
    }
  }

  /* ─── Mobile Overlay ─── */
  .nav-overlay {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    pointer-events: none;
  }

  .nav-overlay--open {
    pointer-events: auto;
  }

  .nav-overlay-bg {
    position: absolute;
    inset: 0;
    background-color: rgba(24, 29, 38, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-overlay--open .nav-overlay-bg {
    opacity: 1;
  }

  .nav-overlay-content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-md);
    height: 100%;
    padding: var(--space-xxl);
    overflow-y: auto;
  }

  .nav-overlay-close {
    position: absolute;
    inset-block-start: var(--space-md);
    inset-inline-end: var(--space-md);
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 44px;
    block-size: 44px;
    background: transparent;
    border: none;
    color: var(--color-on-primary);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    -webkit-tap-highlight-color: transparent;
  }

  .nav-overlay--open .nav-overlay-close {
    opacity: 0.7;
    transition-delay: 0.3s;
  }

  .nav-overlay-close:hover {
    opacity: 1;
  }

  .nav-overlay-close:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  .nav-overlay-link {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-lg);
    text-decoration: none;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: calc(var(--i, 0) * 0.06s);
  }

  .nav-overlay--open .nav-overlay-link {
    opacity: 1;
    transform: translateY(0);
  }

  .nav-overlay-link-index {
    font-size: var(--text-caption);
    font-weight: 500;
    letter-spacing: var(--text-caption-spacing);
    color: rgba(255, 255, 255, 0.3);
    min-inline-size: 28px;
    font-feature-settings: 'tnum';
  }

  .nav-overlay-link-label {
    font-size: var(--text-display-md);
    font-weight: 400;
    color: var(--color-on-primary);
    position: relative;
  }

  .nav-overlay-link-label::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-end: -2px;
    block-size: 2px;
    background-color: var(--color-on-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-overlay-link:hover .nav-overlay-link-label::after,
  .nav-overlay-link:focus-visible .nav-overlay-link-label::after {
    transform: scaleX(1);
  }

  .nav-overlay-link:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
  }

  .nav-overlay-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-block-start: var(--space-lg);
    padding: var(--space-md) var(--space-xl);
    font-size: var(--text-button);
    font-weight: var(--text-button-weight);
    color: var(--color-ink);
    background-color: var(--color-canvas);
    border-radius: var(--radius-lg);
    text-decoration: none;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                background-color 0.2s ease;
    transition-delay: calc(var(--i, 0) * 0.06s + 0.1s);
  }

  .nav-overlay--open .nav-overlay-cta {
    opacity: 1;
    transform: translateY(0);
  }

  .nav-overlay-cta:hover {
    background-color: var(--color-surface-soft);
  }

  .nav-overlay-cta:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .top-nav {
      transition: none;
    }

    .nav-overlay-bg,
    .nav-overlay-link,
    .nav-overlay-cta {
      transition: none;
    }

    .nav-overlay-link {
      opacity: 1;
      transform: none;
    }

    .nav-overlay-cta {
      opacity: 1;
      transform: none;
    }

    .nav-overlay-link-label::after {
      transition: none;
    }
  }
</style>
