<script lang="ts">
  import '../lib/styles/global.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import Notification from '$lib/components/Notification.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <html lang="th"></html>
  <title>Suradet Pratomsak - Clinical Pharmacist & Healthcare Innovator</title>
  <meta name="description" content="Portfolio of Suradet Pratomsak, clinical pharmacist at Saraburi Provincial Hospital specializing in healthcare innovation, education, and public health advocacy." />
  <meta property="og:title" content="Suradet Pratomsak - Healthcare Innovator" />
  <meta property="og:description" content="Clinical pharmacist transforming healthcare through innovation, education, and public health advocacy." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://suradet.dev" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Suradet Pratomsak - Healthcare Innovator" />
  <meta name="twitter:description" content="Clinical pharmacist transforming healthcare through innovation, education, and public health advocacy." />
  <link rel="canonical" href="https://suradet.dev" />
</svelte:head>

<a href="#main-content" class="skip-to-content">Skip to content</a>
<Navigation />
<Notification />
<main id="main-content">
  {@render children()}
</main>
<Footer />

<style>
  main {
    min-block-size: 60vh;
  }
</style>
