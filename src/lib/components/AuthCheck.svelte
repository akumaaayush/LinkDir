<script lang="ts">
  import { auth } from "$lib/firebase";
  import { userStore } from "sveltefire";

  const user = userStore(auth);
</script>

{#if $user}
  <slot />
{:else}
  <p class="text-error">You must be logged in to view this page!</p>
  <a class="btn btn-primary" href="/login"> Sign in</a>
{/if}
