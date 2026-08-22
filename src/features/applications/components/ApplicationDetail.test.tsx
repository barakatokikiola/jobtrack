import { beforeEach, describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplicationDetails from "./ApplicationDetail";

const mockPush = vi.fn();
const mockDeleteApplication = vi.fn();
const mockUseApplication = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useParams: () => ({
    id: "application-123",
  }),
}));

vi.mock("@/features/applications/hooks/useApplication", () => ({
  useApplication: (...args: unknown[]) => mockUseApplication(...args),
}));

vi.mock("@/features/applications/hooks/useDeleteApplication", () => ({
  useDeleteApplication: () => ({
    mutate: mockDeleteApplication,
    isPending: false,
  }),
}));

describe("ApplicationDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a loading state", () => {
    mockUseApplication.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<ApplicationDetails />);

    expect(screen.getByText("Loading application...")).toBeInTheDocument();

    expect(mockUseApplication).toHaveBeenCalledWith("application-123");
  });

  it("shows an error when loading fails", () => {
    mockUseApplication.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Unable to load application"),
    });

    render(<ApplicationDetails />);

    expect(screen.getByText("Unable to load application")).toBeInTheDocument();
  });

  it("shows a not found message when no application exists", () => {
    mockUseApplication.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<ApplicationDetails />);

    expect(screen.getByText("Application not found.")).toBeInTheDocument();
  });

  it("renders application details", () => {
    mockUseApplication.mockReturnValue({
      data: {
        id: "application-123",
        user_id: "user-123",
        company: "Google",
        position: "Frontend Developer",
        location: "Lagos",
        job_type: "Full-time",
        work_mode: "Remote",
        salary_min: 250000,
        salary_max: 350000,
        currency: "NGN",
        job_url: "https://example.com/job",
        status: "Applied",
        applied_at: "2026-08-20",
        notes: "Follow up next week",
        created_at: "2026-08-20T10:00:00Z",
        updated_at: "2026-08-20T10:00:00Z",
      },
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<ApplicationDetails />);

    expect(
      screen.getByRole("heading", {
        name: "Frontend Developer",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Google")).toBeInTheDocument();

    expect(screen.getByText("Lagos")).toBeInTheDocument();

    expect(screen.getByText("Full-time")).toBeInTheDocument();

    expect(screen.getByText("Remote")).toBeInTheDocument();

    expect(screen.getByText("Applied")).toBeInTheDocument();

    expect(screen.getByText("NGN 250000 - 350000")).toBeInTheDocument();

    expect(screen.getByText("2026-08-20")).toBeInTheDocument();

    expect(screen.getByText("Follow up next week")).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "View job posting",
      }),
    ).toHaveAttribute("href", "https://example.com/job");
  });

  it("deletes the application after confirmation and redirects", async () => {
    const user = userEvent.setup();

    mockUseApplication.mockReturnValue({
      data: {
        id: "application-123",
        user_id: "user-123",
        company: "Google",
        position: "Frontend Developer",
        location: "Lagos",
        job_type: "Full-time",
        work_mode: "Remote",
        salary_min: 250000,
        salary_max: 350000,
        currency: "NGN",
        job_url: "",
        status: "Applied",
        applied_at: "2026-08-20",
        notes: "",
        created_at: "2026-08-20T10:00:00Z",
        updated_at: "2026-08-20T10:00:00Z",
      },
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<ApplicationDetails />);

    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

    await user.click(
      screen.getByRole("button", {
        name: "Delete Application",
      }),
    );

    expect(confirmSpy).toHaveBeenCalledWith(
      "Are you sure you want to delete this application? This action cannot be undone.",
    );

    expect(mockDeleteApplication).toHaveBeenCalledWith(
      "application-123",
      expect.objectContaining({
        onSuccess: expect.any(Function),
      }),
    );

    const mutationOptions = mockDeleteApplication.mock.calls[0][1];

    mutationOptions.onSuccess();

    expect(mockPush).toHaveBeenCalledWith("/applications");

    confirmSpy.mockRestore();
  });

  it("does not delete the application when deletion is cancelled", async () => {
  const user = userEvent.setup();

  mockUseApplication.mockReturnValue({
    data: {
      id: "application-123",
      user_id: "user-123",
      company: "Google",
      position: "Frontend Developer",
      location: "Lagos",
      job_type: "Full-time",
      work_mode: "Remote",
      salary_min: 250000,
      salary_max: 350000,
      currency: "NGN",
      job_url: "",
      status: "Applied",
      applied_at: "2026-08-20",
      notes: "",
      created_at: "2026-08-20T10:00:00Z",
      updated_at: "2026-08-20T10:00:00Z",
    },
    isLoading: false,
    isError: false,
    error: null,
  });

  const confirmSpy = vi
    .spyOn(window, "confirm")
    .mockReturnValue(false);

  render(<ApplicationDetails />);

  await user.click(
    screen.getByRole("button", {
      name: "Delete Application",
    }),
  );

  expect(confirmSpy).toHaveBeenCalled();

  expect(mockDeleteApplication).not.toHaveBeenCalled();

  expect(mockPush).not.toHaveBeenCalled();

  confirmSpy.mockRestore();
});
});
