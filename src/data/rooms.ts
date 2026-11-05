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
    kicker: 'EXPLORE THE SPACE',
    title: 'Every Corner, Made to Feel Like Yours',
    lead: 'Select a space to inspect bespoke millwork, ambient lighting and tactile material layers.',
    rooms: [
      {
        k: 'living-room',
        t: 'Living Room',
        subtitle: 'Spatial sanctuary & open joinery',
        d: 'Low linen seating and bespoke architectural joinery gather around a sun-drenched living space, framed by natural quarter-sawn oak.',
        image: '/assets/mitijen/home1.jpeg',
        area: '640 sq.ft',
        materials: ['Quarter-Sawn White Oak', 'Belgian Natural Linen', 'Honed Travertine'],
        specs: [
          { label: 'CEILING', value: '3.4m Unbroken' },
          { label: 'DAYLIGHT', value: 'North-East Wash' },
          { label: 'ACOUSTIC', value: 'Perimeter Slats' }
        ],
        hotspots: [
          {
            id: 'lr-niche',
            x: 29.7,
            y: 38.6,
            title: 'Honed Stone Niche',
            description: 'Honed stone niche with concealed linear lighting.',
            material: 'Honed Travertine'
          },
          {
            id: 'lr-door',
            x: 66,
            y: 71.5,
            title: 'Solid Oak Door',
            description: 'Solid oak door in a flush, shadow-gap architrave.',
            material: 'Quarter-Sawn Oak'
          }
        ]
      },
      {
        k: 'kitchen-dining',
        t: 'Kitchen & Dining',
        subtitle: 'Gathering & culinary craft',
        d: 'A long walnut table and flush tall joinery turn cooking and dining into one calm, continuous gathering space.',
        image: '/assets/mitijen/kitchen.jpeg',
        area: '480 sq.ft',
        materials: ['Solid Walnut', 'Honed Concrete', 'Sage Velvet'],
        specs: [
          { label: 'CEILING', value: '3.1m Concrete Soffit' },
          { label: 'DAYLIGHT', value: 'Panoramic Valley View' },
          { label: 'ACOUSTIC', value: 'Felt-Lined Panels' }
        ],
        hotspots: [
          {
            id: 'kd-table',
            x: 48,
            y: 50,
            title: 'Solid Walnut Table',
            description: 'Solid walnut table, hand-oiled for tactile warmth.',
            material: 'Solid Walnut'
          },
          {
            id: 'kd-glazing',
            x: 22,
            y: 32,
            title: 'Floor-to-Ceiling Glazing',
            description: 'Floor-to-ceiling glazing framing the landscape.',
            material: 'Low-Iron Glass'
          }
        ]
      },
      {
        k: 'bedroom',
        t: 'Bedroom',
        subtitle: 'Quiet retreat & soft texture',
        d: 'Layered linen, boucle and warm indirect light create a low-contrast retreat built for rest.',
        image: '/assets/mitijen/bedroom.jpeg',
        area: '390 sq.ft',
        materials: ['Washed Linen', 'Lime Plaster', 'Smoked Oak'],
        specs: [
          { label: 'CEILING', value: '2.9m Plaster Vault' },
          { label: 'DAYLIGHT', value: 'East Morning Light' },
          { label: 'ACOUSTIC', value: 'Upholstered Headboard' }
        ],
        hotspots: [
          {
            id: 'bed-headboard',
            x: 34,
            y: 62,
            title: 'Upholstered Bed Head',
            description: 'Upholstered bed head with concealed reading lights.',
            material: 'Washed Linen'
          },
          {
            id: 'bed-linen',
            x: 62,
            y: 38,
            title: 'Sheer Linen Layers',
            description: 'Sheer linen layers to soften east light.',
            material: 'Belgian Linen'
          }
        ]
      },
      {
        k: 'wardrobe-dressing',
        t: 'Wardrobe & Dressing',
        subtitle: 'Tailored storage & dressing',
        d: 'Tailored oak joinery with concealed lighting and a low plinth bed makes dressing feel considered and unhurried.',
        image: '/assets/panorama_wardrobe.jpg',
        area: '270 sq.ft',
        materials: ['Rift Oak', 'Brushed Bronze', 'Wool Felt'],
        specs: [
          { label: 'CEILING', value: '2.8m Lit Cove' },
          { label: 'DAYLIGHT', value: 'Borrowed Daylight' },
          { label: 'ACOUSTIC', value: 'Soft-Close Millwork' }
        ],
        hotspots: [
          {
            id: 'wardrobe-shelving',
            x: 60,
            y: 40,
            title: 'Rift Oak Shelving',
            description: 'Rift oak shelving with integrated LED edge lighting.',
            material: 'Rift Oak'
          },
          {
            id: 'wardrobe-plinth',
            x: 40,
            y: 75,
            title: 'Low Upholstered Plinth',
            description: 'Low upholstered plinth, tailored to the room.',
            material: 'Wool Felt'
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
        area: '540 sq.ft',
        materials: ['Feature Walls', 'Glass', 'Refined Finishes'],
        specs: [
          { label: 'CEILING', value: '3.6m Floating Acoustic' },
          { label: 'DAYLIGHT', value: 'Streetfront Wash' },
          { label: 'ACOUSTIC', value: 'Fluted Wood Panels' }
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
        area: '720 sq.ft',
        materials: ['Upholstery', 'Timber Details', 'Durable Surfaces'],
        specs: [
          { label: 'CEILING', value: '3.2m Open Trusses' },
          { label: 'DAYLIGHT', value: 'Natural Clerestory' },
          { label: 'ACOUSTIC', value: 'Upholstered Baffles' }
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
        area: '460 sq.ft',
        materials: ['Glass', 'Feature Lighting', 'Custom Displays'],
        specs: [
          { label: 'CEILING', value: '3.0m Recessed Track' },
          { label: 'DAYLIGHT', value: 'Glare-Free Ambient' },
          { label: 'ACOUSTIC', value: 'Perforated Felt' }
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
        area: '680 sq.ft',
        materials: ['Wood Details', 'Upholstery', 'Easy-Care Surfaces'],
        specs: [
          { label: 'CEILING', value: '3.4m Slatted Timber' },
          { label: 'DAYLIGHT', value: 'Courtyard Infused' },
          { label: 'ACOUSTIC', value: 'Sound Banquettes' }
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
        area: '620 sq.ft',
        materials: ['Wood Finishes', 'Glass', 'Feature Surfaces'],
        specs: [
          { label: 'CEILING', value: '3.5m Monolithic Cove' },
          { label: 'DAYLIGHT', value: 'North Elevation' },
          { label: 'ACOUSTIC', value: 'Acoustic Plaster' }
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
        area: '1,200 sq.ft',
        materials: ['Durable Surfaces', 'Acoustic Elements', 'Quality Fittings'],
        specs: [
          { label: 'CEILING', value: '3.0m Linear Baffles' },
          { label: 'DAYLIGHT', value: 'Circadian Smart Wash' },
          { label: 'ACOUSTIC', value: 'Felt Desk Dividers' }
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
        area: '480 sq.ft',
        materials: ['Acoustic Panels', 'Glass Partitions', 'Refined Finishes'],
        specs: [
          { label: 'CEILING', value: '2.9m Acoustic Cloud' },
          { label: 'DAYLIGHT', value: 'Switchable Smart Glass' },
          { label: 'ACOUSTIC', value: 'Double Glazed STC 48' }
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
        area: '550 sq.ft',
        materials: ['Soft Furnishings', 'Timber Details', 'Textured Surfaces'],
        specs: [
          { label: 'CEILING', value: '3.1m Timber Slats' },
          { label: 'DAYLIGHT', value: 'East Terrace Light' },
          { label: 'ACOUSTIC', value: 'Low-Reverberation' }
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
