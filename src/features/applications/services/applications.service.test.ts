import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "./applications.service";

const mockSingle = vi.fn();
const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockFrom = vi.fn();
const mockOrder = vi.fn();
const mockUpdate = vi.fn();
const mockEq = vi.fn();
const mockDelete = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

describe("application.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockFrom.mockReturnValue({
      insert: mockInsert,
      select: mockSelect,
      update: mockUpdate,
      delete: mockDelete,
    });

    mockInsert.mockReturnValue({
      select: mockSelect,
    });

    mockUpdate.mockReturnValue({
      eq: mockEq,
    });

    mockDelete.mockReturnValue({
      eq: mockEq,
    });

    mockEq.mockReturnValue({
      select: mockSelect,
    });

    mockSelect.mockReturnValue({
      single: mockSingle,
      order: mockOrder,
      eq: mockEq,
    });
  });

  it("creates an application successfully", async () => {
    const application = {
      id: "application-123",
      user_id: "user-123",
      company: "Google",
      position: "Frontend Developer",
    };

    mockSingle.mockResolvedValue({
      data: application,
      error: null,
    });

    const input = {
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

    const result = await createApplication(input, "user-123");

    expect(result).toEqual(application);

    expect(mockFrom).toHaveBeenCalledWith("applications");

    expect(mockInsert).toHaveBeenCalledWith({
      ...input,
      user_id: "user-123",
    });

    expect(mockSelect).toHaveBeenCalled();

    expect(mockSingle).toHaveBeenCalled();
  });

  it("throws an error when creating an application fails", async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: {
        message: "Unable to create application",
      },
    });

    const input = {
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

    await expect(createApplication(input, "user-123")).rejects.toThrow(
      "Unable to create application",
    );
  });

  it("gets applications successfully", async () => {
    const applications = [
      {
        id: "application-123",
        company: "Google",
        position: "Frontend Developer",
      },
      {
        id: "application-456",
        company: "Microsoft",
        position: "React Developer",
      },
    ];

    mockOrder.mockResolvedValue({
      data: applications,
      error: null,
    });

    const result = await getApplications();

    expect(result).toEqual(applications);

    expect(mockFrom).toHaveBeenCalledWith("applications");

    expect(mockSelect).toHaveBeenCalledWith("*");

    expect(mockOrder).toHaveBeenCalledWith("created_at", {
      ascending: false,
    });
  });

  it("throws an error when getting applications fails", async () => {
    mockOrder.mockResolvedValue({
      data: null,
      error: {
        message: "Unable to load applications",
      },
    });

    await expect(getApplications()).rejects.toThrow(
      "Unable to load applications",
    );
  });

  it("updates an application successfully", async () => {
    const updatedApplication = {
      id: "application-123",
      user_id: "user-123",
      company: "Google",
      position: "Senior Frontend Developer",
    };

    mockSingle.mockResolvedValue({
      data: updatedApplication,
      error: null,
    });

    const input = {
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
      notes: "Second interview scheduled",
    };

    const result = await updateApplication("application-123", input);

    expect(result).toEqual(updatedApplication);

    expect(mockFrom).toHaveBeenCalledWith("applications");

    expect(mockUpdate).toHaveBeenCalledWith(input);

    expect(mockEq).toHaveBeenCalledWith("id", "application-123");

    expect(mockSelect).toHaveBeenCalled();

    expect(mockSingle).toHaveBeenCalled();
  });

  it("throws an error when updating an application fails", async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: {
        message: "Unable to update application",
      },
    });

    const input = {
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

    await expect(updateApplication("application-123", input)).rejects.toThrow(
      "Unable to update application",
    );
  });

  it("deletes an application successfully", async () => {
    mockEq.mockResolvedValue({
      error: null,
    });

    await deleteApplication("application-123");

    expect(mockFrom).toHaveBeenCalledWith("applications");

    expect(mockDelete).toHaveBeenCalled();

    expect(mockEq).toHaveBeenCalledWith("id", "application-123");
  });

  it("throws an error when deleting an application fails", async () => {
    mockEq.mockResolvedValue({
      error: {
        message: "Unable to delete application",
      },
    });

    await expect(deleteApplication("application-123")).rejects.toThrow(
      "Unable to delete application",
    );
  });

  it("gets an application by id successfully", async () => {
    const application = {
      id: "application-123",
      user_id: "user-123",
      company: "Google",
      position: "Frontend Developer",
    };

    mockSelect.mockReturnValue({
      eq: mockEq,
    });

    mockEq.mockReturnValue({
      single: mockSingle,
    });

    mockSingle.mockResolvedValue({
      data: application,
      error: null,
    });

    const result = await getApplicationById("application-123");

    expect(result).toEqual(application);

    expect(mockFrom).toHaveBeenCalledWith("applications");

    expect(mockSelect).toHaveBeenCalledWith("*");

    expect(mockEq).toHaveBeenCalledWith("id", "application-123");

    expect(mockSingle).toHaveBeenCalled();
  });

  it("throws an error when getting an application by id fails", async () => {
    mockSelect.mockReturnValue({
      eq: mockEq,
    });

    mockEq.mockReturnValue({
      single: mockSingle,
    });

    mockSingle.mockResolvedValue({
      data: null,
      error: {
        message: "Application not found",
      },
    });

    await expect(getApplicationById("application-123")).rejects.toThrow(
      "Application not found",
    );
  });
});
