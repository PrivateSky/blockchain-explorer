import objectAssign from "object-assign";

import { APP_DATA_SUCCESS, APP_DATA_ERROR, APP_FRAME_UNMOUNTED } from "constants/action-types";

export default function dashboardReducer(state = {}, action) {
  let { response = {} } = action;

  switch (action.type) {
    case APP_DATA_SUCCESS:
      return objectAssign({}, state, { groups: response.groups || [], error: undefined });
    case APP_DATA_ERROR:
      return objectAssign({}, state, { groups: [], error: response });
    case APP_FRAME_UNMOUNTED:
      return objectAssign({}, state, { groups: [], error: undefined });

    default:
      return state;
  }
}
