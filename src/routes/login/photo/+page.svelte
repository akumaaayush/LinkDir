<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { auth, db, storage, userData } from "$lib/firebase";
  import { doc, updateDoc } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { userStore } from "sveltefire";

  const user = userStore(auth);
  let previewURL: string;
  let uploading = false;
  $: href = `/${$userData?.username}/edit`;

  async function upload(e: any) {
    uploading = true;
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file);
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
    const result = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(result.ref);

    await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
    uploading = false;
  }
</script>

<AuthCheck>
  <h2 class="card-title">Upload a Profile photo</h2>
  <form class="w-full max-w-screen-md">
    <div class="form-control w-full max-w-xs text-center mx-auto">
      <img
        src={previewURL ?? $userData?.photoURL ?? "/user.png"}
        alt="photoURL"
        width="256"
        height="256"
        class="mx-auto"
      />
      <label for="photoURL" class="label mt-4">
        <span class="label-text">Pick an image:</span>
      </label>
      <input
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        name="photoURL"
        accept="image/jpeg, image/png, image/gif, image/webp"
        on:change={upload}
      />
      {#if uploading}
        <p class="mt-6">Uploading...</p>
        <progress class="progress w-full progress-info" />
      {/if}
    </div>
  </form>
  <a {href} class="btn btn-primary mt-5">Finish</a>
</AuthCheck>
