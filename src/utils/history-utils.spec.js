import history from "core/history";
import { push } from "./history-utils";

describe("utils::history", () => {
  describe("push", () => {
    it("should call push", () => {
      let route = "/login";
      history.push = jest.fn();

      push(route);

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith(route);
    });
  });
});
