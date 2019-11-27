import { get } from "core/api-fetcher-dispatcher";

import { TRANSACTIONS_LOG_DATA } from "constants/action-types";

export function doLoadTransactionsLogData({ forceRefresh = false } = {}) {
  return get("data/transactions-log", TRANSACTIONS_LOG_DATA, {
    body: forceRefresh ? { forceRefresh: true } : undefined
  });
}
