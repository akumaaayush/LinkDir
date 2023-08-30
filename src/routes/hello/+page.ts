//runs on server on first request and then next requests runs on browser. Cant use .env and firebase sdk

import type { PageLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageLoad;