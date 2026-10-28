export interface ProcessStep {
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Discover",
    description: "Understand the client’s lifestyle, needs, and goals."
  },
  {
    title: "Envision",
    description: "Explore concepts, moodboards, layouts, and material palettes."
  },
  {
    title: "Design",
    description: "Refine the spatial layout, lighting, finishes, and furniture."
  },
  {
    title: "Deliver",
    description: "Coordinate details and bring the completed vision to life."
  }
];
