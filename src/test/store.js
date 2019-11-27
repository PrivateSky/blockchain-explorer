import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";

import history from "core/history";

const middlewares = [routerMiddleware(history), thunk];
const mockStoreFn = configureStore(middlewares);

export function mockStore(state) {
  return mockStoreFn(state);
}
