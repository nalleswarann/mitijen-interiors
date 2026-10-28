export interface PortfolioProject {
  id: string;
  shortId: string;
  num: string;
  name: string;
  location: string;
  category: string;
  tags: string[];
  year: string;
  area: string;
  typology: string;
  status: string;
  description: string;
  concept: string;
  materials: string[];
  challenge: string;
  solution: string;
  coverImage: string;
  galleryImages: string[];
  aspectRatio: string;
}

export interface MaterialDetail {
  id: string;
  title: string;
  num: string;
  description: string;
  seenIn: string;
  image: string;
  specs: string;
}

export const PORTFOLIO_FILTERS = [
  'All Projects',
  'Residential',
  'Apartments',
  'Living Spaces',
  'Bedrooms'
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'quiet-residence',
    shortId: 'qr',
    num: '01',
    name: 'The Quiet Residence',
    location: 'Chennai, India',
    category: 'Residential',
    tags: ['Residential', 'Living Spaces'],
    year: '2025',
    area: '4,800 sq.ft',
    typology: 'Private Villa Architecture',
    status: 'Completed 2025',
    description: 'A warm, contemporary home built around natural materials, open spaces, and carefully considered daylight.',
    concept: 'The house is organised around a travertine spine so daylight can travel from the garden edge to the deepest room.',
    materials: ['Honed Roman Travertine', 'Quarter-sawn Natural Oak', 'Washed Belgian Linen', 'Patinated Bronze Trims'],
    challenge: 'Deep interior floor plates received inadequate natural light during afternoon hours.',
    solution: 'Floor-to-ceiling acoustic glass partitions and pale honed stone surfaces reflect daylight into central living sanctuaries.',
    coverImage: '/assets/mitijen/Banner1.jpg',
    galleryImages: [
      '/assets/mitijen/Banner1.jpg',
      '/assets/mitijen/panaroma/panaroma1.png',
      '/assets/mitijen/home1.jpeg',
      '/assets/mitijen/mitigen1.jpeg'
    ],
    aspectRatio: '16/11'
  },
  {
    id: 'olive-house',
    shortId: 'oh',
    num: '02',
    name: 'The Olive House',
    location: 'Coimbatore, India',
    category: 'Residential',
    tags: ['Residential', 'Living Spaces'],
    year: '2024',
    area: '3,600 sq.ft',
    typology: 'Courtyard Residence',
    status: 'Completed 2024',
    description: 'A layered interior combining muted olive tones, natural oak, and sculptural architectural furniture.',
    concept: 'Muted olive acts as a quiet neutral that ties each room to the surrounding lush courtyard greenery.',
    materials: ['Lime Plaster Walls', 'Custom Oak Joinery', 'Olive Wool Upholstery', 'Hand-brushed Aged Brass'],
    challenge: 'Multiple compartmentalised rooms created fragmented circulation and visual clutter.',
    solution: 'Re-proportioned spatial portals and continuous ceiling planes unify the entire ground floor sequence.',
    coverImage: '/assets/mitijen/Banner2.jpg',
    galleryImages: [
      '/assets/mitijen/Banner2.jpg',
      '/assets/mitijen/hom2.jpeg',
      '/assets/mitijen/deco1.jpeg',
      '/assets/mitijen/deco2.jpeg'
    ],
    aspectRatio: '3/4'
  },
  {
    id: 'stillwater-apartment',
    shortId: 'sa',
    num: '03',
    name: 'The Stillwater Apartment',
    location: 'Bengaluru, India',
    category: 'Apartment',
    tags: ['Apartments', 'Living Spaces'],
    year: '2026',
    area: '2,450 sq.ft',
    typology: 'High-Rise Residence',
    status: 'Completed 2026',
    description: 'A calm urban apartment that balances practical daily living with refined, tactile material choices.',
    concept: 'Bespoke storage dissolves into monolithic walls so the natural oak floor and city vista define the space.',
    materials: ['Pale French Oak', 'Seamless Microcement', 'Brushed Low-Reflectance Steel', 'Belgian Slub Linen'],
    challenge: 'A compact urban footprint required expansive concealed storage without heavy visual bulk.',
    solution: 'Integrated floor-to-ceiling handleless millwork creates flush architectural surfaces throughout.',
    coverImage: '/assets/mitijen/Banner3.jpg',
    galleryImages: [
      '/assets/mitijen/Banner3.jpg',
      '/assets/mitijen/panaroma/panaroma2.png',
      '/assets/mitijen/home3.jpeg',
      '/assets/mitijen/mitigen3.jpeg'
    ],
    aspectRatio: '4/5'
  },
  {
    id: 'morning-suite',
    shortId: 'ms',
    num: '04',
    name: 'The Morning Suite',
    location: 'Chennai, India',
    category: 'Bedroom',
    tags: ['Bedrooms', 'Residential'],
    year: '2025',
    area: '1,200 sq.ft',
    typology: 'Master Bedroom & En-Suite',
    status: 'Completed 2025',
    description: 'A restful master suite sanctuary featuring tactile acoustic textiles, warm cove wash lighting, and an understated neutral palette.',
    concept: 'A layered, low-contrast scheme shaped specifically for calm slow mornings and acoustic serenity.',
    materials: ['Textured Boucle', 'Washed Linen Bedding', 'American Walnut Joinery', 'Hand-applied Mineral Plaster'],
    challenge: 'Direct morning solar glare from wide east-facing balcony openings disrupted sleep quality.',
    solution: 'Concealed motorized sheer linen drapery pockets combined with soft indirect 2700K perimeter cove troughs.',
    coverImage: '/assets/mitijen/bedroom.jpeg',
    galleryImages: [
      '/assets/mitijen/bedroom.jpeg',
      '/assets/mitijen/bedroom1.jpeg',
      '/assets/mitijen/dressing-cupboard.jpeg',
      '/assets/mitijen/dressingtable.jpeg'
    ],
    aspectRatio: '16/10'
  },
  {
    id: 'courtyard-residence',
    shortId: 'cr',
    num: '05',
    name: 'The Courtyard Residence',
    location: 'Hyderabad, India',
    category: 'Residential',
    tags: ['Residential', 'Living Spaces'],
    year: '2026',
    area: '5,500 sq.ft',
    typology: 'Biophilic Residence',
    status: 'Completed 2026',
    description: 'An open and light-filled home inspired by regional natural textures and the seamless dialogue between indoor and outdoor living.',
    concept: 'A central landscaped water courtyard forms the breathing heart of the home, with every chamber pivoting around it.',
    materials: ['Honed Tandur Limestone', 'Reclaimed Teak Millwork', 'Terracotta Plaster', 'Woven Natural Cane'],
    challenge: 'Excess solar heat gain during tropical summers while retaining natural air cross-ventilation.',
    solution: 'Deep architectural roof overhangs and operable louvered timber screens naturally temper the micro-climate.',
    coverImage: '/assets/mitijen/warm1.jpeg',
    galleryImages: [
      '/assets/mitijen/warm1.jpeg',
      '/assets/mitijen/warm2.jpeg',
      '/assets/mitijen/warm4.jpeg',
      '/assets/mitijen/deco3.jpeg'
    ],
    aspectRatio: '1/1'
  }
];

