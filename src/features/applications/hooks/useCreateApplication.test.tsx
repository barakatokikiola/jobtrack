import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCreateApplication } from "./useCreateApplication";
import { createQueryWrapper, createTestQueryClient } from "@/test/utils";

const mockCreateApplication = vi.fn();

vi.mock("../services/applications.service", () => ({
  createApplication: (...args: unknown[]) => mockCreateApplication(...args),
}));

describe("useCreateApplication", () => {
  it("calls createApplication with the correct data", async () => {
    const application = {
      id: "application-123",
      company: "Google",
      position: "Frontend Developer",
    };

    mockCreateApplication.mockResolvedValue(application);
    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useCreateApplication(), {
      wrapper: createQueryWrapper(queryClient),
    });

    const data = {
      company: "Google",
      position: "Frontend Developer",
      location: "Lagos",
      job_type: "Full-time" as const,
      work_mode: "Remote" as const,
      salary_min: 250000,
      salary_max: 350000,
      currency: "NGN",
      job_url: "",
      status: "Applied" as const,
      applied_at: "2026-08-20",
      notes: "",
    };

    result.current.mutate({
      data,
      userId: "user-123",
    });

    await waitFor(() => {
      expect(mockCreateApplication).toHaveBeenCalledWith(data, "user-123");
    });
  });

  it("invalidates the applications query after a successful creation", async () => {
    const application = {
      id: "application-123",
      company: "Google",
      position: "Frontend Developer",
    };

    mockCreateApplication.mockResolvedValue(application);

    const queryClient = createTestQueryClient();

    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateApplication(), {
      wrapper: createQueryWrapper(queryClient),
    });

    const data = {
      company: "Google",
      position: "Frontend Developer",
      location: "Lagos",
      job_type: "Full-time" as const,
      work_mode: "Remote" as const,
      salary_min: 250000,
      salary_max: 350000,
      currency: "NGN",
      job_url: "",
      status: "Applied" as const,
      applied_at: "2026-08-20",
      notes: "",
    };

    result.current.mutate({
      data,
      userId: "user-123",
    });

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["applications"],
      });
    });
  });
});
