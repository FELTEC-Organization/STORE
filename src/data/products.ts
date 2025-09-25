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
    name: 'Cadeira Ergonômica OfficePro',
    description: 'Conforto e design moderno com regulagem de altura e apoio lombar para longas horas de trabalho.',
    price: 899.90,
    category: 'Cadeiras',
    tags: ['ergonômica', 'escritório', 'conforto'],
    inStock: true,
    image: 'https://picsum.photos/seed/chair1/800/600'
  },
  {
    id: 'p2',
    name: 'Mesa de Jantar Viena',
    description: 'Mesa em madeira maciça com acabamento premium, ideal para até 6 pessoas.',
    price: 1599.00,
    category: 'Mesas',
    tags: ['madeira', 'sala de jantar', 'premium'],
    inStock: true,
    image: 'https://picsum.photos/seed/table1/800/600'
  },
  {
    id: 'p3',
    name: 'Sofá Retrátil Confort 3 Lugares',
    description: 'Estofado reclinável e retrátil em tecido suede, perfeito para salas modernas.',
    price: 2899.00,
    category: 'Sofás',
    tags: ['retrátil', 'reclinável', 'conforto'],
    inStock: true,
    image: 'https://picsum.photos/seed/sofa1/800/600'
  },
  {
    id: 'p4',
    name: 'Kit Quadros Decorativos Abstratos',
    description: 'Conjunto de 3 quadros com moldura de madeira, estilo minimalista para sala ou escritório.',
    price: 249.90,
    category: 'Decoração',
    tags: ['quadros', 'minimalista', 'arte'],
    inStock: true,
    image: 'https://picsum.photos/seed/decor1/800/600'
  },
  {
    id: 'p5',
    name: 'Fone Bluetooth Noise Cancel Pro',
    description: 'Som imersivo com cancelamento de ruído ativo e bateria de até 30h.',
    price: 749.00,
    category: 'Eletrônicos',
    tags: ['bluetooth', 'noise-cancel', 'áudio'],
    inStock: true,
    image: 'https://picsum.photos/seed/phone1/800/600'
  },
  {
    id: 'p6',
    name: 'Cadeira Gamer ThunderX',
    description: 'Design ergonômico com ajuste 180º, apoio para braços e costura reforçada.',
    price: 1299.00,
    category: 'Cadeiras',
    tags: ['gamer', 'ergonômica', 'estilo'],
    inStock: true,
    image: 'https://picsum.photos/seed/chair2/800/600'
  },
  {
    id: 'p7',
    name: 'Mesa Escritório Compact Pro',
    description: 'Mesa funcional com prateleiras embutidas e acabamento em madeira clara.',
    price: 899.00,
    category: 'Mesas',
    tags: ['escritório', 'compacta', 'funcional'],
    inStock: true,
    image: 'https://picsum.photos/seed/table2/800/600'
  },
  {
    id: 'p8',
    name: 'Sofá-Cama Versatile',
    description: 'Sofá 2 lugares que se transforma em cama de casal, ideal para espaços pequenos.',
    price: 2199.00,
    category: 'Sofás',
    tags: ['sofá-cama', 'versátil', 'compacto'],
    inStock: false,
    image: 'https://picsum.photos/seed/sofa2/800/600'
  },
  {
    id: 'p9',
    name: 'Luminária de Mesa LED Touch',
    description: 'Iluminação ajustável com toque, ideal para leitura e ambiente de estudo.',
    price: 199.00,
    category: 'Decoração',
    tags: ['luz', 'led', 'estudo'],
    inStock: true,
    image: 'https://picsum.photos/seed/decor2/800/600'
  },
  {
    id: 'p10',
    name: 'Smartwatch FitX Pro',
    description: 'Relógio inteligente com monitoramento de saúde, GPS e resistência à água.',
    price: 1299.00,
    category: 'Eletrônicos',
    tags: ['smartwatch', 'fitness', 'tecnologia'],
    inStock: true,
    image: 'https://picsum.photos/seed/elec1/800/600'
  },
  {
    id: 'p11',
    name: 'Cadeira de Madeira Rústica',
    description: 'Cadeira artesanal em madeira de reflorestamento, ideal para ambientes aconchegantes.',
    price: 459.00,
    category: 'Cadeiras',
    tags: ['madeira', 'artesanal', 'rústico'],
    inStock: true,
    image: 'https://picsum.photos/seed/chair3/800/600'
  },
  {
    id: 'p12',
    name: 'Mesa Lateral Minimal',
    description: 'Mesa lateral redonda com tampo de vidro temperado e estrutura metálica.',
    price: 599.00,
    category: 'Mesas',
    tags: ['minimalista', 'vidro', 'moderno'],
    inStock: true,
    image: 'https://picsum.photos/seed/table3/800/600'
  }
];

export const CATEGORIES = ['Cadeiras', 'Mesas', 'Sofás', 'Decoração', 'Eletrônicos'] as const;
