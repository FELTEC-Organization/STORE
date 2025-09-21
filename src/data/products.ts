export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Cadeiras' | 'Mesas' | 'Sofás' | 'Decoração' | 'Eletrônicos';
  tags: string[];
  inStock: boolean;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Produto Lorem A',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
    price: 499.90,
    category: 'Cadeiras',
    tags: ['lorem', 'ipsum', 'dolor'],
    inStock: true,
    image: 'https://picsum.photos/seed/product1/800/600'
  },
  {
    id: 'p2',
    name: 'Produto Ipsum B',
    description: 'Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.',
    price: 699.00,
    category: 'Mesas',
    tags: ['consectetur', 'adipiscing', 'elit'],
    inStock: true,
    image: 'https://picsum.photos/seed/product2/800/600'
  },
  {
    id: 'p3',
    name: 'Produto Dolor C',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
    price: 2599.00,
    category: 'Sofás',
    tags: ['tempor', 'incididunt', 'labore'],
    inStock: false,
    image: 'https://picsum.photos/seed/product3/800/600'
  },
  {
    id: 'p4',
    name: 'Produto Magna D',
    description: 'Ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.',
    price: 149.90,
    category: 'Decoração',
    tags: ['magna', 'aliqua', 'enim'],
    inStock: true,
    image: 'https://picsum.photos/seed/product4/800/600'
  },
  {
    id: 'p5',
    name: 'Produto Veniam E',
    description: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi.',
    price: 229.00,
    category: 'Eletrônicos',
    tags: ['veniam', 'nostrud', 'exercitation'],
    inStock: true,
    image: 'https://picsum.photos/seed/product5/800/600'
  },
  {
    id: 'p6',
    name: 'Produto Nostrud F',
    description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    price: 1299.00,
    category: 'Cadeiras',
    tags: ['ullamco', 'laboris', 'aliquip'],
    inStock: true,
    image: 'https://picsum.photos/seed/product6/800/600'
  },
  {
    id: 'p7',
    name: 'Produto Laboris G',
    description: 'Ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.',
    price: 1899.00,
    category: 'Mesas',
    tags: ['commodo', 'consequat', 'duis'],
    inStock: true,
    image: 'https://picsum.photos/seed/product7/800/600'
  },
  {
    id: 'p8',
    name: 'Produto Commodo H',
    description: 'Ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate.',
    price: 3299.00,
    category: 'Sofás',
    tags: ['aute', 'irure', 'reprehenderit'],
    inStock: true,
    image: 'https://picsum.photos/seed/product8/800/600'
  },
  {
    id: 'p9',
    name: 'Produto Irure I',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    price: 899.00,
    category: 'Decoração',
    tags: ['dolor', 'voluptate', 'cillum'],
    inStock: false,
    image: 'https://picsum.photos/seed/product9/800/600'
  },
  {
    id: 'p10',
    name: 'Produto Voluptate J',
    description: 'In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
    price: 2799.00,
    category: 'Eletrônicos',
    tags: ['velit', 'esse', 'fugiat'],
    inStock: true,
    image: 'https://picsum.photos/seed/product10/800/600'
  },
  {
    id: 'p11',
    name: 'Produto Esse K',
    description: 'Velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.',
    price: 1599.00,
    category: 'Cadeiras',
    tags: ['cillum', 'pariatur', 'excepteur'],
    inStock: true,
    image: 'https://picsum.photos/seed/product11/800/600'
  },
  {
    id: 'p12',
    name: 'Produto Fugiat L',
    description: 'Eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.',
    price: 799.00,
    category: 'Mesas',
    tags: ['pariatur', 'cupidatat', 'proident'],
    inStock: true,
    image: 'https://picsum.photos/seed/product12/800/600'
  }
];

export const CATEGORIES = ['Cadeiras', 'Mesas', 'Sofás', 'Decoração', 'Eletrônicos'] as const;