import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import {
  createQueryWrapper,
  createTestQueryClient,
} from "@/test/utils";

import { useUpdateApplication } from "./useUpdateApplication";

const mockUpdateApplication = vi.fn();

vi.mock("../services/applications.service", () => ({
  updateApplication: (...args: unknown[]) =>
    mockUpdateApplication(...args),
}));

describe("useUpdateApplication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls updateApplication with the correct id and data", async () => {
    mockUpdateApplication.mockResolvedValue({
      id: "application-123",
      company: "Google",
      position: "Senior Frontend Developer",
    });

    const queryClient = createTestQueryClient();

    const { result } = renderHook(
      () => useUpdateApplication(),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    const data = {
      company: "Google",
      position: "Senior Frontend Developer",
      location: "Lagos",
      job_type: "Full-time" as const,
      work_mode: "Remote" as const,
      salary_min: 300000,
      salary_max: 400000,
      currency: "NGN",
      job_url: "",
      status: "Interviewing" as const,
      applied_at: "2026-08-20",
      notes: "Second interview",
    };

    result.current.mutate({
      id: "application-123",
      data,
    });

    await waitFor(() => {
      expect(mockUpdateApplication).toHaveBeenCalledWith(
        "application-123",
        data,
      );
    });
  });

  it("invalidates application queries after a successful update", async () => {
    mockUpdateApplication.mockResolvedValue({
      id: "application-123",
      company: "Google",
      position: "Senior Frontend Developer",
    });

    const queryClient = createTestQueryClient();

    const invalidateQueriesSpy = vi.spyOn(
      queryClient,
      "invalidateQueries",
    );

    const { result } = renderHook(
      () => useUpdateApplication(),
      {
        wrapper: createQueryWrapper(queryClient),
      },
    );

    result.current.mutate({
      id: "application-123",
      data: {
        company: "Google",
        position: "Senior Frontend Developer",
        location: "Lagos",
        job_type: "Full-time" as const,
        work_mode: "Remote" as const,
        salary_min: 300000,
        salary_max: 400000,
        currency: "NGN",
        job_url: "",
        status: "Interviewing" as const,
        applied_at: "2026-08-20",
        notes: "",
      },
    });

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["applications"],
      });
    });
  });
});