export interface TransformationItem {
  id: string;
  title: string;
  room: string;
  beforeImage: string;
  afterImage: string;
  thumbnail: string;
  beforeAlt: string;
  afterAlt: string;
}

export const TRANSFORMATION_ITEMS: TransformationItem[] = [
  {
    id: 'living-room',
    title: 'Elegant spaces made for everyday living.',
    room: 'Living Room',
    beforeImage: '/assets/mitijen/BF&AF/KitchenBF.jpeg',
    afterImage: '/assets/mitijen/BF&AF/KitchenAF.jpeg',
    thumbnail: '/assets/mitijen/BF&AF/KitchenAF.jpeg',
    beforeAlt: 'Living room interior during renovation and structural planning',
    afterAlt: 'Elegant living room made for everyday living with bespoke joinery and warm lighting'
  },
  {
    id: 'modular-kitchen',
    title: 'Smart layouts with a refined finish.',
    room: 'Modular Kitchen',
    beforeImage: '/assets/mitijen/BF&AF/BFCupboard.jpeg',
    afterImage: '/assets/mitijen/BF&AF/AFCupboard.jpeg',
    thumbnail: '/assets/mitijen/BF&AF/BFCupboard.jpeg',
    beforeAlt: 'Kitchen and cabinetry space under initial installation',
    afterAlt: 'Modular kitchen with smart layouts and a refined architectural finish'
  },
  {
    id: 'retail-showroom',
    title: 'Interiors designed to strengthen the customer experience.',
    room: 'Retail Showroom',
    beforeImage: '/assets/mitijen/BF&AF/Wood.jpeg',
    afterImage: '/assets/mitijen/BF&AF/AFWood.jpeg',
    thumbnail: '/assets/mitijen/BF&AF/AFWood.jpeg',
    beforeAlt: 'Commercial retail venue space during rough-in build',
    afterAlt: 'Retail showroom designed to strengthen the customer experience'
  },
  {
    id: 'restaurant-cafe',
    title: 'Inviting spaces designed around the brand.',
    room: 'Restaurant & Cafe',
    beforeImage: '/assets/transformations/kitchen_before.jpg',
    afterImage: '/assets/transformations/kitchen_after.jpg',
    thumbnail: '/assets/transformations/kitchen_thumb.jpg',
    beforeAlt: 'Dining hospitality space during structural refurbishment',
    afterAlt: 'Inviting restaurant and cafe spaces designed around the brand'
  },
  {
    id: 'reception-lounge',
    title: 'An impressive welcome that reflects your brand.',
    room: 'Reception & Lounge',
    beforeImage: '/assets/transformations/lounge_before.jpg',
    afterImage: '/assets/transformations/lounge_after.jpg',
    thumbnail: '/assets/transformations/lounge_thumb.jpg',
    beforeAlt: 'Reception foyer during framework and services rough-in',
    afterAlt: 'Reception and lounge with an impressive welcome reflecting the brand'
  },
  {
    id: 'office-workspace',
    title: 'Professional interiors built around the way your team works.',
    room: 'Office Workspace',
    beforeImage: '/assets/transformations/bedroom_before.jpg',
    afterImage: '/assets/transformations/bedroom_after.jpg',
    thumbnail: '/assets/transformations/bedroom_thumb.jpg',
    beforeAlt: 'Office floor under structural execution and cabling',
    afterAlt: 'Professional office workspace built around the way your team works'
  }
];
