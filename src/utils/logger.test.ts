import { logger } from "./logger";

jest.mock("../services/ErrorTracking", () => ({
  errorTracking: {
    addBreadcrumb: jest.fn(),
    captureException: jest.fn(),
  },
}));

jest.mock("../store/useLogStore", () => ({
  useLogStore: {
    getState: () => ({
      addLog: jest.fn(),
    }),
  },
}));

describe("logger", () => {
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation();
    jest.spyOn(console, "warn").mockImplementation();
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(console, "debug").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("logs info messages to console", () => {
    logger.info("test info message");
    expect(console.info).toHaveBeenCalledWith(
      expect.stringContaining("[INFO]: test info message"),
      ""
    );
  });

  it("logs warn messages to console", () => {
    logger.warn("test warning");
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining("[WARN]: test warning"), "");
  });

  it("logs error messages to console", () => {
    const error = new Error("test error");
    logger.error("something failed", error);
    expect(console.error).toHaveBeenCalled();
  });

  it("logs debug messages to console in dev mode", () => {
    logger.debug("debug trace");
    expect(console.debug).toHaveBeenCalledWith(expect.stringContaining("[DEBUG]: debug trace"), "");
  });
});
