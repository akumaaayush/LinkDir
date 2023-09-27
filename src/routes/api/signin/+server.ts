import { adminAuth } from "$lib/server/admin";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { idToken } = await request.json();
  // console.log(idToken);
  const expiresIn = 60 * 60 * 24 * 5 * 1000; //for 5 days
  const decodeIdToken = await adminAuth.verifyIdToken(idToken);

  //check if user authenticated recently
  if (new Date().getTime() / 1000 - decodeIdToken.auth_time < 5 * 60) {
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    //firebase "__session" convention
    cookies.set("__session", cookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return json({ status: "signedIn" });
  } else {
    throw error(403, "Recent sign is required!");
  }
};

export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete("__session", { path: "/" });
  return json({ status: "signedOut" });
};
