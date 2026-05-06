import { renderHook, act, waitFor } from "@testing-library/react-native";
import { useDatabaseMigrations, MIGRATION_ERROR_USER_MESSAGE } from "./useDatabaseMigrations";

jest.mock("@/services/ErrorTracking", () => ({
  errorTracking: {
    captureException: jest.fn(),
  },
}));

describe("useDatabaseMigrations", () => {
  it("sets isReady to true after successful migration", async () => {
    const run = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useDatabaseMigrations({ run }));

    expect(result.current.isReady).toBe(false);

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
    });

    expect(result.current.errorMessage).toBeNull();
    expect(run).toHaveBeenCalledTimes(1);
  });

  it("sets errorMessage on migration failure", async () => {
    const run = jest.fn().mockRejectedValue(new Error("Migration failed"));
    const { result } = renderHook(() => useDatabaseMigrations({ run }));

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
    });

    expect(result.current.errorMessage).toBe(MIGRATION_ERROR_USER_MESSAGE);
  });

  it("retries migration when retry is called", async () => {
    let callCount = 0;
    const run = jest.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) return Promise.reject(new Error("fail"));
      return Promise.resolve();
    });

    const { result } = renderHook(() => useDatabaseMigrations({ run }));

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
    });

    expect(result.current.errorMessage).toBe(MIGRATION_ERROR_USER_MESSAGE);

    act(() => {
      result.current.retry();
    });

    await waitFor(() => {
      expect(result.current.isReady).toBe(true);
      expect(result.current.errorMessage).toBeNull();
    });

    expect(run).toHaveBeenCalledTimes(2);
  });
});
