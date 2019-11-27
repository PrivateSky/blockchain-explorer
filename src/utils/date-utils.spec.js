import moment from "moment";

import { shortDate, longDate } from "./date-utils";

describe("utils::date", () => {
  describe("shortDate", () => {
    it("should work with invalid input", () => {
      expect(shortDate()).toBe("");
      expect(shortDate(null)).toBe("");
      expect(shortDate(2)).toBe("");
    });

    it("should format correctly", () => {
      expect(shortDate("2019-01-01T08:00:00.000Z")).toBe("2019-01-01");
    });
  });

  describe("longDate", () => {
    it("should work with invalid input", () => {
      expect(longDate()).toBe("");
      expect(longDate(null)).toBe("");
      expect(longDate(2)).toBe("");
    });

    it("should format correctly", () => {
      let tzOffsetInHours = moment().utcOffset() / 60;

      let inputHour = 12;
      let inputDate = `2019-01-01T${inputHour}:00:00.000Z`;

      let expectedHour = inputHour + tzOffsetInHours;
      expectedHour = expectedHour >= 10 ? expectedHour : `0${expectedHour}`;

      expect(longDate(inputDate)).toBe(`2019-01-01 ${expectedHour}:00:00`);
    });
  });
});
