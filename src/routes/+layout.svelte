<script lang="ts">
  import '../lib/styles/global.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();
</script>

<Navigation />
<main id="main-content">
  {@render children()}
</main>
<Footer />
