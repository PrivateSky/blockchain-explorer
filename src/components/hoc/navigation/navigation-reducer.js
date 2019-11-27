import objectAssign from "object-assign";

import { NAVIGATED } from "constants/action-types";

export default function navigationReducer(state = {}, action) {
  switch (action.type) {
    case NAVIGATED:
      return objectAssign({}, state, { titleKey: action.titleKey, fullWidth: !!action.fullWidth });
    default:
      return state;
  }
}
