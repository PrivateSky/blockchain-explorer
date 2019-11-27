import { APP_DATA } from "constants/action-types";
import { get } from "core/api-fetcher-dispatcher";

export function doGetData() {
  return get("data", APP_DATA);
}
