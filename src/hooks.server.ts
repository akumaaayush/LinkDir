import { adminAuth } from "$lib/server/admin";
import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get("__session");

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie as string
    );
    // console.log("found user id: ", decodedClaims.uid);
    event.locals.userId = decodedClaims.uid;
  } catch (e) {
    event.locals.userId = null;
    return resolve(event);
  }
  return resolve(event);
}) satisfies Handle;
