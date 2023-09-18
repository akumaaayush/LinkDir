import { db } from "$lib/firebase";
import { error } from "@sveltejs/kit";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  const collectionRef = collection(db, "users");

  const q = query(
    collectionRef,
    where("username", "==", params.username),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const exists = snapshot.docs[0]?.exists();
  const data = snapshot.docs[0]?.data();
  console.log(data);

  if (!exists) {
    throw error(404, "That user does not exist");
  }
  if (!data.published) {
    throw error(403, `The profile of @${data.username} does not exist.`);
  }

  return {
    username: data.username,
    photoURL: data.photoURL,
    bio: data.bio,
    links: data.links ?? [],
  };
}) satisfies PageLoad;
