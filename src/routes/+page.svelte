<script lang="ts">
  import type { PageProps } from './$types';
  import PortfolioDetailModal from '$lib/components/PortfolioDetailModal.svelte';
  import { scrollReveal } from '$lib/utils/scrollReveal';
  import { formatDate } from '$lib/utils/date';
  import type { PortfolioItem } from '$lib/types/portfolio';

  let { data }: PageProps = $props();

  let items = $derived(data.items);
  let grouped = $derived(data.grouped);

  let isModalOpen = $state(false);
  let selectedItem = $state<PortfolioItem | null>(null);

  function openModal(item: PortfolioItem): void {
    selectedItem = item;
    isModalOpen = true;
  }

  function closeModal(): void {
    isModalOpen = false;
    selectedItem = null;
  }
</script>

<main class="container">
  <section class="hero">
    <h1>Suradet Pratomsak</h1>
    <p class="tagline">
      เภสัชกรชำนาญการ โรงพยาบาลสระโบสถ์ นักพัฒนา, วิทยากร, และผู้สร้างสรรค์นวัตกรรม
      ที่นี่คือพื้นที่รวบรวมผลงานและประสบการณ์ของผม
    </p>
  </section>

  {#if items.length === 0}
    <div class="state-message empty-state">
      ยังไม่มีผลงานในระบบ...
      <a href="/add">เพิ่มผลงานชิ้นแรก!</a>
    </div>
  {/if}

  {#if items.length > 0}
    {#each Object.entries(grouped) as [category, categoryItems]}
      <section use:scrollReveal class="category-section">
        <h2 class="category-title">{category}</h2>
        <div class="item-title-list">
          {#each categoryItems as item (item.id)}
            <button
              class="item-title"
              onclick={() => openModal(item)}
              aria-label="ดูรายละเอียด: {item.title}"
              type="button"
            >
              <span class="title-text">{item.title}</span>
              <span class="item-date">{formatDate(item.start_date)}</span>
            </button>
          {/each}
        </div>
      </section>
    {/each}
  {/if}
</main>

{#if isModalOpen && selectedItem}
  <PortfolioDetailModal item={selectedItem} onclose={closeModal} />
{/if}

<style>
  .container {
    max-inline-size: 1100px;
    margin-inline: auto;
    padding-inline: var(--space-8);
    padding-block: var(--space-8);
  }

  .hero {
    text-align: center;
    padding-block: var(--space-16) var(--space-10);
    border-block-end: 1px solid var(--color-border);
    margin-block-end: var(--space-16);
  }

  .hero h1 {
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--color-accent);
    margin-block-end: var(--space-4);
    letter-spacing: -0.02em;
  }

  .tagline {
    font-size: var(--text-lg);
    color: var(--color-text-secondary);
    max-inline-size: 700px;
    margin-inline: auto;
    line-height: 1.8;
  }

  .category-section {
    margin-block-end: var(--space-16);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }

  :global(.category-section.is-revealed) {
    opacity: 1;
    transform: translateY(0);
  }

  .category-title {
    font-size: var(--text-2xl);
    font-weight: 600;
    margin-block-end: var(--space-8);
    position: relative;
    padding-inline-start: var(--space-6);
  }

  .category-title::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: 50%;
    transform: translateY(-50%);
    block-size: 70%;
    inline-size: 4px;
    background-color: var(--color-accent);
    border-radius: var(--radius-sm);
  }

  .item-title-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    inline-size: 100%;
    padding: var(--space-5) var(--space-6);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-align: start;
    font-family: var(--font-sans);
    font-size: var(--text-base);
    color: var(--color-text-primary);
  }

  .item-title:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(43, 108, 176, 0.1);
  }

  .item-title:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .title-text {
    font-weight: 500;
  }

  .item-date {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    flex-shrink: 0;
    margin-inline-start: var(--space-4);
  }

  .state-message {
    text-align: center;
    padding-block: var(--space-16);
    color: var(--color-text-secondary);
    font-size: var(--text-lg);
  }

  .empty-state a {
    font-weight: 600;
  }

  @media (max-inline-size: 768px) {
    .container {
      padding-inline: var(--space-4);
    }

    .hero {
      padding-block: var(--space-10) var(--space-8);
    }

    .hero h1 {
      font-size: var(--text-3xl);
    }

    .tagline {
      font-size: var(--text-base);
    }

    .category-title {
      font-size: var(--text-xl);
    }

    .item-title {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
    }

    .item-date {
      margin-inline-start: 0;
    }
  }
</style>
