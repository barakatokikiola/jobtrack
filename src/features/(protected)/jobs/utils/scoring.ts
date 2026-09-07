import type { CreateJobInput } from "../schemas/schemas";

export type JobCategory =
  | "frontend"
  | "ai"
  | "backend"
  | "fullstack"
  | "other";

export type JobClassification = {
  category: JobCategory;
  score: number;
  matchedKeywords: string[];
};

const FRONTEND_KEYWORDS = [
  "frontend",
  "front-end",
  "frontend engineer",
  "frontend developer",
  "react",
  "next.js",
  "nextjs",
  "typescript",
  "javascript",
  "ui engineer",
  "web engineer",
];

const AI_KEYWORDS = [
  "artificial intelligence",
  "machine learning",
  "llm",
  "large language model",
  "generative ai",
  "ai engineer",
  "ai developer",
  "agentic",
];

const BACKEND_KEYWORDS = [
  "backend",
  "back-end",
  "backend engineer",
  "backend developer",
  "api engineer",
  "django",
  "nestjs",
  "node.js",
  "python engineer",
  "python developer",
];

const FULLSTACK_KEYWORDS = [
  "full stack",
  "full-stack",
  "fullstack",
];

function findMatches(
  text: string,
  keywords: string[],
): string[] {
  return keywords.filter((keyword) =>
    text.includes(keyword),
  );
}

function classifyFromTitle(
  title: string,
): {
  category: JobCategory;
  matches: string[];
} | null {
  const titleMatches = [
    {
      category: "frontend" as const,
      matches: findMatches(title, FRONTEND_KEYWORDS),
    },
    {
      category: "fullstack" as const,
      matches: findMatches(title, FULLSTACK_KEYWORDS),
    },
    {
      category: "backend" as const,
      matches: findMatches(title, BACKEND_KEYWORDS),
    },
    {
      category: "ai" as const,
      matches: findMatches(title, AI_KEYWORDS),
    },
  ];

  titleMatches.sort(
    (a, b) =>
      b.matches.length - a.matches.length,
  );

  const best = titleMatches[0];

  if (!best || best.matches.length === 0) {
    return null;
  }

  return {
    category: best.category,
    matches: best.matches,
  };
}

export function classifyJob(
  job: CreateJobInput,
): JobClassification {
  const title = job.title.toLowerCase();

  const description =
    job.description?.toLowerCase() ?? "";

  /*
   * TITLE HAS PRIORITY
   *
   * If the job title clearly identifies the role,
   * use that classification.
   */
  const titleClassification =
    classifyFromTitle(title);

  if (titleClassification) {
    const descriptionMatches = findMatches(
      description,
      titleClassification.matches,
    );

    const matchedKeywords = [
      ...new Set([
        ...titleClassification.matches,
        ...descriptionMatches,
      ]),
    ];

    const score = Math.min(
      50 +
        titleClassification.matches.length * 20 +
        descriptionMatches.length * 5,
      100,
    );

    return {
      category: titleClassification.category,
      score,
      matchedKeywords,
    };
  }

  /*
   * No clear title classification.
   *
   * Only use description signals as a weaker fallback.
   */
  const frontendMatches = findMatches(
    description,
    FRONTEND_KEYWORDS,
  );

  const aiMatches = findMatches(
    description,
    AI_KEYWORDS,
  );

  const backendMatches = findMatches(
    description,
    BACKEND_KEYWORDS,
  );

  const categories = [
    {
      category: "frontend" as const,
      matches: frontendMatches,
    },
    {
      category: "ai" as const,
      matches: aiMatches,
    },
    {
      category: "backend" as const,
      matches: backendMatches,
    },
  ];

  categories.sort(
    (a, b) =>
      b.matches.length - a.matches.length,
  );

  const best = categories[0];

  if (!best || best.matches.length === 0) {
    return {
      category: "other",
      score: 0,
      matchedKeywords: [],
    };
  }

  return {
    category: best.category,
    score: Math.min(
      best.matches.length * 10,
      50,
    ),
    matchedKeywords: best.matches,
  };
}