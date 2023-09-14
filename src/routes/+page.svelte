<script>
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  $: if (browser) {
    goto("login");
  }
</script>

<h1>Redirecting...</h1>
