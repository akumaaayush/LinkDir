<script lang="ts">
  import UserLink from "$lib/components/UserLink.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username}</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<h1 class="text-7xl text-purple-500 mx-auto">@{data.username}</h1>
<div class="min-h-screen max-w-70% mx-auto text-center mt-5">
  <div class="flex-col lg:flex-row row-start-1">
    <img
      src={data.photoURL}
      class="max-w-sm rounded-lg shadow-2xl"
      width="256"
      alt="photoURL"
    />
    <div>
      <p class="text-xl my-8">{data.bio ?? "no bio yet..."}</p>
      <ul class="list-none">
        {#each data.links as item}
          <UserLink {...item}   />
        {/each}
      </ul>
    </div>
  </div>
</div>
