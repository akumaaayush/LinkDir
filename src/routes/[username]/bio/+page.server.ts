import type { PageServerLoad } from "./$types";
import { adminDB } from "$lib/server/admin";
import { error, redirect } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
  const uid = locals.userId;

  if (!uid) {
    throw redirect(301, "/login");
  }

  const userDoc = await adminDB.collection("users").doc(uid!).get();
  const { username, bio } = userDoc.data()!;

  if (params.username !== username) {
    throw error(401, "That username does not belong to you");
  }
  return {
    bio,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ locals, params, request }) => {
    const uid = locals.userId;

    const data = await request.formData();
    const bio = data.get("bio");

    const userRef = adminDB.collection("users").doc(uid!);
    const userDoc = await userRef.get();
    const { username } = userDoc.data()!;

    if (params.username !== username) {
      throw error(401, "That username does not belong to you");
    }

    await userRef.update({ bio });
  },
};
