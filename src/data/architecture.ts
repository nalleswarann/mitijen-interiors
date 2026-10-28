export interface Hotspot {
  id: string;
  name: string;
  material: string;
  yaw: number;   // Horizontal spherical angle (-180 to 180 deg)
  pitch: number; // Vertical spherical angle (-75 to 75 deg)
  description: string;
  spec: string;
}

export interface Viewpoint {
  id: string;
  name: string;
  category: string;
  image: string;       // Fallback static
  panorama: string;    // Equirectangular 360 panorama
  location: string;
  description: string;
  spots: Hotspot[];
}

export type LightingMode = 'daylight' | 'golden' | 'dusk';

export const ARCHITECTURE_VIEWS: Viewpoint[] = [
  {
    id: "credenza",
    name: "Living Credenza & Shoji Room",
    category: "Interior Architecture",
    image: "/assets/mitijen/home1.jpeg",
    panorama: "/assets/mitijen/panaroma/panaroma1.png",
    location: "Private Residence Salon",
    description: "Handcrafted solid walnut credenza and floating shelving paired with Japanese-inspired gridded timber screen partition and warm cove uplighting wash.",
    spots: [
      {
        id: "credenza-unit",
        name: "Floating Walnut Credenza",
        material: "Select Black Walnut",
        yaw: 180,
        pitch: -12,
        description: "Continuous grain-matched walnut door fronts conceal audiovisual components with touch-latch silent opening.",
        spec: "Material: Solid walnut edge, veneer face · Hardware: Blum concealed soft-close"
      },
      {
        id: "floating-shelves",
        name: "Cantilevered Display Shelves",
        material: "Solid Oiled Timber",
        yaw: 182,
        pitch: 14,
        description: "Minimalist floating shelves anchored to structural wall studs with invisible internal steel pins.",
        spec: "Span: 1800mm · Capacity: 45kg load · Concealed rods: 16mm steel"
      },
      {
        id: "shoji-partition",
        name: "Gridded Timber Screen",
        material: "Stained Hardwood Lattice",
        yaw: 135,
        pitch: 4,
        description: "Custom geometric lattice screen creates visual privacy while filtering ambient daylight between living salon and hallway.",
        spec: "Grid: 120×140mm module · Joinery: Traditional mortise and tenon"
      },
      {
        id: "cove-lighting",
        name: "Architectural Cove Light",
        material: "2700K Linear LED Wash",
        yaw: 180,
        pitch: 34,
        description: "Concealed perimeter ceiling trough projects a diffused, shadowless warm ambient glow down the wall.",
        spec: "Color Temp: 2700K CRI 98 · Output: 900 lm/m indirect wash"
      },
      {
        id: "fireplace-seating",
        name: "Linear Fireplace & Lounge",
        material: "Honed Quartzite & Fire",
        yaw: 0,
        pitch: -10,
        description: "Opposite salon wall featuring integrated flush-mount bioethanol fireplace and media suite.",
        spec: "Burner: EcoSmart linear 1200mm · Cladding: Seamless warm white micro-cement"
      }
    ]
  },
  {
    id: "vanity",
    name: "Stone & Timber Vanity",
    category: "Custom Bath Architecture",
    image: "/assets/mitijen/warm1.jpeg",
    panorama: "/assets/mitijen/panaroma/panaroma2.png",
    location: "Master Suite En-Suite",
    description: "Floating honed marble cantilevered vanity counter set against floor-to-ceiling vein-matched Breccia stone walls, backlit mirror, and rich timber cabinetry.",
    spots: [
      {
        id: "floating-counter",
        name: "Cantilevered Stone Vanity",
        material: "Mitered Breccia Marble",
        yaw: 180,
        pitch: -12,
        description: "Seamless mitered edge construction gives the appearance of a solid stone block hovering above the floor.",
        spec: "Structure: Cantilevered steel sub-frame · Basin: Integrated carved vessel"
      },
      {
        id: "backlit-mirror",
        name: "Architectural Backlit Mirror",
        material: "Brass Frame & Shadowline",
        yaw: 180,
        pitch: 16,
        description: "Custom organic brass-framed vanity mirror with perimeter 2700K halo wash to illuminate facial planes evenly.",
        spec: "Glass: Ultra-clear low-iron float glass · Driver: Lutron 0-10V dimmable"
      },
      {
        id: "stone-cladding",
        name: "Veined Marble Wall Cladding",
        material: "Bookmatched Breccia Marble",
        yaw: 130,
        pitch: 16,
        description: "Bookmatched natural marble slabs with rose-terracotta veining create a continuous monolithic stone envelope.",
        spec: "Slab size: 2800×1400mm · Honed anti-glare micro-seal"
      },
      {
        id: "recess-niche",
        name: "Integrated Stone Wall Niche",
        material: "Carved Breccia Marble",
        yaw: 110,
        pitch: 8,
        description: "Precision-recessed stone niche for bath linens and ambient illumination.",
        spec: "Depth: 180mm · Finish: Satin honed interior"
      },
      {
        id: "shower-glass",
        name: "Walk-In Shower Enclosure",
        material: "Frameless Tempered Glass & Brass",
        yaw: -120,
        pitch: 4,
        description: "Zero-threshold walk-in shower with rain head and concealed linear trench drain.",
        spec: "Glass: 12mm Starphire low-iron tempered · Hardware: Brushed natural brass"
      }
    ]
  },
  {
    id: "wardrobe",
    name: "Full Architectural Wardrobe",
    category: "Millwork & Joinery",
    image: "/assets/mitijen/dressing-cupboard.jpeg",
    panorama: "/assets/mitijen/panaroma/panaroma3.png",
    location: "Dressing Suite Gallery",
    description: "Full-height floor-to-ceiling custom architectural wardrobe with integrated cubbies, concealed drawers, sliding tracks, and paneled French door.",
    spots: [
      {
        id: "vertical-modules",
        name: "Full-Height Column Modules",
        material: "Natural Birch & Oak Veneer",
        yaw: 180,
        pitch: 8,
        description: "Precision-spaced open compartments tailored for wardrobe curation, accessories, and linen storage.",
        spec: "Height: 2700mm to ceiling soffit · Edge banding: 2mm solid timber"
      },
      {
        id: "drawers-storage",
        name: "Seamless Inset Drawers",
        material: "Solid Maple Box & Oak Face",
        yaw: 172,
        pitch: -22,
        description: "Lower tier finger-pull drawers with concealed heavy-duty runners and solid timber box construction.",
        spec: "Joinery: Dovetail maple box · Under-mount synchronized slide"
      },
      {
        id: "paneled-door",
        name: "Multi-Panel Grid French Door",
        material: "Lacquered Architectural Door",
        yaw: -125,
        pitch: -2,
        description: "Mullioned multi-panel passage door dividing the dressing suite from the master bedroom.",
        spec: "Profile: Recessed multi-panel grid with concealed magnetic latch"
      },
      {
        id: "bedroom-suite",
        name: "Master Bedroom & Exterior View",
        material: "Natural Linen & Hardwood",
        yaw: 80,
        pitch: 2,
        description: "Adjoining tranquil master suite salon overlooking city canopy gardens.",
        spec: "Flooring: Wide-plank white oak · Drapery: Sheer Belgian linen"
      },
      {
        id: "integrated-lighting",
        name: "Concealed Wardrobe LEDs",
        material: "Micro-Channel Aluminum Rail",
        yaw: 180,
        pitch: 40,
        description: "Warm recessed extrusion profiles embedded into vertical dividers for seamless shadowless illumination.",
        spec: "Output: 450 lm/m · Diffusion: Frosted silicone opal diffuser"
      }
    ]
  }
];

// Backward compatibility exports
export const SPOTS = ARCHITECTURE_VIEWS[0].spots;
export const VIEWS = ARCHITECTURE_VIEWS;
