import { StorageHelper, zustandStorage, queryStorage } from "./storage";

jest.mock("react-native-mmkv", () => {
  const store = new Map<string, string>();
  return {
    createMMKV: () => ({
      set: (key: string, value: string) => store.set(key, value),
      getString: (key: string) => store.get(key),
      remove: (key: string) => store.delete(key),
      clearAll: () => store.clear(),
    }),
  };
});

describe("zustandStorage adapter", () => {
  afterEach(() => {
    zustandStorage.removeItem("test-key");
  });

  it("stores and retrieves values", () => {
    zustandStorage.setItem("test-key", "test-value");
    expect(zustandStorage.getItem("test-key")).toBe("test-value");
  });

  it("returns null for missing keys", () => {
    expect(zustandStorage.getItem("missing")).toBeNull();
  });

  it("removes values", () => {
    zustandStorage.setItem("test-key", "val");
    zustandStorage.removeItem("test-key");
    expect(zustandStorage.getItem("test-key")).toBeNull();
  });
});

describe("queryStorage adapter", () => {
  afterEach(async () => {
    await queryStorage.removeItem("q-key");
  });

  it("returns promises", async () => {
    await queryStorage.setItem("q-key", "q-value");
    const result = await queryStorage.getItem("q-key");
    expect(result).toBe("q-value");
  });

  it("returns null for missing keys", async () => {
    const result = await queryStorage.getItem("nope");
    expect(result).toBeNull();
  });
});

describe("StorageHelper", () => {
  afterEach(() => {
    StorageHelper.clearAll();
  });

  it("stores and retrieves JSON objects", () => {
    const data = { name: "test", count: 42 };
    StorageHelper.setObject("obj-key", data);
    expect(StorageHelper.getObject("obj-key")).toEqual(data);
  });

  it("returns null for missing objects", () => {
    expect(StorageHelper.getObject("nope")).toBeNull();
  });

  it("removes keys", () => {
    StorageHelper.setObject("rm-key", { a: 1 });
    StorageHelper.remove("rm-key");
    expect(StorageHelper.getObject("rm-key")).toBeNull();
  });

  it("clears all storage", () => {
    StorageHelper.setObject("a", 1);
    StorageHelper.setObject("b", 2);
    StorageHelper.clearAll();
    expect(StorageHelper.getObject("a")).toBeNull();
    expect(StorageHelper.getObject("b")).toBeNull();
  });
});
