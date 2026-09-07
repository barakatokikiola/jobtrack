import { describe, expect, it } from "vitest";
import { matchJobToPreferences } from "./matchJob";

describe("matchJobToPreferences", () => {
  it("should give a high score to a matching job", () => {
    const job = {
      external_id: "123",
      source: "greenhouse",
      title: "Frontend Engineer",
      company: "Modo Energy",
      description:
        "Build applications with React and TypeScript.",
      location: "London, UK",
      job_type: null,
      work_mode: "hybrid",
      salary_min: null,
      salary_max: null,
      currency: null,
      job_url: "https://example.com",
      posted_at: null,
      experience_level: "entry",
      eligibility: null,
      match_score: 80,
      category: "frontend",
      matched_keywords: [
        "frontend",
        "react",
        "typescript",
      ],
    };

    const preferences = {
      categories: ["frontend", "ai"],
      keywords: ["React", "TypeScript", "Next.js"],
      work_modes: ["remote", "hybrid"],
      locations: ["Nigeria"],
      max_experience_years: 3,
      include_internships: true,
      include_entry_level: true,
    };

    const result = matchJobToPreferences(
      job,
      preferences
    );

    expect(result.score).toBe(95);

    expect(result.reasons).toContain(
      "Matches your frontend job preference"
    );

    expect(result.reasons).toContain(
      "Matches your keywords: react, typescript"
    );

    expect(result.reasons).toContain(
      "Matches your preferred work mode: hybrid"
    );

    expect(result.reasons).toContain(
      "Entry-level job matches your preferences"
    );
  });
});