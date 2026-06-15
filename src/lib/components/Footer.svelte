<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <span class="footer-name">Suradet Pratomsak</span>
      <span class="footer-tagline">Healthcare Innovator · Pharmacist · Speaker</span>
    </div>
    <div class="footer-legal">
      <span>&copy; {currentYear} Suradet Pratomsak. All rights reserved.</span>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--color-canvas);
    border-top: 1px solid var(--color-hairline);
    padding-block: var(--space-xxl);
  }

  .footer-inner {
    max-inline-size: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-gutter);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    align-items: center;
    text-align: center;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
  }

  .footer-name {
    font-size: var(--text-label-md);
    font-weight: var(--text-label-md-weight);
    color: var(--color-ink);
  }

  .footer-tagline {
    font-size: var(--text-body-md);
    font-weight: var(--text-body-md-weight);
    color: var(--color-muted);
  }

  .footer-legal {
    font-size: var(--text-caption);
    font-weight: var(--text-caption-weight);
    color: var(--color-muted);
    letter-spacing: var(--text-caption-spacing);
  }

  @media (max-inline-size: 768px) {
    .footer {
      padding-block: var(--space-xl);
    }
  }
</style>
