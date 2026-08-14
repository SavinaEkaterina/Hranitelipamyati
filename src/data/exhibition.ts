import { getImageUrl } from '../utils/imageResolver';

export interface ExhibitionCategory {
  id: string;
  label: string;
  iconName: 'Baby' | 'Heart' | 'Church' | 'Award' | 'Sparkles' | 'Star' | 'Gift';
  badge: string;
  title: string;
  shortDesc: string;
  price: number;
  features: string[];
  images: string[];
}

export const EXHIBITION_DATA: ExhibitionCategory[] = [
  {
    id: 'birth',
    label: 'Метрика рождения',
    iconName: 'Baby',
    badge: 'Первые мгновения жизни',
    title: 'Детская памятная метрика',
    shortDesc: 'Имя малыша, точное время рождения, вес, рост и индивидуальное астрологическое созвездие.',
    price: 700,
    features: [
      'Персональная каллиграфия имени и даты',
      'Точное время, вес (г) и рост (см)',
      'Иллюстрация созвездия по дню рождения',
      'Молочно-золотые и бежевые оттенки'
    ],
    images: [
      getImageUrl('/exhibition/birth-01.jpg'),
      getImageUrl('/exhibition/birth-02.jpg'),
      getImageUrl('/exhibition/birth-03.jpg')
    ]
  },
  {
    id: 'wedding',
    label: 'Свадебная метрика',
    iconName: 'Heart',
    badge: 'День рождения семьи',
    title: 'Памятная свадебная метрика',
    shortDesc: 'Имена молодожёнов, дата бракосочетания, город, созвездие дня и заглавная монограмма пара.',
    price: 700,
    features: [
      'Персональная монограмма и переплетённые кольца',
      'Локация и точная дата торжества',
      'Созвездие дня свадьбы',
      'Семейный девиз и клятва'
    ],
    images: [
      getImageUrl('/exhibition/wedding-01.jpeg'),
      getImageUrl('/exhibition/wedding-02.jpeg'),
      getImageUrl('/exhibition/wedding-03.jpeg'),
      getImageUrl('/exhibition/wedding-04.jpeg'),
      getImageUrl('/exhibition/wedding-05.jpeg')
    ]
  },
  {
    id: 'baptism',
    label: 'Метрика крещения',
    iconName: 'Church',
    badge: 'Священное таинство',
    title: 'Метрика таинства крещения',
    shortDesc: 'Имя ребёнка, дата крещения, храм, имена крёстных родителей и Ангел-Хранитель.',
    price: 700,
    features: [
      'Символика Ангела-Хранителя и креста',
      'Название храма и дата таинства',
      'Имена крёстного отца и крёстной матери',
      'Тёплые слова благословения'
    ],
    images: [
      getImageUrl('/exhibition/baptism-01.jpeg'),
      getImageUrl('/exhibition/baptism-02.jpeg'),
      getImageUrl('/exhibition/baptism-03.jpeg'),
      getImageUrl('/exhibition/baptism-04.jpeg')
    ]
  },
  {
    id: 'jubilee',
    label: 'Юбилей и годовщина',
    iconName: 'Award',
    badge: 'Знаменательные даты',
    title: 'Юбилейная семейная метрика',
    shortDesc: 'Золотые свадьбы, 50-летие, число детей и внуков, ключевые семейные достижения династии.',
    price: 700,
    features: [
      'Крупная акцентная цифра юбилея',
      'Годы совместной жизни и дней вместе',
      'Указание количества детей и внуков',
      'Заголовок семейного древа'
    ],
    images: [
      getImageUrl('/exhibition/jubilee-01.jpeg'),
      getImageUrl('/exhibition/jubilee-02.jpeg'),
      getImageUrl('/exhibition/jubilee-03.jpeg'),
      getImageUrl('/exhibition/jubilee-04.jpeg'),
      getImageUrl('/exhibition/jubilee-05.jpeg')
    ]
  }
];
