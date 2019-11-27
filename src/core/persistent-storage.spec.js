import { init, getItem, setItem, removeItem, clear } from "./persistent-storage";

const KEY = "key";

describe("core::persistent-storage", () => {
  beforeEach(() => {
    init();
  });

  it("should get previously set item", () => {
    let value1 = "value1";
    let value2 = "value2";

    setItem(KEY, value1);

    expect(getItem(KEY)).toEqual(value1);

    setItem(KEY, value2);
    setItem(KEY, value1);
    expect(getItem(KEY)).toEqual(value1);
  });

  it("should remove previously set item", () => {
    let value = "value";

    setItem(KEY, value);
    expect(getItem(KEY)).toEqual(value);

    removeItem(KEY);
    expect(getItem(KEY)).toBeNull();
  });

  it("should clear previously set item", () => {
    let value = "value";

    setItem(KEY, value);
    expect(getItem(KEY)).toEqual(value);

    clear();
    expect(getItem(KEY)).toBeNull();
  });
});
