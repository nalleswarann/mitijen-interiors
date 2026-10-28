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
    id: 'credenza',
    title: 'Living Kitchen Transformation',
    room: 'Living & Kitchen',
    beforeImage: '/assets/mitijen/BF&AF/KitchenBF.jpeg',
    afterImage: '/assets/mitijen/BF&AF/KitchenAF.jpeg',
    thumbnail: '/assets/mitijen/BF&AF/KitchenAF.jpeg',
    beforeAlt: 'Raw interior under construction with exposed electrical wiring and bare timber framework',
    afterAlt: 'Transformed contemporary living room with bespoke walnut credenza, Japanese shoji partition, and warm cove wash lighting'
  },
  {
    id: 'wardrobe',
    title: 'Architectural Master Wardrobe',
    room: 'Master Suite',
    beforeImage: '/assets/mitijen/BF&AF/BFCupboard.jpeg',
    afterImage: '/assets/mitijen/BF&AF/AFCupboard.jpeg',
    thumbnail: '/assets/mitijen/BF&AF/BFCupboard.jpeg',
    beforeAlt: 'Unfinished wooden wardrobe shelving skeleton with bare drywall and construction materials',
    afterAlt: 'Completed luxury master wardrobe suite with curved architectural cabinetry and warm integrated illumination'
  },
  {
    id: 'vanity',
    title: 'Stone & Timber Vanity Sanctuary',
    room: 'Primary Bath',
    beforeImage: '/assets/mitijen/BF&AF/Wood.jpeg',
    afterImage: '/assets/mitijen/BF&AF/AFWood.jpeg',
    thumbnail: '/assets/mitijen/BF&AF/AFWood.jpeg',
    beforeAlt: 'Italian marble bathroom vanity under installation with plumbing cutouts and bare walls',
    afterAlt: 'Finished monolithic marble vanity with organic backlit mirror, stone vessel sink, and freestanding bath'
  },
  {
    id: 'kitchen',
    title: 'Culinary Pavilion & Island Kitchen',
    room: 'Kitchen & Dining',
    beforeImage: '/assets/transformations/kitchen_before.jpg',
    afterImage: '/assets/transformations/kitchen_after.jpg',
    thumbnail: '/assets/transformations/kitchen_thumb.jpg',
    beforeAlt: 'Kitchen space under renovation with dangling electrical cables from ceiling and uninstalled fixtures',
    afterAlt: 'Transformed boutique culinary pavilion with monolithic stone island, fluted detailing, and warm recessed lighting'
  },
  {
    id: 'lounge',
    title: 'Sunlit Living Lounge & Gallery',
    room: 'Main Residence',
    beforeImage: '/assets/transformations/lounge_before.jpg',
    afterImage: '/assets/transformations/lounge_after.jpg',
    thumbnail: '/assets/transformations/lounge_thumb.jpg',
    beforeAlt: 'Entrance and hallway during construction with raw portal framing and paint buckets on floor',
    afterAlt: 'Completed sunlit contemporary living space featuring floor-to-ceiling windows, natural oak, and curated furnishings'
  },
  {
    id: 'bedroom',
    title: 'Executive Bedroom Joinery',
    room: 'Private Chamber',
    beforeImage: '/assets/transformations/bedroom_before.jpg',
    afterImage: '/assets/transformations/bedroom_after.jpg',
    thumbnail: '/assets/transformations/bedroom_thumb.jpg',
    beforeAlt: 'Unfinished bedroom wall paneling with exposed electrical wiring overhead and construction tools',
    afterAlt: 'Sculptural architectural suite with refined timber craftsmanship and soft natural light'
  }
];
