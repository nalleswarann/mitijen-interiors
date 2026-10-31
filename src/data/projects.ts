export interface Project {
  id: string;
  name: string;
  loc: string;
  cat: string;
  year: string;
  over: string;
  app: string;
  gal: string[];
  categoryTitle: string;
  numeral: string;
  archRef: string;
  previewImage: string;
}

export const PROJECTS: Project[] = [
  {
    id: "residential",
    name: "The Quiet Residence",
    loc: "Coastal India",
    cat: "Private Residential Architecture",
    year: "2025",
    over: "A warm contemporary residence built around natural oak, travertine and an open living space washed in soft daylight.",
    app: "We removed partitions to let light travel through the house, then limited the palette to three materials so every room feels related.",
    gal: ["lounge", "dine", "bed", "dressing"],
    categoryTitle: "RESIDENTIAL",
    numeral: "I",
    archRef: "BESPOKE RESIDENCES",
    previewImage: "/assets/mitijen/home1.jpeg"
  },
  {
    id: "commercial",
    name: "The Boutique Commercial Pavilions",
    loc: "Southern Coast",
    cat: "Boutique Commercial Architecture",
    year: "2025",
    over: "A sequence of daylight-filled pavilions celebrating monolithic travertine stone, linen and quiet proportion.",
    app: "Merging monolithic stone masonry with modern fluid circulation and tactile materiality.",
    gal: ["stone", "hero", "linen"],
    categoryTitle: "COMMERCIAL",
    numeral: "II",
    archRef: "COMMERCIAL VENUES",
    previewImage: "/assets/mitijen/commercial1.jpeg"
  },
  {
    id: "corporates",
    name: "The Apex Executive Headquarters",
    loc: "City Centre",
    cat: "Corporate Interiors & Workspaces",
    year: "2026",
    over: "A high-performance corporate sanctuary designed with sculptured oak stairs, quiet acoustics, and private collaborative suites.",
    app: "Architectural joinery conceals technical infrastructure, leaving pure geometric volumes and uninterrupted urban views.",
    gal: ["stair", "hero", "dine"],
    categoryTitle: "CORPORATES",
    numeral: "III",
    archRef: "EXECUTIVE SPACES",
    previewImage: "/assets/mitijen/commercial4.jpeg"
  }
];
