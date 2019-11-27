import objectAssign from "object-assign";

import {
  CURRENT_VERSION_PAGE_UNMOUNTED,
  CURRENT_VERSION_DATA,
  CURRENT_VERSION_DATA_SUCCESS,
  CURRENT_VERSION_DATA_ERROR
} from "constants/action-types";

export default function currentVersionReducer(state = {}, action) {
  let { response } = action;

  switch (action.type) {
    case CURRENT_VERSION_DATA:
      return objectAssign({}, state, {
        requesting: true,
        requested: false,
        data: undefined,
        error: undefined
      });
    case CURRENT_VERSION_DATA_SUCCESS:
      return objectAssign({}, state, {
        requesting: false,
        requested: true,
        data: response
      });
    case CURRENT_VERSION_DATA_ERROR:
      return objectAssign({}, state, { requesting: false, error: response });

    case CURRENT_VERSION_PAGE_UNMOUNTED:
      return objectAssign({}, state, {
        requesting: false,
        requested: false,
        data: undefined,
        error: undefined
      });
    default:
      return state;
  }
}
