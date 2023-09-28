<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  $: if (browser) {
    setTimeout(() => {
      goto("login");
    }, 1700);
  }
</script>

<svelte:head>
  <title>LinkDir</title>
</svelte:head>

<h1 class="text-3xl self-center text-success my-20">Welcome to LinkDir!</h1>
<h2 class="text-lg self-center text-info">
  You'll soon be redirected to login...
</h2>
