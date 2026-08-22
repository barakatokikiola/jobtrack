import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import { ApplicationsList } from "./ApplicationsList";

const mockUseApplications = vi.fn();

vi.mock("../hooks/useApplications", () => ({
  useApplications: () => mockUseApplications(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("ApplicationsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a loading state", () => {
    mockUseApplications.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<ApplicationsList />);

    expect(
      screen.getByText("Loading applications..."),
    ).toBeInTheDocument();
  });

  it("shows an error message when loading fails", () => {
    mockUseApplications.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Failed to load applications"),
    });

    render(<ApplicationsList />);

    expect(
      screen.getByText("Failed to load applications"),
    ).toBeInTheDocument();
  });

  it("shows an empty state when there are no applications", () => {
    mockUseApplications.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<ApplicationsList />);

    expect(
      screen.getByText("No applications yet"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Start tracking your job applications by adding your first one.",
      ),
    ).toBeInTheDocument();
  });

  it("renders applications", () => {
  mockUseApplications.mockReturnValue({
    data: [
      {
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
      {
        id: "application-456",
        user_id: "user-123",
        company: "Microsoft",
        position: "React Developer",
        location: "Remote",
        job_type: "Full-time",
        work_mode: "Remote",
        salary_min: null,
        salary_max: null,
        currency: "USD",
        job_url: null,
        status: "Interview",
        applied_at: "2026-08-19",
        notes: null,
        created_at: "2026-08-19T10:00:00Z",
        updated_at: "2026-08-19T10:00:00Z",
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
  });

  render(<ApplicationsList />);

  expect(
    screen.getByText("Frontend Developer"),
  ).toBeInTheDocument();

  expect(
    screen.getByText("Google"),
  ).toBeInTheDocument();

  expect(
    screen.getByText("React Developer"),
  ).toBeInTheDocument();

  expect(
    screen.getByText("Microsoft"),
  ).toBeInTheDocument();

  expect(
    screen.getByText("Applied"),
  ).toBeInTheDocument();

  expect(
    screen.getByText("Interview"),
  ).toBeInTheDocument();

  expect(
    screen.getByText("Lagos"),
  ).toBeInTheDocument();

  expect(
    screen.getByText("Remote"),
  ).toBeInTheDocument();
});
});