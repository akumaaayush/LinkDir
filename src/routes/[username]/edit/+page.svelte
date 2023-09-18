<script lang="ts">
  import { writable } from "svelte/store";
  import { db, user, userData } from "$lib/firebase";
  import { page } from "$app/stores";
  import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
  import AuthCheck from "$lib/components/AuthCheck.svelte";

  const icons = [
    "Twitter",
    "YouTube",
    "TikTok",
    "LinkedIn",
    "GitHub",
    "Custom",
  ];

  const formDefaults = {
    icon: "custom",
    title: "",
    url: "https://",
  };

  const formData = writable(formDefaults);
  let showForm = false;

  $: urlIsValid = $formData.url.match(
    /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/[\w.-]*)*\/?$/
  );
  $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
  $: formIsValid = urlIsValid && titleIsValid;

  async function addLink() {
    const userRef = doc(db, "users", $user!.uid);

    await updateDoc(userRef, {
      links: arrayUnion({ ...$formData, id: Date.now().toString() }),
    });

    formData.set({ icon: "", title: "", url: "" });
    showForm = false;
  }

  async function DeleteLink(item: any) {
    const userRef = doc(db, "users", $user!.uid);
    await updateDoc(userRef, { links: arrayRemove(item) });
  }

  function cancelLink() {
    formData.set(formDefaults);
    showForm = false;
  }
</script>

<AuthCheck>
  <main class="max-w-xl mx-auto">
    {#if $userData?.username == $page.params.username}
      <h1 class="mx-2 text-2xl font-bold mt-8 mb-4 text-center">
        Edit your Profile
      </h1>

      <!-- INSERT sortable list here -->

      {#if showForm}
        <form
          on:submit|preventDefault={addLink}
          class="bg-base-200 p-6 w-full mx-auto rounded-xl"
        >
          <select
            name="icon"
            class="select select-sm"
            bind:value={$formData.icon}
          >
            {#each icons as icon}
              <option value={icon.toLowerCase()}>{icon}</option>
            {/each}
          </select>
          <input
            name="title"
            type="text"
            placeholder="Title"
            class="input input-sm"
            bind:value={$formData.title}
          />
          <input
            name="url"
            type="text"
            placeholder="URL"
            class="input input-sm"
            bind:value={$formData.url}
          />
          <div class="my-4">
            {#if !titleIsValid}
              <p class="text-error text-xs">Must have valid title</p>
            {/if}
            {#if !urlIsValid}
              <p class="text-error text-xs">Must have a valid URL</p>
            {/if}
            {#if formIsValid}
              <p class="text-success text-xs">Looks good!</p>
            {/if}
          </div>

          <button
            disabled={!formIsValid}
            type="submit"
            class="btn btn-success block">Add Link</button
          >

          <button type="button" class="btn btn-xs my-4" on:click={cancelLink}
            >Cancel</button
          >
        </form>
      {:else}
        <button
          on:click={() => (showForm = true)}
          class="btn btn-outline btn-info block mx-auto my-4"
        >
          Add a Link
        </button>
      {/if}
    {/if}
  </main>
</AuthCheck>
