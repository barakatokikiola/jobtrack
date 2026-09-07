import { describe, expect, it } from "vitest";

import { applicationSchema } from "./application.schema";

describe("applicationSchema", () => {
  it("accepts a valid application", () => {
    const result = applicationSchema.safeParse({
      company: "Microsoft",
      position: "Frontend Developer",
      location: "Lagos",
      job_type: "Full-time",
      work_mode: "Remote",
      salary_min: 250000,
      salary_max: 350000,
      currency: "NGN",
      job_url: "https://example.com/job",
      status: "Applied",
      applied_at: "2026-08-21",
      notes: "Frontend role",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an application without a company", () => {
    const result = applicationSchema.safeParse({
      company: "",
      position: "Frontend Developer",
      job_type: "Full-time",
      work_mode: "Remote",
      status: "Applied",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an application without a position", () => {
    const result = applicationSchema.safeParse({
      company: "Microsoft",
      position: "",
      job_type: "Full-time",
      work_mode: "Remote",
      status: "Applied",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid job URL", () => {
    const result = applicationSchema.safeParse({
      company: "Microsoft",
      position: "Frontend Developer",
      job_type: "Full-time",
      work_mode: "Remote",
      status: "Applied",
      job_url: "not-a-url",
    });

    expect(result.success).toBe(false);
  });
});