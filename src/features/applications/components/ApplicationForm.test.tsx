import { beforeEach, describe, expect, it, vi } from "vitest";

import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { ApplicationForm } from "./ApplicationForm";

const mockCreateApplication = vi.fn();
const mockUpdateApplication = vi.fn();

vi.mock("../hooks/useCreateApplication", () => ({
  useCreateApplication: () => ({
    mutate: mockCreateApplication,
    isPending: false,
    isError: false,
    error: null,
    isSuccess: false,
  }),
}));

vi.mock("../hooks/useUpdateApplication", () => ({
  useUpdateApplication: () => ({
    mutate: mockUpdateApplication,
    isPending: false,
    isError: false,
    error: null,
  }),
}));

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: vi.fn(),
  }),
}));

describe("ApplicationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the application form", () => {
    render(<ApplicationForm userId="user-123" />);

    expect(
      screen.getByRole("textbox", { name: /company/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", { name: /position/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /add application/i,
      }),
    ).toBeInTheDocument();
  });

  it("submits a valid application", async () => {
    const user = userEvent.setup();

    render(<ApplicationForm userId="user-123" />);

    await user.type(
      screen.getByRole("textbox", { name: /company/i }),
      "Microsoft",
    );

    await user.type(
      screen.getByRole("textbox", { name: /position/i }),
      "Frontend Developer",
    );

    await user.click(
      screen.getByRole("button", {
        name: /add application/i,
      }),
    );

    await waitFor(() => {
      expect(mockCreateApplication).toHaveBeenCalled();
    });

    expect(mockCreateApplication).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          company: "Microsoft",
          position: "Frontend Developer",
          job_type: "Full-time",
          work_mode: "Remote",
          status: "Applied",
        }),
        userId: "user-123",
      }),
      expect.any(Object),
    );
  });

  it("shows validation errors when required fields are missing", async () => {
    const user = userEvent.setup();

    render(<ApplicationForm userId="user-123" />);

    await user.click(
      screen.getByRole("button", {
        name: /add application/i,
      }),
    );

    expect(
      await screen.findByText("Company name is required"),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Job position is required"),
    ).toBeInTheDocument();

    expect(mockCreateApplication).not.toHaveBeenCalled();
  });

  it("populates the form when editing an existing application", () => {
    const application = {
      id: "application-123",
      user_id: "user-123",
      company: "Google",
      position: "Frontend Developer",
      location: "Lagos",
      job_type: "Full-time" as const,
      work_mode: "Remote" as const,
      salary_min: 250000,
      salary_max: 350000,
      currency: "NGN",
      job_url: "https://example.com/job",
      status: "Applied" as const,
      applied_at: "2026-08-20",
      notes: "Follow up next week",
      created_at: "2026-08-20T10:00:00Z",
      updated_at: "2026-08-20T10:00:00Z",
    };

    render(<ApplicationForm userId="user-123" application={application} />);

    expect(screen.getByRole("textbox", { name: /company/i })).toHaveValue(
      "Google",
    );

    expect(screen.getByRole("textbox", { name: /position/i })).toHaveValue(
      "Frontend Developer",
    );

    expect(screen.getByRole("textbox", { name: /location/i })).toHaveValue(
      "Lagos",
    );

    expect(screen.getByLabelText("Applied Date")).toHaveValue("2026-08-20");

    expect(screen.getByRole("textbox", { name: /notes/i })).toHaveValue(
      "Follow up next week",
    );

    expect(
      screen.getByRole("button", {
        name: /update application/i,
      }),
    ).toBeInTheDocument();
  });

  it("updates an existing application instead of creating one", async () => {
  const user = userEvent.setup();

  const application = {
    id: "application-123",
    user_id: "user-123",
    company: "Google",
    position: "Frontend Developer",
    location: "Lagos",
    job_type: "Full-time" as const,
    work_mode: "Remote" as const,
    salary_min: 250000,
    salary_max: 350000,
    currency: "NGN",
    job_url: "https://example.com/job",
    status: "Applied" as const,
    applied_at: "2026-08-20",
    notes: "Follow up next week",
    created_at: "2026-08-20T10:00:00Z",
    updated_at: "2026-08-20T10:00:00Z",
  };

  render(
    <ApplicationForm
      userId="user-123"
      application={application}
    />,
  );

  const positionInput = screen.getByRole("textbox", {
    name: /position/i,
  });

  await user.clear(positionInput);

  await user.type(
    positionInput,
    "Senior Frontend Developer",
  );

  await user.click(
    screen.getByRole("button", {
      name: /update application/i,
    }),
  );

  await waitFor(() => {
    expect(mockUpdateApplication).toHaveBeenCalled();
  });

  expect(mockUpdateApplication).toHaveBeenCalledWith(
    {
      id: "application-123",
      data: expect.objectContaining({
        company: "Google",
        position: "Senior Frontend Developer",
      }),
    },
    expect.any(Object),
  );

  expect(mockCreateApplication).not.toHaveBeenCalled();
});
});
