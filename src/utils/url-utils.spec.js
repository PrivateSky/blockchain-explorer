import constructApiPath from "./url-utils";

describe("utils::url", () => {
  describe("constructApiPath", () => {
    it("should return prefixed api path", () => {
      expect(constructApiPath("account/login")).toBe("/api/account/login");
    });
  });
});
