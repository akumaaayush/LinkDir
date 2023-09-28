<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Edit Bio</title>
</svelte:head>

<main class=" mx-auto max-w-md mt-5 space-y-4 prose">
  <h1 class="text-3xl text-center font-bold">Edit Bio</h1>
  <p class="text-lg break-words">
    Current Bio: <span class="text-info">{data.bio}</span>
  </p>

  <form method="POST" use:enhance>
    <div class="form-control my-5 flex flex-col">
      <label class="label-text text-lg" for="bio"
        >Bio: <span class="text-warning text-sm">(Upto 250 characters)</span
        ></label
      >
      <textarea
        name="bio"
        class="textarea textarea-accent textarea-bordered textarea-md resize h-min-200"
        maxlength="250"
        value={data.bio}
      />
      <button class="btn btn-primary mx-auto my-8">Submit</button>
    </div>
  </form>
</main>
