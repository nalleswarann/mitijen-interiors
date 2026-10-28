export interface ImageData {
  img: string;
  p: [string, string, string, string]; // [wall, light, floor, accent]
}

export const IMG_CONFIG: Record<string, ImageData> = {
  hero: { img: '/assets/mitijen/Banner1.jpg', p: ['#cdbfae', '#fff3dc', '#8b6b4c', '#777B61'] },
  stair: { img: '/assets/mitijen/hom2.jpeg', p: ['#e3d9ca', '#fff', '#b79d80', '#493B30'] },
  lounge: { img: '/assets/mitijen/home1.jpeg', p: ['#d8c8b4', '#fff1d6', '#7d6249', '#777B61'] },
  dusk: { img: '/assets/mitijen/hom2.jpeg', p: ['#493B30', '#f2b977', '#241f1b', '#D8C8B4'] },
  qr: { img: '/assets/mitijen/home1.jpeg', p: ['#e6dccb', '#fff5e2', '#a98a68', '#D8C8B4'] },
  oh: { img: '/assets/mitijen/hom2.jpeg', p: ['#777B61', '#f3ecd8', '#5c4a39', '#D8C8B4'] },
  sa: { img: '/assets/mitijen/home3.jpeg', p: ['#e9e6e0', '#ffffff', '#9a9288', '#5b5d52'] },
  dine: { img: '/assets/mitijen/kitchen.jpeg', p: ['#d6c6b0', '#fdf0d8', '#6d5339', '#493B30'] },
  bed: { img: '/assets/mitijen/bedroom.jpeg', p: ['#cfc6b8', '#f7ecda', '#8c7a66', '#777B61'] },
  dressing: { img: '/assets/mitijen/dressing-cupboard.jpeg', p: ['#d9cbb6', '#efe4d2', '#b8a88f', '#8d7d66'] },
  stone: { img: '/assets/mitijen/warm4.jpeg', p: ['#d9cbb6', '#efe4d2', '#b8a88f', '#8d7d66'] },
  hp: { img: '/assets/mitijen/warm4.jpeg', p: ['#d9cbb6', '#efe4d2', '#b8a88f', '#8d7d66'] },
  residential: { img: '/assets/mitijen/home1.jpeg', p: ['#e6dccb', '#fff5e2', '#a98a68', '#D8C8B4'] },
  commercial: { img: '/assets/mitijen/commercial1.jpeg', p: ['#d9cbb6', '#efe4d2', '#b8a88f', '#8d7d66'] },
  corporates: { img: '/assets/mitijen/commercial4.jpeg', p: ['#777B61', '#f3ecd8', '#5c4a39', '#D8C8B4'] },
  mitigen1: { img: '/assets/mitijen/mitigen1.jpeg', p: ['#d9cbb6', '#efe4d2', '#b8a88f', '#8d7d66'] },
  mitigen2: { img: '/assets/mitijen/mitigen2.jpeg', p: ['#e6dccb', '#fff5e2', '#a98a68', '#D8C8B4'] },
  mitigen3: { img: '/assets/mitijen/mitigen3.jpeg', p: ['#777B61', '#f3ecd8', '#5c4a39', '#D8C8B4'] },
  mitigen4: { img: '/assets/mitijen/mitigen4.jpeg', p: ['#d8c8b4', '#fff1d6', '#7d6249', '#777B61'] },
  mitigen5: { img: '/assets/mitijen/mitigen5.jpeg', p: ['#e9e6e0', '#ffffff', '#9a9288', '#5b5d52'] },
  mitigen6: { img: '/assets/mitijen/mitigen6.jpeg', p: ['#d6c6b0', '#fdf0d8', '#6d5339', '#493B30'] },
  mitigen7: { img: '/assets/mitijen/mitigen7.jpeg', p: ['#cfc6b8', '#f7ecda', '#8c7a66', '#777B61'] },
  mitigen8: { img: '/assets/mitijen/mitigen8.jpeg', p: ['#b58a5b', '#d7aa77', '#8a6340', '#5d4129'] },
  mitigen9: { img: '/assets/mitijen/mitigen9.jpeg', p: ['#e4dccd', '#f4efe4', '#cfc3ae', '#b9ad97'] },
  mitigen10: { img: '/assets/mitijen/mitigen10.jpeg', p: ['#a9a59d', '#d9d5cc', '#7f7b74', '#5d5a54'] },
  mitigen11: { img: '/assets/mitijen/mitigen11.jpeg', p: ['#d3c6b6', '#e8ddcf', '#bfae9a', '#a89783'] },
  mitigen12: { img: '/assets/mitijen/mitigen12.jpeg', p: ['#d9cbb6', '#efe4d2', '#b8a88f', '#8d7d66'] },
  mitigen13: { img: '/assets/mitijen/mitigen13.jpeg', p: ['#e6dccb', '#fff5e2', '#a98a68', '#D8C8B4'] },
  mitigen14: { img: '/assets/mitijen/mitigen14.jpeg', p: ['#777B61', '#f3ecd8', '#5c4a39', '#D8C8B4'] },
  oak: { img: '/assets/mitijen/mitigen8.jpeg', p: ['#b58a5b', '#d7aa77', '#8a6340', '#5d4129'] },
  linen: { img: '/assets/mitijen/bedroom.jpeg', p: ['#e4dccd', '#f4efe4', '#cfc3ae', '#b9ad97'] },
  metal: { img: '/assets/mitijen/commercial8.jpeg', p: ['#a9a59d', '#d9d5cc', '#7f7b74', '#5d5a54'] },
  plaster: { img: '/assets/mitijen/deco2.jpeg', p: ['#d3c6b6', '#e8ddcf', '#bfae9a', '#a89783'] }
};
