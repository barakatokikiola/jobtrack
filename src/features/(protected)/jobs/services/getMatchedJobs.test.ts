import { describe, expect, it, vi, beforeEach } from "vitest";
import { getMatchedJobs } from "./getMatchedJobs";

const mockMaybeSingle = vi.fn();
const mockJobsQuery = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: vi.fn((table: string) => {
      if (table === "job_preferences") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: mockMaybeSingle,
            }),
          }),
        };
      }

      if (table === "jobs") {
        return {
          select: () => ({
            eq: () => mockJobsQuery(),
          }),
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    }),
  }),
}));

describe("getMatchedJobs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns an empty array when the user has no preferences", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    const result = await getMatchedJobs("user-123");

    expect(result).toEqual([]);
    expect(mockMaybeSingle).toHaveBeenCalled();
    expect(mockJobsQuery).not.toHaveBeenCalled();
  });

  it("returns jobs ranked by personalized match score", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: {
        user_id: "user-123",
        categories: ["frontend"],
        keywords: ["react", "typescript"],
        work_modes: ["remote"],
        locations: ["Nigeria"],
        max_experience_years: 3,
        include_internships: true,
        include_entry_level: true,
      },
      error: null,
    });

    mockJobsQuery.mockResolvedValue({
      data: [
        {
          external_id: "job-1",
          source: "greenhouse",
          title: "Frontend Developer",
          company: "Company A",
          description: "Build React applications with TypeScript.",
          location: "Nigeria",
          job_type: "Full-time",
          work_mode: "remote",
          salary_min: null,
          salary_max: null,
          currency: "NGN",
          job_url: "https://example.com/job-1",
          posted_at: null,
          experience_level: "entry",
          eligibility: "eligible",
          match_score: 70,
          category: "frontend",
          matched_keywords: ["frontend", "react", "typescript"],
        },
        {
          external_id: "job-2",
          source: "greenhouse",
          title: "Backend Developer",
          company: "Company B",
          description: "Build backend services with Python.",
          location: "Nigeria",
          job_type: "Full-time",
          work_mode: "remote",
          salary_min: null,
          salary_max: null,
          currency: "NGN",
          job_url: "https://example.com/job-2",
          posted_at: null,
          experience_level: "mid",
          eligibility: "eligible",
          match_score: 60,
          category: "backend",
          matched_keywords: ["backend", "python"],
        },
      ],
      error: null,
    });

    const result = await getMatchedJobs("user-123");

    expect(result).toHaveLength(2);

    expect(result[0].external_id).toBe("job-1");
    expect(result[0].match_score).toBe(95);

    expect(result[0].match_reasons).toContain(
      "Matches your frontend job preference",
    );

    expect(result[0].match_reasons).toContain(
      "Matches your keywords: react, typescript",
    );

    expect(result[0].match_reasons).toContain(
      "Matches your preferred work mode: remote",
    );

    expect(result[0].match_reasons).toContain(
      "Matches your preferred location: nigeria",
    );

    expect(result[0].match_reasons).toContain(
      "Entry-level job matches your preferences",
    );

    expect(result[1].match_score).toBe(30);
  });

  it("throws an error when preferences cannot be fetched", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: new Error("Database error"),
    });

    await expect(getMatchedJobs("user-123")).rejects.toThrow(
      "Failed to fetch job preferences: Database error",
    );
  });

  it("throws an error when jobs cannot be fetched", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: {
        user_id: "user-123",
        categories: ["frontend"],
        keywords: [],
        work_modes: [],
        locations: [],
        max_experience_years: null,
        include_internships: true,
        include_entry_level: true,
      },
      error: null,
    });

    mockJobsQuery.mockResolvedValue({
      data: null,
      error: new Error("Jobs database error"),
    });

    await expect(getMatchedJobs("user-123")).rejects.toThrow(
      "Failed to fetch jobs: Jobs database error",
    );
  });
});