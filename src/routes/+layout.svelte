<script lang="ts">
  import '../lib/styles/global.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import Notification from '$lib/components/Notification.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

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
