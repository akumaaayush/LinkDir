<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  $: if (browser) {
    goto("login");
  }
</script>

<svelte:head>
  <title>Redirecting...</title>
</svelte:head>

<h1>Redirecting...</h1>