export const PORTFOLIO_MATERIALS: MaterialDetail[] = [
  {
    id: 'stone',
    title: 'Natural Stone',
    num: '01',
    description: 'Quartz-veined Italian travertine and honed limestone, finished with a soft matte sealer so daylight diffuses naturally.',
    seenIn: 'The Quiet Residence',
    image: '/assets/mitijen/Banner1.jpg',
    specs: 'Origin: Tivoli, Italy · Finish: Honed Satin Matte · Application: Architectural Columns & Monolithic Fireplaces'
  },
  {
    id: 'oak',
    title: 'Oak Wood',
    num: '02',
    description: 'Quarter-sawn European white oak, hand-oiled rather than lacquered to preserve the organic warmth and breath of the wood grain.',
    seenIn: 'The Olive House',
    image: '/assets/mitijen/BF&AF/AFWood.jpeg',
    specs: 'Origin: French White Oak · Treatment: Natural Bio-Oil Wax · Application: Floating Joinery & Wide-Plank Floors'
  },
  {
    id: 'linen',
    title: 'Linen Fabric',
    num: '03',
    description: 'Washed Belgian flax with a tactile visible slub weave, selected for its acoustic softness and graceful aging under ambient light.',
    seenIn: 'The Morning Suite',
    image: '/assets/mitijen/bedroom.jpeg',
    specs: 'Composition: 100% Heavy Belgian Flax · Texture: Open Slub Weave · Application: Deep Modular Seating & Sheer Drapery'
  },
  {
    id: 'metal',
    title: 'Brushed Metal',
    num: '04',
    description: 'Satin brushed architectural bronze and blackened steel, applied sparingly as slender, quiet accents across cabinetry and lighting.',
    seenIn: 'The Stillwater Apartment',
    image: '/assets/mitijen/deco-kitchen.jpeg',
    specs: 'Material: Solid Architectural Bronze · Finish: Directional Satin Brush · Application: Concealed Hardware & Linear Troughs'
  },
  {
    id: 'plaster',
    title: 'Textured Plaster',
    num: '05',
    description: 'Hand-trowelled mineral lime plaster that breathes with the space and creates monolithic walls with subtle depth and shadow play.',
    seenIn: 'The Courtyard Residence',
    image: '/assets/mitijen/Banner2.jpg',
    specs: 'Composition: Mineral Slaked Lime & Quartz · Layering: 3-Coat Artisan Trowel · Application: Monolithic Interior Envelopes'
  }
];

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'kitchen-transformation',
    title: 'Minimalist Monolithic Kitchen',
    category: 'Full Spatial Remodel',
    location: 'Chennai Residence',
    description: 'Stripping back cluttered tiles and raw masonry to introduce flush fluted cabinetry, concealed ducted extraction, and integrated cove lighting.',
    beforeImage: '/assets/mitijen/BF&AF/KitchenBF.jpeg',
    afterImage: '/assets/mitijen/BF&AF/KitchenAF.jpeg',
    beforeLabel: 'Raw Site Status',
    afterLabel: 'Crafted Completion'
  },
  {
    id: 'joinery-transformation',
    title: 'Architectural Millwork & Wardrobe',
    category: 'Bespoke Joinery',
    location: 'Morning Suite En-Suite',
    description: 'Replacing standard modular carcass boxes with floor-to-ceiling quarter-sawn timber doors and flush recessed satin bronze handles.',
    beforeImage: '/assets/mitijen/BF&AF/BFCupboard.jpeg',
    afterImage: '/assets/mitijen/BF&AF/AFCupboard.jpeg',
    beforeLabel: 'Initial Framework',
    afterLabel: 'Hand-Finished Joinery'
  },
  {
    id: 'partition-transformation',
    title: 'Light-Permeable Room Divider',
    category: 'Spatial Partitioning',
    location: 'Stillwater Salon',
    description: 'Transforming an unrendered partition wall into an elegant fluted timber and marble portal connecting living and dining zones.',
    beforeImage: '/assets/mitijen/BF&AF/BFreck.jpeg',
    afterImage: '/assets/mitijen/BF&AF/AFreck.jpeg',
    beforeLabel: 'Civil Masonry',
    afterLabel: 'Architectural Screen'
  }
];

