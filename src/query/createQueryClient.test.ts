import { createAppQueryClient } from "./createQueryClient";

describe("createAppQueryClient", () => {
  it("returns an isolated client instance", () => {
    const a = createAppQueryClient();
    const b = createAppQueryClient();
    expect(a).not.toBe(b);
  });
});
