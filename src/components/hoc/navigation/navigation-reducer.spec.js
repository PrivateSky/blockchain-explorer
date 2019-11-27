import { NAVIGATED } from "constants/action-types";
import reducer from "./navigation-reducer";

describe("hoc::navigation::reducer", () => {
  const getInitialState = () => ({});

  const getAppState = () => ({
    titleKey: ""
  });

  it("should set initial state by default", () => {
    const action = { type: "UNKNOWN" };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle NAVIGATED", () => {
    let state = reducer(getAppState(), { type: NAVIGATED, titleKey: "key" });

    expect(state.titleKey).toEqual("key");
  });
});
