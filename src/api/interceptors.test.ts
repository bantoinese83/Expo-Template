jest.mock("axios", () => {
  class MockAxiosHeaders {
    private headers: Record<string, string> = {};
    set Authorization(val: string) {
      this.headers.Authorization = val;
    }
    get Authorization() {
      return this.headers.Authorization;
    }
  }
  class MockAxiosError extends Error {
    config: any;
    response: any;
    constructor(msg: string, _code: string, config: any, _req: any, response: any) {
      super(msg);
      this.config = config;
      this.response = response;
    }
  }
  return {
    __esModule: true,
    AxiosHeaders: MockAxiosHeaders,
    AxiosError: MockAxiosError,
    default: { create: jest.fn() },
  };
});

jest.mock("../utils/logger", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock("../services/ErrorTracking", () => ({
  errorTracking: {
    captureException: jest.fn(),
    addBreadcrumb: jest.fn(),
  },
}));

const mockGetToken = jest.fn<string | null, []>();
const mockEmitExpired = jest.fn();

jest.mock("../services/sessionToken", () => ({
  getSessionAccessToken: () => mockGetToken(),
  emitSessionExpired: () => mockEmitExpired(),
}));

jest.mock("../store/useLogStore", () => ({
  useLogStore: {
    getState: () => ({
      addLog: jest.fn(),
    }),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { AxiosHeaders, AxiosError } = require("axios");

function makeConfig(overrides?: Record<string, any>) {
  return {
    method: "get",
    url: "/test",
    headers: new AxiosHeaders(),
    ...overrides,
  };
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { requestInterceptor, responseInterceptor, errorInterceptor } = require("./interceptors");

describe("requestInterceptor", () => {
  beforeEach(() => {
    mockGetToken.mockReturnValue(null);
  });

  it("passes config through without token", async () => {
    const config = makeConfig();
    const result = await requestInterceptor(config);
    expect(result).toBe(config);
    expect(result.headers.Authorization).toBeUndefined();
  });

  it("attaches Bearer token when present", async () => {
    mockGetToken.mockReturnValue("my-jwt-token");
    const config = makeConfig();
    const result = await requestInterceptor(config);
    expect(result.headers.Authorization).toBe("Bearer my-jwt-token");
  });
});

describe("responseInterceptor", () => {
  it("passes response through unchanged", () => {
    const response = {
      data: { ok: true },
      status: 200,
      config: makeConfig(),
    };

    expect(responseInterceptor(response)).toBe(response);
  });
});

describe("errorInterceptor", () => {
  beforeEach(() => {
    mockEmitExpired.mockClear();
    jest.clearAllMocks();
  });

  it("emits session expired on 401", async () => {
    const error = new AxiosError("Unauthorized", "ERR_BAD_REQUEST", makeConfig(), null, {
      status: 401,
      data: { message: "Token expired" },
    });

    await expect(errorInterceptor(error)).rejects.toBe(error);
    expect(mockEmitExpired).toHaveBeenCalledTimes(1);
  });

  it("reports 500+ errors to error tracking", async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { errorTracking } = require("../services/ErrorTracking");
    const error = new AxiosError("Server Error", "ERR_BAD_RESPONSE", makeConfig(), null, {
      status: 500,
      data: { message: "Internal Server Error" },
    });

    await expect(errorInterceptor(error)).rejects.toBe(error);
    expect(errorTracking.captureException).toHaveBeenCalledWith(
      error,
      expect.objectContaining({ context: "api_error", status: 500 })
    );
  });

  it("does not emit session expired for non-401 errors", async () => {
    const error = new AxiosError("Not Found", "ERR_BAD_REQUEST", makeConfig(), null, {
      status: 404,
      data: { message: "Not found" },
    });

    await expect(errorInterceptor(error)).rejects.toBe(error);
    expect(mockEmitExpired).not.toHaveBeenCalled();
  });
});
