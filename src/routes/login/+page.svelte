<script lang="ts">
  import { auth } from "$lib/firebase";
  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
  import { userStore } from "sveltefire";

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);

    const idToken = await credential.user.getIdToken();
    const res = await fetch("api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //csrf handled by sveltekit
      },
      body: JSON.stringify({ idToken }),
    });
  }

  async function signOutSSR() {
    const res = await fetch("api/signin", { method: "DELETE" });
    await signOut(auth);
  }

  const user = userStore(auth);
  // console.log($user);
</script>

<svelte:head>
  <title>Sign-in</title>
</svelte:head>

{#if $user}
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in!</p>
  <div class="flex flex-row gap-5">
    <button class="btn btn-warning" on:click={signOutSSR}>Sign out!</button>
    <a href="login/username" class="btn btn-primary">⮕ Next</a>
  </div>
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}
    >Sign in with Google</button
  >
{/if}
