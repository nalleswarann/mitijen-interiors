export interface RoomHotspot {
  id: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  title: string;
  description: string;
  material: string;
}

export interface RoomSpec {
  label: string;
  value: string;
}

export interface Room {
  k: string;
  t: string;
  subtitle: string;
  d: string;
  image: string;
  area: string;
  materials: string[];
  specs: RoomSpec[];
  hotspots: RoomHotspot[];
}

export const ROOMS: Room[] = [
  {
    k: 'lounge',
    t: 'Living Room',
    subtitle: 'Spatial Sanctuary & Open Joinery',
    d: 'Low linen seating and bespoke architectural joinery gather around a sun-drenched living space, framed by natural quarter-sawn oak.',
    image: '/assets/mitijen/home1.jpeg',
    area: '640 sq.ft',
    materials: ['Quarter-Sawn White Oak', 'Belgian Natural Linen', 'Honed Travertine'],
    specs: [
      { label: 'Ceiling Volume', value: '3.4m Unbroken' },
      { label: 'Daylight Aspect', value: 'North-East Wash' },
      { label: 'Acoustic Millwork', value: 'Perimeter Slats' }
    ],
    hotspots: [
      {
        id: 'lounge-portal',
        x: 30,
        y: 40,
        title: 'Bespoke Oak Portal',
        description: 'Floor-to-ceiling quarter-sawn white oak framing transitions seamlessly between salon and private alcove.',
        material: 'Solid White Oak'
      },
      {
        id: 'lounge-plinth',
        x: 66,
        y: 65,
        title: 'Travertine Console Plinth',
        description: 'Curated wall-mounted console balancing monolithic travertine and warm ambient backlighting.',
        material: 'Honed Roman Travertine'
      }
    ]
  },
  {
    k: 'dine',
    t: 'Kitchen & Dining',
    subtitle: 'Culinary Precision & Monolithic Stone',
    d: 'Seamless handleless cabinetry, monolithic quartz surfaces, and recessed task illumination designed for effortless culinary living.',
    image: '/assets/mitijen/kitchen.jpeg',
    area: '480 sq.ft',
    materials: ['Calacatta Gold Quartz', 'Smoked Oak Veneer', 'Concealed Bronze Profiles'],
    specs: [
      { label: 'Work Island', value: '3.2m Monolithic Plinth' },
      { label: 'Task Illumination', value: '2700K CRI 95+' },
      { label: 'Cabinetry System', value: 'Concealed Touch-Open' }
    ],
    hotspots: [
      {
        id: 'dine-island',
        x: 36,
        y: 56,
        title: 'Monolithic Island Plinth',
        description: 'Waterfalled quartz island with continuous veining and concealed soft-close millwork beneath.',
        material: 'Calacatta Quartz'
      },
      {
        id: 'dine-lighting',
        x: 74,
        y: 28,
        title: 'Architectural Lighting Array',
        description: 'Concealed micro-aperture LED track delivering low-glare task warmth without visual clutter.',
        material: 'Warm 2700K Cove'
      }
    ]
  },
  {
    k: 'bed',
    t: 'Bedroom',
    subtitle: 'Tactile Rest & Auditory Calm',
    d: 'Quiet textures, layered natural linen drapery, and a bespoke acoustic headboard wall crafted for deep, restorative solitude.',
    image: '/assets/mitijen/bedroom.jpeg',
    area: '390 sq.ft',
    materials: ['Acoustic Linen Wall', 'Quarter-Sawn Oak', 'Natural Wool Bouclé'],
    specs: [
      { label: 'Acoustic Absorption', value: 'NRC 0.85 Certified' },
      { label: 'Bedstead System', value: 'Custom Floating Plinth' },
      { label: 'Solar Shading', value: 'Dual Circadian Linen' }
    ],
    hotspots: [
      {
        id: 'bed-headboard',
        x: 36,
        y: 48,
        title: 'Acoustic Headboard Wall',
        description: 'Channel-tufted Belgian linen over sound-absorbing acoustic foam to eliminate exterior urban hum.',
        material: 'Acoustic Belgian Linen'
      },
      {
        id: 'bed-nightstand',
        x: 76,
        y: 44,
        title: 'Floating Bedside Plinth',
        description: 'Integrated cantilevered oak nightstand with concealed wireless charging ingress.',
        material: 'Quarter-Sawn Oak'
      }
    ]
  },
  {
    k: 'dressing',
    t: 'Wardrobe & Dressing',
    subtitle: 'Bespoke Storage & Tactile Joinery',
    d: 'Floor-to-ceiling custom storage, integrated soft LED profiles, and precision organisation engineered for effortless morning rituals.',
    image: '/assets/mitijen/dressing-cupboard.jpeg',
    area: '270 sq.ft',
    materials: ['Fluted Glass Vitrines', 'Hand-Stitched Leather Pulls', 'Warm LED Channels'],
    specs: [
      { label: 'Joinery Elevation', value: '2.8m Full Height' },
      { label: 'Illumination Logic', value: 'Proximity Soft-Fade' },
      { label: 'Interior Liners', value: 'Micro-Suede Trays' }
    ],
    hotspots: [
      {
        id: 'dressing-wardrobe',
        x: 42,
        y: 42,
        title: 'Full-Height Joinery Doors',
        description: 'Bespoke wardrobe doors with concealed pivot hinges and precision vertical grain alignment.',
        material: 'Custom White Oak Millwork'
      },
      {
        id: 'dressing-led',
        x: 66,
        y: 64,
        title: 'Proximity Sensor LED Rail',
        description: 'Recessed aluminum extrusions offering soft vertical illumination when doors glide open.',
        material: 'Micro 2700K LED Rail'
      }
    ]
  }
];
