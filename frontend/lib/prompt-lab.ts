export type PromptCategory =
  | "coding"
  | "startup"
  | "business"
  | "writing"
  | "research"
  | "design"
  | "marketing"
  | "education"
  | "data";

export interface PromptCategoryDefinition {
  id: PromptCategory;
  name: string;
  description: string;
  icon: string;
  examples: string[];
}

export interface GeneratedPrompt {
  role: string;
  context: string;
  objective: string;
  requirements: string[];
  constraints: string[];
  outputFormat: string;
  qualityCriteria: string[];
  followUp: string;
}

export const promptCategories: PromptCategoryDefinition[] = [
  {
    id: "coding",
    name: "Coding",
    description: "Build, debug, refactor, explain, and review software.",
    icon: "Code2",
    examples: [
      "Build a Next.js dashboard",
      "Debug a TypeScript error",
      "Review my React component",
    ],
  },
  {
    id: "startup",
    name: "Startup",
    description: "Turn ideas into products, plans, and execution roadmaps.",
    icon: "Rocket",
    examples: [
      "Validate my SaaS idea",
      "Create a startup roadmap",
      "Analyze my business model",
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "Create plans, analysis, reports, and decision frameworks.",
    icon: "BriefcaseBusiness",
    examples: [
      "Analyze a business strategy",
      "Create an executive report",
      "Build a competitive analysis",
    ],
  },
  {
    id: "writing",
    name: "Writing",
    description: "Create clearer, stronger, and more structured writing.",
    icon: "PenLine",
    examples: [
      "Rewrite my email professionally",
      "Write a product announcement",
      "Improve my landing page copy",
    ],
  },
  {
    id: "research",
    name: "Research",
    description: "Turn research goals into structured investigation workflows.",
    icon: "Search",
    examples: [
      "Research a market",
      "Compare competing products",
      "Analyze a research topic",
    ],
  },
  {
    id: "design",
    name: "Design",
    description: "Generate structured design direction and creative briefs.",
    icon: "Palette",
    examples: [
      "Design a SaaS landing page",
      "Create a brand direction",
      "Improve this UI",
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Create campaigns, content strategies, and growth plans.",
    icon: "Megaphone",
    examples: [
      "Create a launch campaign",
      "Build an SEO strategy",
      "Create social media content",
    ],
  },
  {
    id: "education",
    name: "Education",
    description: "Create learning plans, explanations, and study workflows.",
    icon: "GraduationCap",
    examples: [
      "Explain this topic simply",
      "Create a study plan",
      "Generate practice questions",
    ],
  },
  {
    id: "data",
    name: "Data",
    description: "Analyze, transform, explain, and reason about data.",
    icon: "ChartNoAxesCombined",
    examples: [
      "Analyze this CSV",
      "Explain this dataset",
      "Find trends in my data",
    ],
  },
];

export function getPromptCategory(
  id: PromptCategory
): PromptCategoryDefinition {
  const category = promptCategories.find((item) => item.id === id);

  if (!category) {
    throw new Error(`Unknown prompt category: ${id}`);
  }

  return category;
}

export function buildClaudePrompt(
  goal: string,
  category: PromptCategory
): GeneratedPrompt {
  const categoryDefinition = getPromptCategory(category);

  return {
    role: `Act as an expert ${categoryDefinition.name.toLowerCase()} assistant with strong practical experience in this domain.`,

    context:
      "Use the user's goal as the primary context. Ask only for information that is genuinely necessary. If reasonable assumptions can be made, state them briefly and proceed.",

    objective: goal.trim(),

    requirements: [
      "Break the problem into clear, logical steps.",
      "Prioritize practical and actionable recommendations.",
      "Explain important decisions and assumptions.",
      "Provide concrete examples where they improve understanding.",
    ],

    constraints: [
      "Do not invent facts, sources, or technical capabilities.",
      "Clearly identify uncertainty when information is missing.",
      "Avoid unnecessary repetition.",
      "Keep the final response organized and easy to act on.",
    ],

    outputFormat:
      "Start with a concise summary, followed by the detailed solution. Use headings, bullets, tables, or code blocks when they improve clarity.",

    qualityCriteria: [
      "Accurate",
      "Specific",
      "Actionable",
      "Well-structured",
      "Easy to verify",
    ],

    followUp:
      "After completing the task, identify the most useful next step and ask whether the user wants to continue.",
  };
}

export function formatGeneratedPrompt(prompt: GeneratedPrompt): string {
  return [
    `# Role`,
    prompt.role,
    "",
    `# Context`,
    prompt.context,
    "",
    `# Objective`,
    prompt.objective,
    "",
    `# Requirements`,
    ...prompt.requirements.map((item) => `- ${item}`),
    "",
    `# Constraints`,
    ...prompt.constraints.map((item) => `- ${item}`),
    "",
    `# Expected Output`,
    prompt.outputFormat,
    "",
    `# Quality Criteria`,
    ...prompt.qualityCriteria.map((item) => `- ${item}`),
    "",
    `# Follow-up`,
    prompt.followUp,
  ].join("\n");
}