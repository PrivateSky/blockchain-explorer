import objectAssign from "object-assign";

import {
  TRANSACTIONS_LOG_PAGE_UNMOUNTED,
  TRANSACTIONS_LOG_DATA,
  TRANSACTIONS_LOG_DATA_SUCCESS,
  TRANSACTIONS_LOG_DATA_ERROR
} from "constants/action-types";

export default function transactionsLogReducer(state = {}, action) {
  let { response } = action;

  switch (action.type) {
    case TRANSACTIONS_LOG_DATA:
      return objectAssign({}, state, {
        requesting: true,
        requested: false,
        data: undefined,
        latestTransaction: undefined,
        error: undefined
      });
    case TRANSACTIONS_LOG_DATA_SUCCESS:
      return objectAssign({}, state, {
        requesting: false,
        requested: true,
        latestTransaction: (response.data || [])[0],
        data: response.data || []
      });
    case TRANSACTIONS_LOG_DATA_ERROR:
      return objectAssign({}, state, { requesting: false, error: response });

    case TRANSACTIONS_LOG_PAGE_UNMOUNTED:
      return objectAssign({}, state, {
        requesting: false,
        requested: false,
        data: undefined,
        latestTransaction: undefined,
        error: undefined
      });
    default:
      return state;
  }
}
