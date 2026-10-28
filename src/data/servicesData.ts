export interface ServiceCard {
  id: string;
  title: string;
  tag: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
}

export interface DesignConsideration {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  description: string;
  deliverables: string;
}

export interface PropertyTypeOrStyle {
  name: string;
  category: string;
  description: string;
  highlights: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HomeownerChallenge {
  id: string;
  icon: string;
  situation: string;
  solution: string;
  highlight: string;
}

export interface RelatedServiceLink {
  title: string;
  category: string;
  slug: string;
  description: string;
  image: string;
}

export interface ServicePageData {
  slug: string;
  category: 'Residential' | 'Commercial' | 'Corporate';
  seo: {
    title: string;
    description: string;
    canonical: string;
    h1: string;
    keywords: string[];
    ogImage: string;
  };
  hero: {
    headline: string;
    supportingText: string;
    bgImage: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  overview: {
    sectionTag: string;
    title: string;
    leadParagraph: string;
    bodyParagraphs: string[];
    keyStats: Array<{ value: string; label: string }>;
  };
  challengesSection?: {
    sectionTag: string;
    title: string;
    subtitle: string;
    intro: string;
    items: HomeownerChallenge[];
  };
  servicesSection: {
    sectionTag: string;
    title: string;
    subtitle: string;
    cards: ServiceCard[];
  };
  considerationsSection: {
    sectionTag: string;
    title: string;
    subtitle: string;
    intro: string;
    items: DesignConsideration[];
  };
  processSection: {
    sectionTag: string;
    title: string;
    subtitle: string;
    intro: string;
    steps: ProcessStep[];
  };
  stylesOrTypesSection: {
    sectionTag: string;
    title: string;
    subtitle: string;
    intro: string;
    items: PropertyTypeOrStyle[];
  };
  whyProfessionalSection: {
    sectionTag: string;
    title: string;
    subtitle: string;
    intro: string;
    reasons: Array<{ title: string; text: string }>;
  };
  faqsSection: {
    sectionTag: string;
    title: string;
    subtitle: string;
    faqs: FAQItem[];
  };
  relatedServices: RelatedServiceLink[];
  finalCta: {
    sectionTag: string;
    headline: string;
    supportingText: string;
    buttonText: string;
  };
}

export const SERVICES_DATA: Record<string, ServicePageData> = {
  'residential-interior-design': {
    slug: 'residential-interior-design',
    category: 'Residential',
    seo: {
      title: 'Residential Interior Design Services | Home Interiors | Mitjen Interiors',
      description: 'Explore residential interior design services for apartments, villas and independent homes. Discover functional layouts, thoughtful material choices and personalised living spaces.',
      canonical: '/services/residential-interior-design',
      h1: 'Residential Interior Design Services for Modern Homes',
      keywords: [
        'residential interior design',
        'home interior designers',
        'residential interior design services',
        'modern home interiors',
        'apartment interior design',
        'villa interior design',
        'living room interior design',
        'bedroom interior design',
        'modular kitchen design',
        'space-saving home interiors',
        'custom home interior solutions'
      ],
      ogImage: '/assets/mitijen/home1.jpeg'
    },
    hero: {
      headline: 'Residential Interior Design for the Way You Live',
      supportingText: 'Discover thoughtfully planned interiors that balance comfort, functionality, aesthetics and everyday living. From compact urban apartments to spacious family villas, we create environments shaped around natural light, honest materials, and personal routines.',
      bgImage: '/assets/mitijen/home1.jpeg',
      primaryCtaText: 'Explore Our Residential Services',
      secondaryCtaText: 'Book a Design Consultation'
    },
    overview: {
      sectionTag: 'Home Interior Architecture · Krishnagiri & Region',
      title: 'Thoughtfully Planned Living Spaces for Modern Homeowners',
      leadParagraph: 'Whether you are taking handover of a new apartment, planning a custom duplex villa, or renovating your family home, our turnkey interior design service bridges aesthetic luxury with everyday practical comfort.',
      bodyParagraphs: [
        'A truly welcoming home starts long before paint and furniture—it begins with smart layout planning. We study how your household actually lives: mapping morning routines, maximizing natural daylight through windows, carving out hidden storage for clutter-free living, and creating smooth walking paths between living, dining, and kitchen areas.',
        'From precision factory-manufactured modular kitchens and walk-in wardrobes to custom false ceilings and ambient mood lighting, Mitjen Interiors provides complete single-point execution across Krishnagiri, Hosur, and Bangalore. You get a committed project manager, transparent itemized pricing, and a guaranteed 45-day move-in schedule.'
      ],
      keyStats: [
        { value: 'Turnkey', label: 'Single-Point Project Execution' },
        { value: '10-Yr', label: 'Warranty on Branded Hardware' },
        { value: '45-Day', label: 'Committed Move-In Handover' }
      ]
    },
    challengesSection: {
      sectionTag: 'Problem Solving · Homeowner Guidance',
      title: 'Common Interior Challenges We Solve',
      subtitle: 'Most homeowners face the same frustrations when furnishing a home. Here is how our studio solves each one with total transparency.',
      intro: 'Furnishing a home shouldn’t feel stressful or unpredictable. We address the root issues early in design:',
      items: [
        {
          id: 'storage-clutter',
          icon: '📦',
          situation: 'Cramped Wardrobes & Overflowing Household Clutter',
          solution: 'Custom floor-to-ceiling modular wardrobes, deep pull-out kitchen pantries, and concealed TV credenzas designed to fit your family’s exact belongings.',
          highlight: 'Zero dead corners; maximum vertical storage utilization'
        },
        {
          id: 'dark-layouts',
          icon: '☀️',
          situation: 'Dark Rooms, Poor Airflow & Awkward Wall Placements',
          solution: 'We map sunlight angles, position reflective finishes, and use fluted glass architectural dividers to borrow daylight and keep airflow circulating freely.',
          highlight: 'Open-plan spaciousness without sacrificing private bedroom tranquility'
        },
        {
          id: 'budget-anxiety',
          icon: '📋',
          situation: 'Contractor Delays, Disappearing Carpenters & Budget Escalations',
          solution: 'Fixed-Price Bill of Quantities (BOQ) with guaranteed zero hidden charges, weekly photo reports, and on-time completion backed by studio commitments.',
          highlight: '100% transparent pricing before any carpentry begins'
        },
        {
          id: 'material-durability',
          icon: '🛡️',
          situation: 'Plywood Swelling, Moisture Leaks & Termite Damage',
          solution: 'We use exclusively 100% calibrated BWR/BWP grade waterproof marine ply, anti-termite core treatments, and German soft-close fittings (Blum & Hafele).',
          highlight: '10-year warranty on core joinery & hardware'
        }
      ]
    },
    servicesSection: {
      sectionTag: 'Scope of Expertise · Residential Portfolio',
      title: 'Our Residential Interior Design Services',
      subtitle: 'Comprehensive interior solutions tailored to diverse home typologies, room functions, and family routines.',
      cards: [
        {
          id: 'res-apartments',
          title: 'Apartment Interior Design',
          tag: 'Urban Residences',
          description: 'Maximising spatial flow, multi-functional joinery, and natural illumination in high-rise apartments and city condominiums.',
          features: [
            'Fluid open-plan living and dining transitions',
            'Integrated architectural storage to eliminate visual clutter',
            'Balcony and indoor garden integration'
          ],
          image: '/assets/mitijen/home1.jpeg',
          imageAlt: 'Contemporary apartment living room interior featuring natural oak joinery and warm ambient lighting'
        },
        {
          id: 'res-villas',
          title: 'Villa & Independent House Interiors',
          tag: 'Expansive Residences',
          description: 'Spacious architectural planning for multi-level private residences, luxury bungalows, and seaside villas.',
          features: [
            'Double-height ceiling and spatial volume articulation',
            'Seamless indoor-outdoor courtyard transitions',
            'Cohesive architectural finishes across levels'
          ],
          image: '/assets/CL.jpg',
          imageAlt: 'Expansive villa interior with monolithic stone elements, linen furnishings, and garden views'
        },
        {
          id: 'res-living',
          title: 'Living Room Design',
          tag: 'Social Sanctuaries',
          description: 'Curating the social heart of the residence with bespoke credenzas, layered illumination, and conversational seating arrangements.',
          features: [
            'Architectural entertainment credenzas and media walls',
            'Zoned conversational and reading corners',
            'Sculptural cove wash lighting and dimmable mood fixtures'
          ],
          image: '/assets/transformations/lounge_after.jpg',
          imageAlt: 'Warm modern living room salon with bespoke low-slung credenza and refined upholstery'
        },
        {
          id: 'res-bedroom',
          title: 'Bedroom Interior Design',
          tag: 'Private Quarters',
          description: 'Restful master sanctuaries and private suites designed for sensory tranquility, quiet acoustics, and restorative sleep.',
          features: [
            'Upholstered headboard walls and concealed wiring',
            'Integrated reading illumination and blackout drapery pockets',
            'Private dressing niches and vanity extensions'
          ],
          image: '/assets/mitijen/bedroom.jpeg',
          imageAlt: 'Serene master bedroom suite featuring natural timber wall paneling and layered neutral textiles'
        },
        {
          id: 'res-kitchen',
          title: 'Modular Kitchen Planning',
          tag: 'Culinary Pavilions',
          description: 'Ergonomic culinary kitchens pairing precision storage, monolithic quartz or marble islands, and durable hardware.',
          features: [
            'Optimised work triangle between prep, cooking, and refrigeration',
            'Concealed appliances, pantries, and deep pull-out organisers',
            'Durable, heat-resistant, and stain-resistant surface selections'
          ],
          image: '/assets/mitijen/kitchen.jpeg',
          imageAlt: 'Modern minimalist kitchen pavilion with monolithic island, fluted wood detailing, and built-in appliances'
        },
        {
          id: 'res-wardrobe',
          title: 'Wardrobe & Storage Solutions',
          tag: 'Architectural Joinery',
          description: 'Custom walk-in closets, reach-in wardrobes, and concealed storage systems crafted to preserve clean visual lines.',
          features: [
            'Tailored garment hanging, pull-out trouser racks, and accessory trays',
            'Fluted glass or timber pocket doors with internal LED lighting',
            'De-humidified joinery design and durable soft-close fittings'
          ],
          image: '/assets/craft_wardrobe.jpg',
          imageAlt: 'Custom architectural walk-in wardrobe with warm internal lighting and tailored wooden shelving'
        },
        {
          id: 'res-bathroom',
          title: 'Bathroom Interior Design',
          tag: 'Bath Sanctuaries',
          description: 'Spa-inspired primary baths and powder suites combining floating vanities, organic mirrors, and water-resistant stone.',
          features: [
            'Niche shower shelving, trench drains, and frameless glass',
            'Floating stone or timber vanity counters with under-glow lights',
            'Anti-fog backlit mirrors and quiet exhaust ventilation'
          ],
          image: '/assets/panorama_bath.jpg',
          imageAlt: 'Spa-like master bathroom with freestanding stone tub, backlit organic vanity mirror, and marble finishes'
        },
        {
          id: 'res-compact',
          title: 'Space Optimisation for Compact Homes',
          tag: 'Clever Living',
          description: 'Intelligent spatial strategies that transform modest square footage into light-filled, versatile residential environments.',
          features: [
            'Transformative furniture and fold-away work desks',
            'Floor-to-ceiling vertical storage utilization',
            'Visual sightline extensions with pocket screens and mirrors'
          ],
          image: '/assets/craft_joinery.jpg',
          imageAlt: 'Smart compact apartment joinery design showing integrated shelving, study desk, and hidden storage'
        }
      ]
    },
    considerationsSection: {
      sectionTag: 'Human-Centred Planning · Design Criteria',
      title: 'Designing Homes Around Everyday Living',
      subtitle: 'Every successful residential environment balances aesthetic stillness with the complex physical realities of everyday life.',
      intro: 'When planning home interiors, our studio analyses seven fundamental architectural criteria to ensure long-term comfort, usability, and effortless maintenance.',
      items: [
        {
          title: 'Spatial Circulation & Flow',
          subtitle: 'Unobstructed Pathways',
          description: 'Mapping natural human movement through hallways, doorways, and shared zones to eliminate awkward pinch points and ensure generous circulation throughout.',
          iconName: 'flow'
        },
        {
          title: 'Daylight & Natural Ventilation',
          subtitle: 'Solar Orientation',
          description: 'Positioning active living zones where daylight thrives while managing thermal gain, cross-ventilation, and privacy with tailored architectural window treatments.',
          iconName: 'sun'
        },
        {
          title: 'Concealed Storage & Organisation',
          subtitle: 'Clutter-Free Stillness',
          description: 'Integrating dedicated storage for household essentials, seasonal items, and electronics into architectural millwork so rooms stay visually serene.',
          iconName: 'box'
        },
        {
          title: 'Tactile Materials & Maintenance',
          subtitle: 'Honest Durability',
          description: 'Selecting natural stone, seasoned hardwoods, and stain-resistant performance fabrics suited to family living, children, and pets without demanding tedious upkeep.',
          iconName: 'layers'
        },
        {
          title: 'Colour, Texture & Architectural Finishes',
          subtitle: 'Cohesive Harmony',
          description: 'Creating layered neutral palettes enriched by subtle textural variations—lime plaster, ribbed glass, travertine, and hand-woven linen—for calming depth.',
          iconName: 'palette'
        },
        {
          title: 'Proportionate Furniture Placement',
          subtitle: 'Balanced Volumes',
          description: 'Scaling furniture pieces to the room’s volume so living areas feel anchored and grounded rather than crowded or uncomfortably sparse.',
          iconName: 'layout'
        },
        {
          title: 'Household Rhythms & Personal Routines',
          subtitle: 'Tailored Lifestyles',
          description: 'Aligning space plans with morning coffee rituals, evening family dining, remote work requirements, and personal hobbies for authentic day-to-day comfort.',
          iconName: 'heart'
        }
      ]
    },
    processSection: {
      sectionTag: 'Clear Roadmap · 4-Phase Delivery Framework',
      title: 'Our Transparent Step-by-Step Design Process',
      subtitle: 'A structured, predictable 4-phase sequence that takes you from initial floor plan to an exquisitely finished home.',
      intro: 'We guide clients through four defined milestones with complete clarity, guaranteed timelines, and single-point accountability:',
      steps: [
        {
          step: 'Stage 01',
          number: '01',
          title: 'Discovery & On-Site Consultation',
          description: 'We meet in-person at your site in Krishnagiri, Hosur, or Bangalore. We measure walls, review natural lighting angles, and document your household routines, storage needs, and aesthetic preferences.',
          deliverables: 'As-built 2D measurements, lifestyle requirements brief, and initial scope outline'
        },
        {
          step: 'Stage 02',
          number: '02',
          title: 'Space Planning & 3D Photorealistic Visualisation',
          description: 'Walk through your future home before construction begins. We present tailored 2D furniture plans and high-definition 3D renders showing lighting, textures, and custom cabinetry in place.',
          deliverables: 'High-definition 3D room renders, detailed floor layouts, and electrical schematics'
        },
        {
          step: 'Stage 03',
          number: '03',
          title: 'Material Curation & Fixed-Price BOQ Sign-Off',
          description: 'Touch and feel actual veneer samples, stone slabs, laminates, and upholstery fabrics. We finalize an itemized Bill of Quantities with transparent, locked-in pricing and zero hidden costs.',
          deliverables: 'Physical material mood trays, hardware specifications, and locked fixed-price contract'
        },
        {
          step: 'Stage 04',
          number: '04',
          title: 'Precision Factory Build & White-Glove Handover',
          description: 'Cabinetry is precision-cut in factory environments with edge-banding, then assembled on site under senior architect supervision. We complete final styling, deep cleaning, and formal key handover.',
          deliverables: 'Move-in ready home, 10-year warranty certificate, and maintenance care kit'
        }
      ]
    },
    stylesOrTypesSection: {
      sectionTag: 'Aesthetic Directions · Curated Expressions',
      title: 'Residential Interior Design Styles',
      subtitle: 'We believe genuine style is born from the intersection of architectural context and personal taste, rather than fleeting trends.',
      intro: 'Here are five enduring design languages frequently explored in our residential projects, customised to match your individual preferences.',
      items: [
        {
          name: 'Warm Contemporary',
          category: 'Modern Living',
          description: 'Crisp geometric lines softened by tactile woods, textured boucle fabrics, concealed cove lighting, and organic ceramic vessels.',
          highlights: ['Low-profile silhouettes', 'Seamless architectural storage', 'Warm neutral palettes']
        },
        {
          name: 'Refined Minimalist',
          category: 'Stillness & Light',
          description: 'A celebration of essential volumes, unadorned surfaces, monolithic stone islands, and intentional negative space that allows the mind to rest.',
          highlights: ['Elimination of visual clutter', 'Shadow gap baseboards', 'Monochromatic material focus']
        },
        {
          name: 'Modern Architectural',
          category: 'Form & Structure',
          description: 'Strong spatial connections between indoor living and exterior nature, featuring exposed structural columns, floor-to-ceiling glass, and steel accents.',
          highlights: ['Visual axis alignments', 'Indoor-outdoor flow', 'Sculptural lighting elements']
        },
        {
          name: 'Transitional Elegance',
          category: 'Timeless Balance',
          description: 'A thoughtful harmony between classical proportions—subtle wall moldings and herringbone parquetry—and streamlined contemporary furnishings.',
          highlights: ['Muted heritage colours', 'Bespoke panelled cabinetry', 'Classic-modern furniture mix']
        },
        {
          name: 'Textural Heritage',
          category: 'Cultural Craftsmanship',
          description: 'Infusing indigenous craft, hand-hewn timbers, cane wickerwork, and artisanal plaster finishes into contemporary spatial arrangements.',
          highlights: ['Locally sourced materials', 'Artisanal joinery details', 'Earthy, ground-rooted tones']
        }
      ]
    },
    whyProfessionalSection: {
      sectionTag: 'Value Proposition · Investment in Living',
      title: 'Why Plan Your Home Interiors Professionally?',
      subtitle: 'Engaging an experienced interior designer transforms your home from an ad-hoc collection of furniture into a unified, enduring architectural experience.',
      intro: 'Here is how professional interior planning protects your vision and elevates day-to-day living.',
      reasons: [
        {
          title: 'Cohesive Vision from Entry to Private Suite',
          text: 'Rather than selecting rooms in isolation, a professional designer establishes a continuous architectural thread—connecting materials, floor transitions, and colour undertones across the entire property.'
        },
        {
          title: 'Unlocking Hidden Spatial Efficiency',
          text: 'Expert space planning identifies dead corners, awkward alcoves, and poorly planned corridors, transforming underutilised square footage into purposeful built-in storage or functional work niches.'
        },
        {
          title: 'Precision Lighting & Electrical Coordination',
          text: 'Illumination makes or breaks an interior. We prepare comprehensive lighting plans that balance ambient ceiling wash, task-focused kitchen counters, and gentle low-level reading sconces.'
        },
        {
          title: 'Informed Material Selection for Longevity',
          text: 'Navigating hundreds of stone varieties, timber veneers, and finishes can be overwhelming. We guide you toward materials with proven durability, authentic patina, and low ongoing maintenance.'
        },
        {
          title: 'Avoidance of Costly Rework & On-Site Mistakes',
          text: 'Detailed 2D layout drawings and technical elevations ensure plumbing, electrical conduits, and air-conditioning ducts are coordinated before carpentry begins, preventing expensive changes down the road.'
        }
      ]
    },
    faqsSection: {
      sectionTag: 'Clarity & Guidance · Questions Answered',
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common questions regarding our residential interior design services, processes, and project requirements.',
      faqs: [
        {
          question: 'What is included in residential interior design?',
          answer: 'Residential interior design encompasses complete spatial planning, layout optimisation, lighting and electrical schematic design, custom joinery and millwork drawings, selection of colours, wall finishes, flooring, hardware, sanitaryware, and curated loose furnishings. We provide both conceptual 3D designs and technical drawing documentation needed to realise the space.'
        },
        {
          question: 'How do I choose an interior designer for my home?',
          answer: 'Look for a design studio whose visual aesthetic aligns with your taste, who values honest materiality and spatial ergonomics, and whose communication process is transparent. Review their portfolio of completed transformations, ask about their step-by-step design process, and ensure they take time to understand your daily routines and household needs.'
        },
        {
          question: 'Can small apartments benefit from customised interior design?',
          answer: 'Absolutely. Compact urban residences often gain the most from tailored interior architecture. Professional space planning can integrate multi-functional furniture, vertical storage, pocket doors, and reflective lighting strategies that make modest footprints feel remarkably open, functional, and organized.'
        },
        {
          question: 'What is the difference between apartment and villa interiors?',
          answer: 'Apartment design typically focuses on space optimisation, managing fixed structural columns and shared utility shafts, and maximizing incoming daylight within a single floorplate. Villa interiors involve multi-level circulation, double-height volumes, grand architectural staircases, and seamless indoor-outdoor transitions to private gardens or terraces.'
        },
        {
          question: 'How do I choose materials for home interiors?',
          answer: 'Material selection depends on lifestyle factors such as whether you have young children or pets, maintenance preferences, natural light exposure, and budget. We recommend durable authentic materials like natural oak or walnut, quartz or honed granite, matte ceramics, and stain-resistant woven textiles that age gracefully over time.'
        },
        {
          question: 'Can residential interiors be designed to match my budget?',
          answer: 'Yes. An effective interior design process establishes budget parameters during the initial consultation. We help prioritize investments—such as allocating budget toward high-impact built-in cabinetry, durable kitchen countertops, and quality lighting, while optimizing loose decor selections—to achieve an elevated aesthetic responsibly.'
        },
        {
          question: 'How does the home interior design process work?',
          answer: 'The process typically unfolds in sequential phases: an initial consultation and lifestyle brief, an on-site survey, preliminary 2D space planning layouts, 3D design concepts and material curation, technical drawing documentation (electrical, plumbing, joinery), and ongoing implementation coordination through final handover.'
        },
        {
          question: 'What should I prepare before a design consultation?',
          answer: 'It is helpful to gather your property floor plan or architectural blueprints, a list of functional must-haves and pain points in your current space, an approximate timeline, and visual reference images that capture materials, colours, and moods you naturally gravitate toward.'
        }
      ]
    },
    relatedServices: [
      {
        title: 'Commercial Interior Design',
        category: 'Business & Retail Spaces',
        slug: '/services/commercial-interior-design',
        description: 'Explore customer-focused retail stores, boutique hospitality venues, and showrooms designed for memorable brand experiences.',
        image: '/assets/CS.jpg'
      },
      {
        title: 'Corporate Office Interior Design',
        category: 'Workplaces & Headquarters',
        slug: '/services/corporate-interior-design',
        description: 'Discover high-performance corporate workspaces balancing collaborative energy, private focus, and architectural identity.',
        image: '/assets/I2.jpg'
      }
    ],
    finalCta: {
      sectionTag: 'Begin Your Journey · Consultation',
      headline: "Let's Design a Home That Feels Like Yours",
      supportingText: 'Whether you are embarking on a complete home transformation, planning a newly acquired property, or refining a specific room suite, our team is ready to bring architectural clarity to your living space.',
      buttonText: 'Book a Residential Consultation'
    }
  },

  'commercial-interior-design': {
    slug: 'commercial-interior-design',
    category: 'Commercial',
    seo: {
      title: 'Commercial Interior Design Services | Business Spaces | Mitjen Interiors',
      description: 'Discover commercial interior design solutions for retail stores, showrooms, cafés and customer-facing spaces, with a focus on functionality, customer experience and brand identity.',
      canonical: '/services/commercial-interior-design',
      h1: 'Commercial Interior Design Services for Business Spaces',
      keywords: [
        'commercial interior design',
        'commercial interior designers',
        'commercial interior design services',
        'retail store interior design',
        'showroom interior design',
        'café interior design',
        'restaurant interior design',
        'customer experience design',
        'commercial space planning',
        'brand-focused interiors'
      ],
      ogImage: '/assets/CS.jpg'
    },
    hero: {
      headline: 'Commercial Interiors Designed Around Your Business',
      supportingText: 'Explore commercial interior concepts that bring together practical layouts, visual identity and customer-focused environments. We shape experiential retail, dining pavilions, and boutique commercial spaces where spatial flow elevates engagement and brand presence.',
      bgImage: '/assets/CS.jpg',
      primaryCtaText: 'Explore Commercial Services',
      secondaryCtaText: 'Discuss Your Project'
    },
    overview: {
      sectionTag: 'Brand Architecture · Customer Flow',
      title: 'Where Commercial Viability Meets Spatial Elegance',
      leadParagraph: 'Commercial interior architecture is the physical manifestation of your brand. It directly shapes how customers discover your products, how easily staff operate, and how memorable the overall customer experience feels.',
      bodyParagraphs: [
        'Unlike purely decorative approaches, commercial interior design requires a rigorous balance of customer journey mapping, visual merchandising psychology, regulatory compliance, and high-traffic material durability. From the moment a patron views your storefront window to the checkout or dining table experience, every sightline and lighting angle plays a decisive role.',
        'We collaborate with retail brands, hospitality entrepreneurs, and boutique owners to create commercial environments that stand out in crowded marketplaces. By combining natural materials, architectural acoustics, purposeful circulation, and adaptable display fixtures, we create destinations that invite patrons to linger, explore, and return.'
      ],
      keyStats: [
        { value: 'Experiential', label: 'Customer-Centred Layouts' },
        { value: 'Cohesive', label: 'Unified Brand Touchpoints' },
        { value: 'Resilient', label: 'Commercial-Grade Durability' }
      ]
    },
    servicesSection: {
      sectionTag: 'Specialist Typologies · Commercial Portfolio',
      title: 'Our Commercial Interior Design Services',
      subtitle: 'Tailored interior architectural solutions for customer-facing commercial spaces, retail brands, and experiential venues.',
      cards: [
        {
          id: 'com-retail',
          title: 'Retail Store Interior Design',
          tag: 'Fashion & Lifestyle',
          description: 'Creating captivating shopping journeys with intuitive merchandise zoning, high-impact focal displays, and spacious change room suites.',
          features: [
            'Customer navigation and decompression threshold design',
            'Flexible modular display fixtures and perimeter shelving',
            'High-CRI accent lighting to showcase merchandise accurately'
          ],
          image: '/assets/CS.jpg',
          imageAlt: 'Luxury retail boutique interior with sculptural stone display plinths and warm perimeter illumination'
        },
        {
          id: 'com-showroom',
          title: 'Showroom Interior Design',
          tag: 'Product Galleries',
          description: 'Experiential product galleries and architectural showrooms designed to highlight craftsmanship, luxury goods, and automotive or design collections.',
          features: [
            'Zoned vignette staging for immersive product discovery',
            'Hospitality consultation bars and private client lounges',
            'Interactive digital display integration and gallery sightlines'
          ],
          image: '/assets/CP.jpg',
          imageAlt: 'Expansive architectural showroom with monolithic materials, natural light, and curated product display vignettes'
        },
        {
          id: 'com-cafe-dining',
          title: 'Café & Restaurant Interiors',
          tag: 'Hospitality Venues',
          description: 'Atmospheric dining sanctuaries combining sensory acoustics, atmospheric lighting, comfortable seating density, and efficient kitchen pass flows.',
          features: [
            'Multi-zone seating plans: banquettes, communal tables, and intimate corners',
            'Acoustic ceiling baffles and reverberation management',
            'Durable, stain-resistant commercial hospitality finishes'
          ],
          image: '/assets/mitijen/warm1.jpeg',
          imageAlt: 'Warm contemporary café and dining pavilion featuring timber seating, natural plaster walls, and warm pendant lights'
        },
        {
          id: 'com-salons',
          title: 'Salon & Studio Interiors',
          tag: 'Wellness & Beauty',
          description: 'Calming, light-optimised spaces for beauty studios, wellness spas, and creative salons where hygiene meets refined luxury.',
          features: [
            'Shadow-free, true-colour flattering mirror illumination',
            'Discreet acoustic zoning between active styling and relaxing wash bays',
            'Concealed plumbing and chemical-resistant work surfaces'
          ],
          image: '/assets/mitijen/deco1.jpeg',
          imageAlt: 'Modern beauty salon and wellness studio with organic mirrors, soft fluted paneling, and warm neutral tones'
        },
        {
          id: 'com-reception',
          title: 'Customer Reception & Waiting Areas',
          tag: 'First Impressions',
          description: 'Welcoming front-of-house arrival zones that establish immediate brand credibility, warmth, and comfortable customer staging.',
          features: [
            'Sculptural reception desks with concealed administrative tech',
            'Comfortable lounge seating with accessible power points',
            'Branded architectural backdrop walls and curated reading displays'
          ],
          image: '/assets/craft_credenza.jpg',
          imageAlt: 'Architectural reception area with bespoke wooden desk, Japanese shoji partition, and warm cove wash lighting'
        },
        {
          id: 'com-display',
          title: 'Display & Product Presentation Areas',
          tag: 'Merchandising Architecture',
          description: 'Bespoke architectural plinths, cantilevered shelving, and vitrines engineered to elevate product presentation into an art form.',
          features: [
            'Micro-adjustable shelving systems for seasonal layout shifts',
            'Integrated micro-LED strip lighting inside joinery',
            'Tactile base materials: travertine, brass, blackened steel, and oak'
          ],
          image: '/assets/craft_shelving.jpg',
          imageAlt: 'Minimalist commercial display shelving showcasing curated artisanal objects with warm integrated lighting'
        },
        {
          id: 'com-boutique',
          title: 'Small Business & Boutique Interiors',
          tag: 'Curated Footprints',
          description: 'High-character interior concepts that extract maximum commercial impact, storage, and visual charm from compact retail footprints.',
          features: [
            'Multi-functional sales counters with built-in wrapping stations',
            'Optical sightline widening techniques and mirror placements',
            'Distinctive architectural storefront framing that attracts foot traffic'
          ],
          image: '/assets/forma_facade.jpg',
          imageAlt: 'Boutique commercial storefront and interior featuring grand archways, natural stone, and warm ambient warmth'
        },
        {
          id: 'com-renovation',
          title: 'Commercial Space Renovation & Redesign',
          tag: 'Property Repurposing',
          description: 'Repurposing dated commercial properties into vibrant, modern destinations with upgraded spatial plans, lighting, and finishes.',
          features: [
            'Assessment of existing building services and MEP infrastructure',
            'Demolition and structural reconfiguration planning',
            'Phased implementation planning to minimize business downtime'
          ],
          image: '/assets/PHOTO.jpg',
          imageAlt: 'Renovated contemporary commercial interior with soaring ceilings, structural brickwork, and minimalist modern furniture'
        }
      ]
    },
    considerationsSection: {
      sectionTag: 'Operational Rigour · Experience Design',
      title: 'Commercial Spaces That Support Customer Experience',
      subtitle: 'Great commercial interiors are designed as high-performing operational machines disguised as effortless aesthetic sanctuaries.',
      intro: 'When developing customer-facing environments, our studio focuses on seven fundamental commercial considerations.',
      items: [
        {
          title: 'Customer Circulation & Navigation',
          subtitle: 'Intuitive Journey',
          description: 'Guiding patrons naturally through your space without dead ends, creating open primary pathways and enticing secondary exploration zones.',
          iconName: 'flow'
        },
        {
          title: 'Product Visibility & Focal Sightlines',
          subtitle: 'Visual Hierarchy',
          description: 'Establishing clear architectural sightlines from entry points toward key merchandise, featured displays, and service points.',
          iconName: 'eye'
        },
        {
          title: 'Lighting & Visual Merchandising',
          subtitle: 'Photometric Atmosphere',
          description: 'Layering general ambient illumination with high-CRI directional accent spots to illuminate products accurately and flatter patrons.',
          iconName: 'sun'
        },
        {
          title: 'Brand Consistency & Material Touchpoints',
          subtitle: 'Sensory Identity',
          description: 'Translating brand guidelines into tangible tactile elements—custom metalwork, stone species, millwork stains, and typography signage.',
          iconName: 'layers'
        },
        {
          title: 'Reception & Waiting Area Layouts',
          subtitle: 'Comfortable Pacing',
          description: 'Designing welcoming, relaxed staging zones where customers can wait comfortably without congesting main circulation corridors.',
          iconName: 'layout'
        },
        {
          title: 'Accessibility & Code Compliance',
          subtitle: 'Universal Design',
          description: 'Ensuring step-free access, generous aisle clearances, ADA-compliant counter heights, and clear emergency egress pathways.',
          iconName: 'box'
        },
        {
          title: 'Commercial Durability & Low Maintenance',
          subtitle: 'High-Traffic Resilience',
          description: 'Specifying commercial-grade surface coatings, scratch-resistant laminates, sealed stone, and easily cleanable upholstery fabrics.',
          iconName: 'shield'
        }
      ]
    },
    processSection: {
      sectionTag: 'Structured Delivery · Commercial Timeline',
      title: 'Our Commercial Interior Design Process',
      subtitle: 'A disciplined architectural workflow designed around your business launch timeline and operational objectives.',
      intro: 'We collaborate closely with stakeholders to ensure design decisions reflect commercial goals and technical feasibility.',
      steps: [
        {
          step: 'Phase 01',
          number: '01',
          title: 'Discovery & Commercial Requirements',
          description: 'Reviewing your brand identity, customer demographic, target merchandising volume, average transaction flow, and operational needs.',
          deliverables: 'Commercial design brief and operational criteria document'
        },
        {
          step: 'Phase 02',
          number: '02',
          title: 'Site Survey & Spatial Zoning',
          description: 'Comprehensive physical measurement of the commercial premises, structural analysis, and preliminary customer zoning diagrams.',
          deliverables: 'As-built site survey and functional spatial zoning plan'
        },
        {
          step: 'Phase 03',
          number: '03',
          title: 'Customer Journey Mapping & Layout Development',
          description: 'Testing multiple circulation layouts, POS counter positions, fixture orientations, and staff service paths for maximum commercial efficiency.',
          deliverables: 'Detailed 2D store layout plans and customer movement flowcharts'
        },
        {
          step: 'Phase 04',
          number: '04',
          title: 'Architectural Concepts & 3D Spatial Visualisation',
          description: 'Developing high-fidelity 3D renderings showcasing storefront branding, display vitrines, lighting moods, and material finishes.',
          deliverables: 'Photorealistic 3D visualization package and physical material sample board'
        },
        {
          step: 'Phase 05',
          number: '05',
          title: 'Technical Specifications & Joinery Details',
          description: 'Detailed architectural drawings for millwork fixtures, display plinths, electrical drops, plumbing tie-ins, and signage specifications.',
          deliverables: 'Complete interior construction set and fixture fabrication drawings'
        },
        {
          step: 'Phase 06',
          number: '06',
          title: 'Implementation Coordination',
          description: 'Reviewing trade shop drawings, approving mock-ups for custom fixtures, and coordinating site reviews with contractors.',
          deliverables: 'Contractor RFI responses and milestone site progress reviews'
        },
        {
          step: 'Phase 07',
          number: '07',
          title: 'Merchandising Walkthrough & Handover',
          description: 'Final lighting angle adjustments, positioning of branding elements, and detailed defect snagging prior to store opening.',
          deliverables: 'Completed venue handover and maintenance manual'
        }
      ]
    },
    stylesOrTypesSection: {
      sectionTag: 'Commercial Typologies · Tailored Requirements',
      title: 'Design by Commercial Property Type',
      subtitle: 'Different business models demand distinct spatial architectures, lighting strategies, and customer engagement rhythms.',
      intro: 'Here is how our studio tailors commercial interior architecture across key industry sectors.',
      items: [
        {
          name: 'Retail Stores & Boutiques',
          category: 'Consumer Goods',
          description: 'Focused on seamless customer journeys, enticing window reveals, comfortable fitting suites, and frictionless point-of-sale interaction.',
          highlights: ['Curated display pacing', 'High-impact entrance staging', 'Integrated inventory storage']
        },
        {
          name: 'Showrooms & Design Centers',
          category: 'High-Value Display',
          description: 'Designed as gallery-like environments where products are celebrated in realistic architectural settings with tailored lighting.',
          highlights: ['Vignette architectural staging', 'Hospitality lounge bars', 'Acoustic comfort for long discussions']
        },
        {
          name: 'Cafés & Dining Pavilions',
          category: 'Hospitality',
          description: 'Balancing table density with dining privacy, kitchen-to-pass ergonomics, acoustic dampening, and evocative ambient warmth.',
          highlights: ['Varied seating typologies', 'Durable commercial surfaces', 'Warm dimmable illumination']
        },
        {
          name: 'Salons & Creative Studios',
          category: 'Client Care & Craft',
          description: 'Prioritising ergonomic technician workflows, flattering shadowless lighting, discreet acoustic separation, and serene aesthetics.',
          highlights: ['High-CRI daylight simulation', 'Concealed utility connections', 'Cleanable, resilient surfaces']
        }
      ]
    },
    whyProfessionalSection: {
      sectionTag: 'Commercial Advantage · Brand Value',
      title: 'Balancing Brand Identity and Functionality',
      subtitle: 'A thoughtfully designed commercial interior is an essential physical touchpoint that builds brand credibility and customer trust.',
      intro: 'Here is how strategic interior planning benefits commercial operations.',
      reasons: [
        {
          title: 'Stronger Customer Engagement & Dwell Time',
          text: 'When a space feels intuitive, beautifully lit, and acoustically comfortable, customers naturally feel relaxed, browse longer, and interact more deeply with your offerings.'
        },
        {
          title: 'Optimised Staff Ergonomics & Service Speed',
          text: 'Positioning POS stations, inventory backrooms, and service paths intelligently reduces wasted staff footsteps, resulting in faster service and smoother daily operations.'
        },
        {
          title: 'Coherent Brand Expression Across Every Detail',
          text: 'From the door pull hardware to the texture of the checkout counter, cohesive architectural elements reinforce your brand’s commitment to quality and professionalism.'
        },
        {
          title: 'Adaptability for Seasonal Changes',
          text: 'Our commercial joinery designs incorporate modular, adjustable display systems, allowing your team to reconfigure promotional zones without requiring new construction.'
        },
        {
          title: 'Long-Term Durability in High-Traffic Environments',
          text: 'We specify materials tested for commercial wear and tear, ensuring your business space maintains its fresh, upscale appearance year after year.'
        }
      ]
    },
    faqsSection: {
      sectionTag: 'Clarity & Guidance · Questions Answered',
      title: 'Frequently Asked Questions',
      subtitle: 'Common questions from businesses regarding commercial interior architecture, schedules, and spatial planning.',
      faqs: [
        {
          question: 'What does commercial interior design include?',
          answer: 'Commercial interior design covers customer circulation planning, visual merchandising and fixture design, storefront architecture, lighting design, material and surface specification, acoustic management, and comprehensive construction drawing sets for fit-out contractors.'
        },
        {
          question: 'Which types of commercial spaces can be designed?',
          answer: 'Our studio designs a wide spectrum of customer-facing commercial environments, including fashion and lifestyle retail stores, high-end product showrooms, culinary venues and cafés, wellness salons, creative studios, and boutique reception lobbies.'
        },
        {
          question: 'How is commercial interior design different from residential design?',
          answer: 'Commercial interiors prioritize customer flow, merchandise visibility, operational efficiency, accessibility compliance, and heavy-duty durability. While residential design centers around personal domestic routines, commercial spaces are designed around customer perception, brand positioning, and business operations.'
        },
        {
          question: 'How should a retail store layout be planned?',
          answer: 'A retail layout should begin with a welcoming decompression zone near the entrance, establish an intuitive loop or primary pathway through key product categories, position high-margin items at optimal eye-level focal points, and locate checkout and change rooms toward the natural culmination of the journey.'
        },
        {
          question: 'What should businesses consider when selecting interior materials?',
          answer: 'Businesses must balance aesthetic warmth with commercial performance: scratch resistance, stain resistance, slip ratings for flooring, ease of sanitisation, and flame-retardant compliance. We guide clients toward natural materials treated for commercial durability.'
        },
        {
          question: 'Can commercial interiors reflect an existing brand identity?',
          answer: 'Yes. We systematically translate existing brand identity manuals—including brand colours, typography, voice, and values—into three-dimensional architectural form, custom finishes, lighting moods, and bespoke joinery.'
        },
        {
          question: 'What information is needed before starting a commercial design project?',
          answer: 'Helpful starting details include your brand guidelines, premises lease plans with boundary dimensions, landlord fit-out handbooks, inventory volume targets, anticipated customer traffic, and target grand opening timeline.'
        },
        {
          question: 'Can an existing commercial space be redesigned?',
          answer: 'Yes. We regularly undertake renovation and redesign projects for occupied or newly leased commercial properties, identifying which existing structural and service elements can be repurposed to optimize fit-out budgets and timelines.'
        }
      ]
    },
    relatedServices: [
      {
        title: 'Residential Interior Design',
        category: 'Private Homes & Villas',
        slug: '/services/residential-interior-design',
        description: 'Explore bespoke residential sanctuaries designed around natural light, honest materials, and everyday living routines.',
        image: '/assets/mitijen/home1.jpeg'
      },
      {
        title: 'Corporate Office Interior Design',
        category: 'Workplaces & Headquarters',
        slug: '/services/corporate-interior-design',
        description: 'Discover modern workplace interiors engineered for collaboration, acoustic clarity, and organizational identity.',
        image: '/assets/I2.jpg'
      }
    ],
    finalCta: {
      sectionTag: 'Commercial Collaboration · Consultation',
      headline: 'Planning a Better Business Space?',
      supportingText: 'Whether launching a flagship retail store, opening a boutique dining pavilion, or refreshing an established commercial property, let us create a space that captivates your clientele.',
      buttonText: 'Schedule a Commercial Consultation'
    }
  },

  'corporate-interior-design': {
    slug: 'corporate-interior-design',
    category: 'Corporate',
    seo: {
      title: 'Corporate Office Interior Design Services | Workspaces | Mitjen Interiors',
      description: 'Explore corporate office interior design solutions for reception areas, meeting rooms, collaborative workspaces and executive offices, planned around workplace functionality and brand identity.',
      canonical: '/services/corporate-interior-design',
      h1: 'Corporate Office Interior Design for Modern Workplaces',
      keywords: [
        'corporate interior design',
        'corporate office interior design',
        'office interior designers',
        'corporate office interiors',
        'modern office interior design',
        'office space planning',
        'workplace interior design',
        'reception area design',
        'conference room interior design',
        'executive office design',
        'collaborative workspace design'
      ],
      ogImage: '/assets/I2.jpg'
    },
    hero: {
      headline: 'Corporate Office Interiors Built Around the Way Teams Work',
      supportingText: 'Explore professional workspace design concepts that balance functionality, comfort, collaboration and corporate identity. We engineer modern office environments that foster deep focus, inspire collective creativity, and reflect organizational values.',
      bgImage: '/assets/I2.jpg',
      primaryCtaText: 'Explore Corporate Services',
      secondaryCtaText: 'Schedule a Consultation'
    },
    overview: {
      sectionTag: 'Workplace Strategy · Modern Office Architecture',
      title: 'Cultivating Productivity, Culture & Well-Being at Work',
      leadParagraph: 'The contemporary corporate workplace is no longer simply a grid of desks; it is a strategic hub designed to attract talent, spark innovation, support deep focus, and reinforce organizational purpose.',
      bodyParagraphs: [
        'As workplace models evolve toward hybrid collaboration and agile teamwork, office interiors must provide a diverse ecosystem of spaces: from acoustically sealed focus booths and video conferencing pods to dynamic brainstorming lounges and executive boardrooms. Every zone requires tailored acoustic attenuation, glare-free lighting, and ergonomic support.',
        'Our corporate interior design practice combines thoughtful workplace strategy with refined architectural materiality. We replace sterile cubicles with warm timber joinery, quiet acoustic fabrics, abundant biophilic greenery, and intuitive circulation, creating offices where teams thrive and clients feel immediate confidence.'
      ],
      keyStats: [
        { value: 'Agile', label: 'Adaptive Spatial Zoning' },
        { value: 'Acoustic', label: 'Engineered Noise Control' },
        { value: 'Human', label: 'Ergonomic Well-Being' }
      ]
    },
    servicesSection: {
      sectionTag: 'Workplace Typologies · Corporate Portfolio',
      title: 'Our Corporate Interior Design Services',
      subtitle: 'End-to-end interior design solutions tailored for headquarters, executive suites, and collaborative team floors.',
      cards: [
        {
          id: 'corp-workspaces',
          title: 'Corporate Office Interior Design',
          tag: 'Full Workplace Solutions',
          description: 'Comprehensive workplace spatial planning and interior architecture for entire office floors and multi-storey corporate buildings.',
          features: [
            'Dynamic zoning separating high-energy collaboration from quiet focus',
            'Integrated structural cabling, power management, and HVAC coordination',
            'Unified architectural design language reflecting corporate identity'
          ],
          image: '/assets/I2.jpg',
          imageAlt: 'Contemporary corporate headquarters interior with sculptural staircase, open workspaces, and natural timber details'
        },
        {
          id: 'corp-reception',
          title: 'Office Reception & Waiting Areas',
          tag: 'Executive Arrivals',
          description: 'Distinguished arrival lobbies that make an authoritative, sophisticated first impression on visiting clients, partners, and candidates.',
          features: [
            'Monolithic reception counters in honed marble or warm oak',
            'Discrete security turnstile and access control integration',
            'Executive guest lounge seating with integrated charging connectivity'
          ],
          image: '/assets/craft_stone_vanity.jpg',
          imageAlt: 'Sophisticated corporate reception foyer with natural stone desk, architectural wall fins, and ambient lighting'
        },
        {
          id: 'corp-executive',
          title: 'Executive Office Design',
          tag: 'Leadership Sanctuaries',
          description: 'Refined private executive offices combining commanding desks, informal conversation lounges, and acoustic confidentiality.',
          features: [
            'Bespoke executive desks with concealed cable management',
            'Acoustically insulated walls and double-glazed private partitions',
            'Curated art display niches, personal book collections, and credenzas'
          ],
          image: '/assets/transformations/bedroom_after.jpg',
          imageAlt: 'Executive private office suite featuring bespoke wooden joinery, private lounge chairs, and warm architectural lighting'
        },
        {
          id: 'corp-conference',
          title: 'Conference & Meeting Rooms',
          tag: 'Collaborative Decision Rooms',
          description: 'State-of-the-art boardroom and meeting facilities designed for productive decision-making and seamless hybrid video conferencing.',
          features: [
            'Integrated boardroom tables with pop-up power and AV interfaces',
            'Acoustic wall paneling and micro-perforated ceiling baffles',
            'Camera-flattering lighting and optimal digital screen sightlines'
          ],
          image: '/assets/I3.jpg',
          imageAlt: 'Modern corporate conference room featuring integrated boardroom table, acoustic treatments, and digital display wall'
        },
        {
          id: 'corp-open-plan',
          title: 'Open-Plan Workspaces',
          tag: 'Team Density & Flow',
          description: 'Balanced open office floors that facilitate effortless team communication while preventing acoustic distraction and visual chaos.',
          features: [
            'Ergonomic height-adjustable desking with fabric modesty screens',
            'Sound-absorbing felt dividers and carpet tile zoning',
            'Indirect, low-glare LED illumination reducing digital screen eye strain'
          ],
          image: '/assets/mitijen/deco3.jpeg',
          imageAlt: 'Open-plan office interior with natural daylight, ergonomic workstations, and integrated acoustic ceiling treatments'
        },
        {
          id: 'corp-collaborative',
          title: 'Collaborative Work Areas',
          tag: 'Agile Ideation Zones',
          description: 'Informal breakout spaces, huddle booths, and mobile whiteboard areas designed for impromptu discussions and creative workshops.',
          features: [
            'Modular, easily reconfigurable soft seating and café-height tables',
            'Writable glass surfaces and mobile pin-boards',
            'Semi-enclosed acoustic booths for quick 3–4 person syncs'
          ],
          image: '/assets/mitijen/deco2.jpeg',
          imageAlt: 'Agile team collaboration zone with comfortable modular seating, warm wood finishes, and informal workshop tables'
        },
        {
          id: 'corp-focus',
          title: 'Private Cabins & Focus Rooms',
          tag: 'Deep Work & Calls',
          description: 'Compact acoustic phone booths and single-person focus rooms where team members can take confidential calls or dive into deep work.',
          features: [
            'High-STC acoustic door seals and sound-absorbing wall linings',
            'Independent silent ventilation and sensor-activated lighting',
            'Compact ergonomic worksurfaces and task lighting'
          ],
          image: '/assets/mitijen/dressingtable.jpeg',
          imageAlt: 'Private acoustic focus room and video call booth with warm timber paneling and integrated task light'
        },
        {
          id: 'corp-pantry',
          title: 'Employee Breakout & Pantry Areas',
          tag: 'Community Hubs',
          description: 'Inviting office café and town hall breakout spaces that encourage spontaneous cross-department socialisation and relaxation.',
          features: [
            'Full kitchen amenities, coffee bar islands, and recycling stations',
            'Dining tables, high counters, and comfortable lounge banquettes',
            'Spillover capacity for all-hands meetings and company celebrations'
          ],
          image: '/assets/mitijen/deco-kitchen.jpeg',
          imageAlt: 'Contemporary office pantry and breakout lounge with stone kitchen island, café seating, and greenery'
        }
      ]
    },
    considerationsSection: {
      sectionTag: 'Ergonomic Architecture · Workplace Principles',
      title: 'Planning a Functional Workplace',
      subtitle: 'A high-performance workplace must support diverse cognitive working modes throughout the business day.',
      intro: 'When planning corporate facilities, our studio addresses eight core architectural and operational considerations.',
      items: [
        {
          title: 'Space Allocation & Circulation',
          subtitle: 'Zoned Efficiency',
          description: 'Balancing primary workstation density with spacious movement corridors, eliminating bottlenecks around elevators and tea points.',
          iconName: 'flow'
        },
        {
          title: 'Workstations & Collaborative Balance',
          subtitle: 'Agile Ratios',
          description: 'Establishing the ideal ratio between dedicated focus desks, hybrid hot-desks, and shared collaborative breakout zones.',
          iconName: 'layout'
        },
        {
          title: 'Meeting & Confidential Discussion Rooms',
          subtitle: 'Private Enclosures',
          description: 'Providing right-sized meeting rooms—from 2-person 1-on-1 pods to 20-person boardrooms—so spaces are never wastefully under-occupied.',
          iconName: 'box'
        },
        {
          title: 'Lighting & Visual Comfort',
          subtitle: 'Circadian Balance',
          description: 'Balancing abundant natural perimeter daylight with low-glare, high-efficiency 4000K architectural LED task lighting.',
          iconName: 'sun'
        },
        {
          title: 'Acoustic Engineering & Speech Privacy',
          subtitle: 'Decibel Management',
          description: 'Deploying high-NRC acoustic wall absorbers, carpet underlays, and sound masking systems to protect focus and meeting privacy.',
          iconName: 'layers'
        },
        {
          title: 'Ergonomic Furniture Planning',
          subtitle: 'Physical Well-Being',
          description: 'Selecting BIFMA-certified ergonomic seating, sit-stand desks, and monitor arms to promote healthy posture and reduce fatigue.',
          iconName: 'heart'
        },
        {
          title: 'Storage & Paperless Organisation',
          subtitle: 'Decluttered Efficiency',
          description: 'Integrating central lockable credenzas, individual digital lockers, and concealed printer stations to keep desk rows pristine.',
          iconName: 'shield'
        },
        {
          title: 'Brand Identity & Visual Culture',
          subtitle: 'Organizational Pride',
          description: 'Reflecting company heritage, mission, and culture through architectural materiality, reception focal walls, and curated environmental graphics.',
          iconName: 'palette'
        }
      ]
    },
    processSection: {
      sectionTag: 'Methodical Execution · Corporate Governance',
      title: 'Our Corporate Design Process',
      subtitle: 'A transparent, milestone-driven framework that aligns senior leadership, facility managers, and IT teams.',
      intro: 'We coordinate every phase to ensure architectural excellence and adherence to corporate timelines.',
      steps: [
        {
          step: 'Phase 01',
          number: '01',
          title: 'Workplace Needs Assessment',
          description: 'Engaging department heads to evaluate headcount projections, hybrid attendance patterns, meeting frequencies, and technology requirements.',
          deliverables: 'Workplace strategy brief and departmental headcount matrix'
        },
        {
          step: 'Phase 02',
          number: '02',
          title: 'Site Survey & Spatial Density Zoning',
          description: 'Assessing building core infrastructure, emergency exits, floor loading capacities, and natural light penetration across the floorplate.',
          deliverables: 'Block layout plans and preliminary capacity analyses'
        },
        {
          step: 'Phase 03',
          number: '03',
          title: 'Space Planning & Circulation Schematics',
          description: 'Developing detailed furniture layout schematics that balance open desking, private offices, collaboration zones, and support rooms.',
          deliverables: 'Approved 2D space plans with dimensioned clearances'
        },
        {
          step: 'Phase 04',
          number: '04',
          title: 'Architectural Concepts & 3D Visualisations',
          description: 'Presenting realistic 3D renderings of the reception lobby, boardroom, executive suites, and typical open work areas for stakeholder sign-off.',
          deliverables: 'Executive 3D presentation deck and physical finishes palette'
        },
        {
          step: 'Phase 05',
          number: '05',
          title: 'Technical Drawings & Finishes Schedules',
          description: 'Producing detailed construction packages for partitions, acoustic ceilings, power and data floor boxes, custom joinery, and lighting.',
          deliverables: 'Complete MEP-coordinated interior drawing set and bill of quantities'
        },
        {
          step: 'Phase 06',
          number: '06',
          title: 'Implementation Coordination',
          description: 'Reviewing trade contractor submittals, testing custom joinery mock-ups, and conducting structured site progress inspections.',
          deliverables: 'Technical review logs and site inspection reports'
        },
        {
          step: 'Phase 07',
          number: '07',
          title: 'Final Commissioning & Workplace Handover',
          description: 'Final snagging audit, acoustic testing review, loose furniture arrangement, and handover to your facilities management team.',
          deliverables: 'Completed office handover and operational care guide'
        }
      ]
    },
    stylesOrTypesSection: {
      sectionTag: 'Organizational Scale · Tailored Workplaces',
      title: 'Corporate Interior Design for Different Organisations',
      subtitle: 'Every business has a unique organizational culture and operational tempo that dictates its optimal workspace layout.',
      intro: 'Here is how our studio adapts corporate interior architecture to distinct organizational typologies.',
      items: [
        {
          name: 'Agile Tech & Emerging Ventures',
          category: 'High-Pace Innovation',
          description: 'Focused on extreme flexibility, multi-purpose town hall spaces, mobile whiteboard hubs, and casual huddle lounges that fuel creativity.',
          highlights: ['Plug-and-play workstations', 'All-hands event spaces', 'Casual café atmospheres']
        },
        {
          name: 'Growing Mid-Sized Enterprises',
          category: 'Scale & Structure',
          description: 'Designed to accommodate rapid team expansion, structured department clustering, enhanced client meeting suites, and brand stability.',
          highlights: ['Scalable desk cluster layouts', 'Client-facing presentation suites', 'Dedicated departmental zones']
        },
        {
          name: 'Corporate Headquarters',
          category: 'Institutional Excellence',
          description: 'Distinguished architectural presence featuring grand executive boardrooms, VIP guest suites, high-level acoustic privacy, and enduring materials.',
          highlights: ['Monumental reception foyer', 'Secure executive suites', 'Engineered acoustic integrity']
        },
        {
          name: 'Professional Practices & Consultancies',
          category: 'Confidentiality & Focus',
          description: 'Tailored for legal, financial, and management consultancies where confidential client discussions and individual deep focus are paramount.',
          highlights: ['Private acoustic partner offices', 'Client hospitality boardrooms', 'Quiet reference libraries']
        }
      ]
    },
    whyProfessionalSection: {
      sectionTag: 'Workplace Value · Strategic Return',
      title: 'Corporate Identity Meets Workplace Function',
      subtitle: 'A strategically planned workplace is a powerful business asset that supports recruitment, brand trust, and daily operational excellence.',
      intro: 'Here is how professional corporate interior design supports long-term organizational success.',
      reasons: [
        {
          title: 'Attracting & Retaining Top Talent',
          text: 'In today’s competitive talent landscape, a light-filled, beautifully appointed office with ergonomic furniture and comfortable breakout lounges demonstrates genuine care for employee well-being.'
        },
        {
          title: 'Elevating Client Confidence from the First Visit',
          text: 'When clients visit your offices, the reception area, boardroom technology, and overall architectural finish immediately communicate corporate stability and high professional standards.'
        },
        {
          title: 'Optimising Real Estate Footprint & Operating Costs',
          text: 'Smart space planning ensures every square foot earns its place. By eliminating oversized underutilised rooms and introducing agile hot-desking, businesses can optimize overall leased area.'
        },
        {
          title: 'Fostering Cross-Departmental Innovation',
          text: 'Placing social hubs, coffee stations, and open collaborative zones in central circulation arteries encourages spontaneous interactions between teams that rarely interact otherwise.'
        },
        {
          title: 'Future-Proofing for Technological Evolution',
          text: 'Our technical plans incorporate flexible cable management pathways, modular AV integration, and adaptable partition systems that can adjust as workplace technology evolves.'
        }
      ]
    },
    faqsSection: {
      sectionTag: 'Clarity & Guidance · Questions Answered',
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to key questions from corporate leaders and workplace directors regarding office interior architecture.',
      faqs: [
        {
          question: 'What does corporate office interior design include?',
          answer: 'Corporate office interior design covers workplace strategy and headcount planning, departmental zoning, 2D and 3D architectural layout design, ceiling and lighting schematics, power and data coordination, acoustic treatment specifications, custom reception and executive joinery, and selection of commercial-grade ergonomic furniture.'
        },
        {
          question: 'How is corporate interior design different from commercial interior design?',
          answer: 'While commercial interior design focuses on customer foot-traffic, retail merchandising, and public-facing brand experiences, corporate interior design is focused on internal workplace dynamics: employee productivity, team collaboration, acoustic confidentiality, ergonomic health, and administrative workflows.'
        },
        {
          question: 'What spaces are included in an office interior project?',
          answer: 'A comprehensive corporate project typically encompasses the reception foyer, open desking floors, private executive cabins, conference and meeting rooms, huddle zones, acoustic phone pods, collaborative lounges, the employee pantry and dining area, server/IT rooms, and wellness rooms.'
        },
        {
          question: 'How should an office layout support collaboration?',
          answer: 'An effective office layout supports collaboration by introducing varied spaces tailored to different interaction types: quick huddle booths near desking zones for spontaneous syncs, comfortable lounge areas for informal brainstorming, and acoustically isolated meeting rooms for structured workshops with AV screens.'
        },
        {
          question: 'What should be considered when designing a reception area?',
          answer: 'A corporate reception must balance a memorable architectural first impression with practical security and operations. Key considerations include a prominent sculpted desk, concealed staff computers, clear visitor badge staging, comfortable waiting seating with device charging, and subtle branded architectural wall treatments.'
        },
        {
          question: 'Can office interiors reflect a company’s brand identity?',
          answer: 'Yes. Beyond displaying logos, office interiors reflect brand character through material choices (such as warm timber for approachable firms or polished stone and steel for tech-forward enterprises), environmental graphics, architectural colour accents, and spatial layout style.'
        },
        {
          question: 'What information is required for a corporate interior design consultation?',
          answer: 'Essential initial details include your current and projected headcount, lease plans with architectural column grids, required room ratios (meeting rooms, private cabins vs. open desks), technological requirements for video conferencing, and target move-in milestones.'
        },
        {
          question: 'Can existing office interiors be redesigned?',
          answer: 'Yes. We regularly redesign and modernize occupied or existing leased corporate spaces, developing phased implementation strategies that upgrade workstations, acoustic ceilings, lighting, and reception areas with minimal disruption to ongoing business operations.'
        }
      ]
    },
    relatedServices: [
      {
        title: 'Residential Interior Design',
        category: 'Private Residences & Villas',
        slug: '/services/residential-interior-design',
        description: 'Explore bespoke residential sanctuaries designed around natural light, honest materials, and everyday living routines.',
        image: '/assets/mitijen/home1.jpeg'
      },
      {
        title: 'Commercial Interior Design',
        category: 'Retail & Hospitality Venues',
        slug: '/services/commercial-interior-design',
        description: 'Discover customer-focused retail stores, boutique hospitality venues, and showrooms designed for memorable brand experiences.',
        image: '/assets/CS.jpg'
      }
    ],
    finalCta: {
      sectionTag: 'Workplace Consultation · Strategy',
      headline: 'Create a Workspace That Reflects Your Organisation',
      supportingText: 'Whether planning a full headquarters relocation, expanding to a new floorplate, or reimagining your team’s daily collaborative environment, our studio delivers intelligent, refined workplace architecture.',
      buttonText: 'Schedule a Corporate Consultation'
    }
  }
};
