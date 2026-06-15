<script lang="ts">
  import { page } from '$app/stores';
  import Navigation from '$lib/components/Navigation.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let error = $derived($page.error);
  let status = $derived($page.status);
</script>

<a href="#main-content" class="skip-to-content">Skip to content</a>
<Navigation />
<main id="main-content">
  <div class="error-page">
    <p class="error-code">{status}</p>
    <h1 class="error-headline">
      {#if status === 404}
        ไม่พบหน้าที่คุณต้องการ
      {:else if status === 403}
        คุณไม่มีสิทธิ์เข้าถึงหน้านี้
      {:else if status === 429}
        คำขอมากเกินไป กรุณาลองใหม่ภายหลัง
      {:else}
        เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
      {/if}
    </h1>
    <p class="error-description">
      {#if status === 404}
        หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่มีอยู่
      {:else}
        กรุณาลองใหม่อีกครั้งในภายหลัง หากปัญหายังคงอยู่ กรุณาติดต่อผู้ดูแลระบบ
      {/if}
    </p>
    <a href="/" class="btn-primary">กลับหน้าแรก</a>
  </div>
</main>
<Footer />

<style>
  .error-page {
    max-inline-size: 640px;
    margin-inline: auto;
    padding-inline: var(--container-gutter);
    padding-block: var(--space-section);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }

  .error-code {
    font-size: clamp(4rem, 10vw, 8rem);
    font-weight: 500;
    line-height: 1;
    color: var(--color-signature-coral);
    margin: 0;
  }

  .error-headline {
    font-size: clamp(1.5rem, 4vw, var(--text-display-md));
    font-weight: var(--text-display-md-weight);
    line-height: var(--text-display-md-line);
    color: var(--color-ink);
    margin: 0;
  }

  .error-description {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    line-height: var(--text-body-md-line);
    color: var(--color-body);
    margin: 0;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-md) var(--space-lg);
    min-block-size: 48px;
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    font-size: var(--text-button);
    font-weight: var(--text-button-weight);
    line-height: var(--text-button-line);
    border-radius: var(--radius-lg);
    text-decoration: none;
    border: none;
    cursor: pointer;
    margin-block-start: var(--space-md);
  }

  .btn-primary:focus-visible {
    outline: 2px solid var(--color-info-border);
    outline-offset: 2px;
  }
</style>
