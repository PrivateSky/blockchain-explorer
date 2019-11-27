import { get } from "core/api-fetcher-dispatcher";

import { CURRENT_VERSION_DATA } from "constants/action-types";

export function doLoadCurrentVersionData({ forceRefresh = false } = {}) {
  return get("data/current-version", CURRENT_VERSION_DATA, {
    body: forceRefresh ? { forceRefresh: true } : undefined
  });
}
