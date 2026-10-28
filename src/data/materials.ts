export interface Material {
  name: string;
  key: string;
  tag?: string;
}

export const MATERIALS: Material[] = [
  { name: "Executive Boardroom", key: "mitigen1", tag: "Conference & Governance" },
  { name: "Collaborative Workspaces", key: "mitigen2", tag: "Agile Desking" },
  { name: "Reception & Gallery", key: "mitigen3", tag: "Client Hospitality" },
  { name: "Private Executive Suite", key: "mitigen4", tag: "Leadership Cabins" },
  { name: "Acoustic Huddle Rooms", key: "mitigen5", tag: "Confidential Focus" },
  { name: "Breakout Lounge", key: "mitigen6", tag: "Pantry & Team Synergy" },
  { name: "Creative Studio Hub", key: "mitigen7", tag: "Innovation Labs" },
  { name: "Townhall Pavilions", key: "mitigen8", tag: "All-Hands Architecture" }
];

export const CORPORATE_SPACES = MATERIALS;
