<script lang="ts">
  import '../lib/styles/global.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Notification from '$lib/components/Notification.svelte';
  let { children } = $props();
</script>

<Navbar />
{@render children()}
<Notification />
