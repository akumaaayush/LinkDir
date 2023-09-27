<script lang="ts">
  import { page } from "$app/stores";
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import SortableList from "$lib/components/SortableList.svelte";
  import UserLink from "$lib/components/UserLink.svelte";
  import { db, user, userData } from "$lib/firebase";
  import {
    arrayRemove,
    arrayUnion,
    doc,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  import { writable } from "svelte/store";

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

  async function toggleProfileStatus(item: any) {
    const userRef = doc(db, "users", $user!.uid);
    await updateDoc(userRef, {
      published: !$userData?.published,
    });
  }

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

  function sortList(e: CustomEvent) {
    const newList = e.detail;
    const userRef = doc(db, "users", $user!.uid);
    setDoc(userRef, { links: newList }, { merge: true });
  }

  function cancelLink() {
    formData.set(formDefaults);
    showForm = false;
  }
  console.log($userData?.links);
</script>

<main class="max-w-xl mx-auto mt-5 flex flex-col items-center space-y-4">
  <AuthCheck>
    {#if $userData?.username == $page.params.username}
      <h1 class="mx-2 text-2xl font-bold mt-8 mb-4">Edit your Profile</h1>
      <h2 class="text-2xl text-purple-500">
        The link is: <span class="text-white">
          https://gg.com/@{$userData?.username}
        </span>
      </h2>
      <div>
        <a href="/login/photo" class="btn btn-outline btn-success"
          >Change Photo</a
        >
      </div>
      <div>
        <a
          href={`/${$userData.username}/bio`}
          class="btn btn-outline btn-success">Change Bio</a
        >
      </div>
      <form class="form-control">
        <label class="label cursor-pointer flex items-start justify-center">
          <span class="label-text mr-6">
            <div
              class="tooltip group-hover:tooltip-open"
              data-tip="If public, the world can see your profile"
            >
              {$userData?.published ? "Public profile" : "Private profile"}
            </div>
          </span>
          <input
            type="checkbox"
            class="toggle toggle-success"
            checked={$userData?.published}
            on:change={toggleProfileStatus}
          />
        </label>
      </form>
      <SortableList
        list={$userData?.links}
        on:sort={sortList}
        let:item
        let:index
      >
        <div class="group relative">
          <UserLink {...item} />
          <button
            on:click={() => DeleteLink(item)}
            class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10 hover:bg-red-500"
            >Delete</button
          >
        </div>
      </SortableList>
      {#if showForm}
        <form
          on:submit|preventDefault={addLink}
          class="bg-base-200 p-6 w-full mx-auto rounded-xl"
        >
          <select
            name="icon"
            class="select select-m"
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
            class="input input-m m-3"
            bind:value={$formData.title}
          />
          <input
            name="url"
            type="text"
            placeholder="URL"
            class="input input-m"
            bind:value={$formData.url}
          />
          <div class="my-4">
            {#if !titleIsValid}
              <p class="text-error text-xs">⚠️: Must have valid title</p>
            {/if}
            {#if !urlIsValid}
              <p class="text-error text-xs">⚠️: Must have a valid URL</p>
            {/if}
            {#if formIsValid}
              <p class="text-success text-xs">👍 Looks good!</p>
            {/if}
          </div>

          <button
            disabled={!formIsValid}
            type="submit"
            class="btn btn-success block">Add Link</button
          >

          <button type="button" class="btn btn-xs my-6" on:click={cancelLink}
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
  </AuthCheck>
</main>
