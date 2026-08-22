import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  renderHook,
  waitFor,
} from "@testing-library/react";

import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils";

import { useDeleteApplication } from "./useDeleteApplication";

const mockDeleteApplication = vi.fn();

vi.mock("../services/applications.service", () => ({
  deleteApplication: (...args: unknown[]) =>
    mockDeleteApplication(...args),
}));

describe("useDeleteApplication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls deleteApplication with the correct id", async () => {
    mockDeleteApplication.mockResolvedValue(undefined);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(
      () => useDeleteApplication(),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    result.current.mutate("application-123");

    await waitFor(() => {
      expect(mockDeleteApplication).toHaveBeenCalledWith(
        "application-123",
      );
    });
  });

  it("invalidates application queries after a successful deletion", async () => {
    mockDeleteApplication.mockResolvedValue(undefined);

    const queryClient = createTestQueryClient();

    const invalidateQueriesSpy = vi.spyOn(
      queryClient,
      "invalidateQueries",
    );

    const { result } = renderHook(
      () => useDeleteApplication(),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    result.current.mutate("application-123");

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["applications"],
      });
    });
  });
});