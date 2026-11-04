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
  area?: string;
  materials: string[];
  specs: RoomSpec[];
  hotspots: RoomHotspot[];
}

export interface RoomCategoryData {
  id: 'residential' | 'commercial' | 'corporate';
  name: string;
  kicker: string;
  title: string;
  lead: string;
  rooms: Room[];
}

export const ROOM_CATEGORIES: Record<'residential' | 'commercial' | 'corporate', RoomCategoryData> = {
  residential: {
    id: 'residential',
    name: 'Residential',
    kicker: 'EXPLORE EVERY SPACE.',
    title: 'Every Corner, Made to Feel Like Yours',
    lead: 'Explore the key areas of a home and see how each one is planned around comfort, function and everyday living.',
    rooms: [
      {
        k: 'living-room',
        t: 'Living Room',
        subtitle: 'A welcoming setting for family time, conversations and everyday living.',
        d: 'A welcoming setting for conversations, family time and quiet moments, brought together with balanced proportions and carefully crafted details.',
        image: '/assets/mitijen/home1.jpeg',
        area: 'Residential Salon',
        materials: ['Natural Wood', 'Soft Fabrics', 'Textured Finishes'],
        specs: [
          { label: 'LAYOUT', value: 'Open & Balanced' },
          { label: 'LIGHTING', value: 'Warm & Layered' },
          { label: 'JOINERY', value: 'Custom Crafted' }
        ],
        hotspots: [
          {
            id: 'lr-joinery',
            x: 32,
            y: 42,
            title: 'Custom Crafted Joinery',
            description: 'Balanced proportions with integrated architectural storage and tactile natural finishes.',
            material: 'Natural Wood'
          },
          {
            id: 'lr-lighting',
            x: 68,
            y: 28,
            title: 'Warm & Layered Lighting',
            description: 'Concealed ambient illumination highlighting textures and architectural depth.',
            material: 'Soft Light'
          }
        ]
      },
      {
        k: 'entrance-foyer',
        t: 'Entrance & Foyer',
        subtitle: 'The first impression of the home, planned to feel warm and inviting.',
        d: 'A considered arrival that introduces the character of the home through clean lines, useful elements and a warm visual transition.',
        image: '/assets/mitijen/hom2.jpeg',
        area: 'Arrival Foyer',
        materials: ['Wood Panels', 'Stone Surfaces', 'Decorative Elements'],
        specs: [
          { label: 'STYLE', value: 'Clean & Welcoming' },
          { label: 'STORAGE', value: 'Built-In Solutions' },
          { label: 'DETAILS', value: 'Statement Finishes' }
        ],
        hotspots: [
          {
            id: 'foyer-panels',
            x: 38,
            y: 45,
            title: 'Wood Paneling & Clean Lines',
            description: 'Warm architectural paneling creating a thoughtful threshold transition into the home.',
            material: 'Wood Panels'
          },
          {
            id: 'foyer-console',
            x: 65,
            y: 62,
            title: 'Stone Surfaces',
            description: 'Integrated console plinth in durable stone for welcoming everyday functionality.',
            material: 'Stone Surfaces'
          }
        ]
      },
      {
        k: 'kitchen-dining',
        t: 'Kitchen & Dining',
        subtitle: 'Practical, comfortable surroundings for cooking, dining and gathering.',
        d: 'Planned around cooking, dining and gathering, with an efficient arrangement that keeps movement smooth and everyday routines easy.',
        image: '/assets/mitijen/kitchen.jpeg',
        area: 'Culinary & Dining',
        materials: ['Solid Surfaces', 'Premium Hardware', 'Easy-Care Finishes'],
        specs: [
          { label: 'LAYOUT', value: 'Efficient & Open' },
          { label: 'WORKFLOW', value: 'Easy & Seamless' },
          { label: 'HARDWARE', value: 'Quality & Durable' }
        ],
        hotspots: [
          {
            id: 'kitchen-island',
            x: 44,
            y: 56,
            title: 'Solid Work Surfaces',
            description: 'Seamless solid surface counters engineered for easy cleaning and food preparation.',
            material: 'Solid Surfaces'
          },
          {
            id: 'kitchen-hardware',
            x: 75,
            y: 48,
            title: 'Premium Hardware',
            description: 'Concealed soft-close drawer tracks and ergonomic handles built for long-lasting daily use.',
            material: 'Durable Hardware'
          }
        ]
      },
      {
        k: 'bedroom-wardrobe',
        t: 'Bedroom & Wardrobe',
        subtitle: 'Personal spaces designed for comfort, privacy and organised living.',
        d: 'A private retreat designed for restful evenings and organised mornings, combining a calm atmosphere with purposeful wardrobe planning.',
        image: '/assets/mitijen/bedroom.jpeg',
        area: 'Private Suite',
        materials: ['Woodgrain Finishes', 'Soft Textures', 'Custom Fittings'],
        specs: [
          { label: 'ATMOSPHERE', value: 'Quiet & Relaxed' },
          { label: 'WARDROBES', value: 'Tailored Storage' },
          { label: 'LIGHTING', value: 'Soft & Ambient' }
        ],
        hotspots: [
          {
            id: 'bed-wardrobes',
            x: 40,
            y: 44,
            title: 'Tailored Storage',
            description: 'Custom floor-to-ceiling wardrobes organized for effortless everyday storage and visual calm.',
            material: 'Woodgrain Finishes'
          },
          {
            id: 'bed-lighting',
            x: 72,
            y: 35,
            title: 'Soft & Ambient Lighting',
            description: 'Low-glare bedside luminaires designed to support relaxation and nighttime comfort.',
            material: 'Ambient Light'
          }
        ]
      }
    ]
  },
  commercial: {
    id: 'commercial',
    name: 'Commercial',
    kicker: 'EXPLORE THE BUSINESS',
    title: 'A Business, From First Impression to Experience.',
    lead: 'Explore the key areas customers interact with, from the moment they enter to the way they browse, connect and spend time.',
    rooms: [
      {
        k: 'com-reception',
        t: 'Reception & Entrance',
        subtitle: 'A welcoming arrival that introduces the character of your business.',
        d: 'The first point of contact with your business, designed to welcome customers while introducing your brand with clarity and confidence.',
        image: '/assets/CS.jpg',
        area: 'Commercial Arrival',
        materials: ['Feature Walls', 'Glass', 'Refined Finishes'],
        specs: [
          { label: 'IMPRESSION', value: 'Distinctive & Inviting' },
          { label: 'BRANDING', value: 'Visible & Refined' },
          { label: 'FLOW', value: 'Clear & Natural' }
        ],
        hotspots: [
          {
            id: 'com-rec-wall',
            x: 35,
            y: 40,
            title: 'Distinctive Feature Wall',
            description: 'Tactile background textures that frame the arrival and reinforce brand identity.',
            material: 'Feature Walls'
          },
          {
            id: 'com-rec-flow',
            x: 65,
            y: 60,
            title: 'Clear & Natural Flow',
            description: 'Spacious entry path ensuring smooth customer transition from outside to interior.',
            material: 'Refined Finishes'
          }
        ]
      },
      {
        k: 'com-customer-area',
        t: 'Customer Area',
        subtitle: 'Comfortable surroundings designed for natural customer interaction.',
        d: 'Comfortable surroundings that make customers feel at ease, with thoughtful planning that supports smooth movement and natural interaction.',
        image: '/assets/mitijen/commercial1.jpeg',
        area: 'Engagement Zone',
        materials: ['Upholstery', 'Timber Details', 'Durable Surfaces'],
        specs: [
          { label: 'LAYOUT', value: 'Open & Accessible' },
          { label: 'SEATING', value: 'Comfortable & Flexible' },
          { label: 'EXPERIENCE', value: 'Welcoming & Engaging' }
        ],
        hotspots: [
          {
            id: 'com-cust-seating',
            x: 42,
            y: 52,
            title: 'Comfortable Seating',
            description: 'Ergonomic upholstered lounge furniture encouraging guests to dwell and engage comfortably.',
            material: 'Upholstery'
          },
          {
            id: 'com-cust-timber',
            x: 70,
            y: 45,
            title: 'Timber Details',
            description: 'Natural wood paneling creating warmth and acoustic comfort across the interaction zone.',
            material: 'Timber Details'
          }
        ]
      },
      {
        k: 'com-display',
        t: 'Display & Showcase',
        subtitle: 'Well-planned presentation that keeps products and brand identity in focus.',
        d: 'Purposeful presentation that gives products the attention they deserve while keeping the overall environment visually balanced.',
        image: '/assets/mitijen/commercial2.jpeg',
        area: 'Showcase Suite',
        materials: ['Glass', 'Feature Lighting', 'Custom Displays'],
        specs: [
          { label: 'PRESENTATION', value: 'Clear & Impactful' },
          { label: 'LIGHTING', value: 'Focused & Highlighted' },
          { label: 'ARRANGEMENT', value: 'Organised & Fluid' }
        ],
        hotspots: [
          {
            id: 'com-disp-lighting',
            x: 48,
            y: 35,
            title: 'Focused Feature Lighting',
            description: 'Precision illumination directed onto merchandise and key display vignettes.',
            material: 'Feature Lighting'
          },
          {
            id: 'com-disp-cases',
            x: 62,
            y: 58,
            title: 'Custom Display Joinery',
            description: 'Frameless glass showcases and durable modular pedestals ensuring clear sightlines.',
            material: 'Glass & Joinery'
          }
        ]
      },
      {
        k: 'com-cafe',
        t: 'Cafe & Dining',
        subtitle: 'Inviting surroundings that encourage comfort, connection and longer stays.',
        d: 'An inviting setting created for relaxed dining and meaningful moments, balancing atmosphere, comfort and practical movement.',
        image: '/assets/mitijen/commercial3.jpeg',
        area: 'Dining Pavilion',
        materials: ['Wood Details', 'Upholstery', 'Easy-Care Surfaces'],
        specs: [
          { label: 'ATMOSPHERE', value: 'Warm & Inviting' },
          { label: 'SEATING', value: 'Comfortable & Versatile' },
          { label: 'AMBIENCE', value: 'Relaxed & Memorable' }
        ],
        hotspots: [
          {
            id: 'com-cafe-ambience',
            x: 38,
            y: 42,
            title: 'Warm & Inviting Ambience',
            description: 'Low-level lighting and acoustic paneling that support pleasant conversations over meals.',
            material: 'Wood Details'
          },
          {
            id: 'com-cafe-surfaces',
            x: 66,
            y: 64,
            title: 'Easy-Care Surfaces',
            description: 'Durable, stain-resistant table surfaces engineered for high turnover hospitality environments.',
            material: 'Easy-Care Finishes'
          }
        ]
      }
    ]
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate',
    kicker: 'CORPORATE',
    title: 'EXPLORE WORKPLACE',
    lead: 'Thoughtfully planned environments that support your people, reflect your culture and elevate the everyday work experience.',
    rooms: [
      {
        k: 'corp-reception',
        t: 'Reception & Waiting',
        subtitle: 'A professional welcome that reflects the organisation from the moment people arrive.',
        d: 'A polished arrival that creates a confident first impression while giving visitors a comfortable place to pause.',
        image: '/assets/mitijen/commercial.jpeg',
        area: 'Executive Arrival',
        materials: ['Wood Finishes', 'Glass', 'Feature Surfaces'],
        specs: [
          { label: 'STYLE', value: 'Professional & Welcoming' },
          { label: 'SEATING', value: 'Comfortable & Refined' },
          { label: 'BRANDING', value: 'Clear & Integrated' }
        ],
        hotspots: [
          {
            id: 'corp-rec-brand',
            x: 36,
            y: 38,
            title: 'Integrated Branding',
            description: 'Subtle architectural signage seamlessly embedded into wood finished wall panels.',
            material: 'Feature Surfaces'
          },
          {
            id: 'corp-rec-lounge',
            x: 64,
            y: 55,
            title: 'Refined Visitor Seating',
            description: 'Comfortable guest armchairs providing an executive, dignified welcome.',
            material: 'Wood & Glass'
          }
        ]
      },
      {
        k: 'corp-work',
        t: 'Work Areas',
        subtitle: 'Comfortable, well-planned environments that support focus and productivity.',
        d: 'Planned to support focused work throughout the day, with a balance of productivity, comfort and smooth movement.',
        image: '/assets/mitijen/commercial4.jpeg',
        area: 'Team Workspaces',
        materials: ['Durable Surfaces', 'Acoustic Elements', 'Quality Fittings'],
        specs: [
          { label: 'LAYOUT', value: 'Focused & Flexible' },
          { label: 'ERGONOMICS', value: 'Comfort-Driven' },
          { label: 'LIGHTING', value: 'Clear & Balanced' }
        ],
        hotspots: [
          {
            id: 'corp-work-desks',
            x: 45,
            y: 54,
            title: 'Focused & Flexible Layout',
            description: 'Modular ergonomic workstations with integrated wire management and privacy dividers.',
            material: 'Durable Surfaces'
          },
          {
            id: 'corp-work-acoustics',
            x: 70,
            y: 32,
            title: 'Acoustic Elements',
            description: 'Overhead ceiling baffles designed to absorb reverberation and support deep concentration.',
            material: 'Acoustic Elements'
          }
        ]
      },
      {
        k: 'corp-meeting',
        t: 'Meeting Rooms',
        subtitle: 'Purposeful settings for discussions, presentations and important decisions.',
        d: 'Purposeful settings for presentations, discussions and important decisions, with the right balance of privacy and collaboration.',
        image: '/assets/mitijen/commercial5.jpeg',
        area: 'Conference Suites',
        materials: ['Acoustic Panels', 'Glass Partitions', 'Refined Finishes'],
        specs: [
          { label: 'PRIVACY', value: 'Focused & Secure' },
          { label: 'TECHNOLOGY', value: 'Integrated & Practical' },
          { label: 'SEATING', value: 'Professional & Comfortable' }
        ],
        hotspots: [
          {
            id: 'corp-meet-table',
            x: 50,
            y: 58,
            title: 'Integrated Tech Table',
            description: 'Monolithic conference table with flush power and AV connectivity for hybrid discussions.',
            material: 'Refined Finishes'
          },
          {
            id: 'corp-meet-glass',
            x: 75,
            y: 40,
            title: 'Acoustic Glass Partitions',
            description: 'Double-glazed glass partitions offering visual openness with superior acoustic containment.',
            material: 'Glass Partitions'
          }
        ]
      },
      {
        k: 'corp-breakout',
        t: 'Breakout & Lounge',
        subtitle: 'Relaxed areas for informal conversations, breaks and connection.',
        d: 'Relaxed areas that give teams room to recharge, connect informally and step away from their regular work routine.',
        image: '/assets/mitijen/commercial6.jpeg',
        area: 'Collaboration Lounge',
        materials: ['Soft Furnishings', 'Timber Details', 'Textured Surfaces'],
        specs: [
          { label: 'ATMOSPHERE', value: 'Relaxed & Inviting' },
          { label: 'SEATING', value: 'Flexible & Comfortable' },
          { label: 'FUNCTION', value: 'Pause & Connect' }
        ],
        hotspots: [
          {
            id: 'corp-break-seating',
            x: 38,
            y: 52,
            title: 'Flexible & Comfortable Seating',
            description: 'Soft sectional sofas and high counters allowing teams to pause or brainstorm casually.',
            material: 'Soft Furnishings'
          },
          {
            id: 'corp-break-timber',
            x: 68,
            y: 42,
            title: 'Timber Details',
            description: 'Warm timber accents and textural materials that create a relaxed, welcoming atmosphere.',
            material: 'Timber Details'
          }
        ]
      }
    ]
  }
};

// Default backward compatibility export
export const ROOMS: Room[] = ROOM_CATEGORIES.residential.rooms;
