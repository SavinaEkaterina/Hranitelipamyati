import { ReviewItem } from '../types';
import { getImageUrl } from '../utils/imageResolver';

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Мария Васильева',
    location: 'г. Орёл',
    avatar: getImageUrl('/reviews/review-1'),
    text: 'Огромное спасибо мастерам! Отреставрировали единственный сохранившийся снимкок моего прадедушки. Результат превзошел все ожидания.',
    rating: 5
  },
  {
    id: 'rev-2',
    author: 'Алексей Петров',
    location: 'г. Брянск',
    avatar: getImageUrl('/reviews/review-2'),
    text: 'Заказывали раскрашивание свадебного фото родителей. Получилось очень естественная цветопередача!',
    rating: 5
  },
  {
    id: 'rev-3',
    author: 'Ольга Николаева',
    location: 'г. Курск',
    avatar: getImageUrl('/reviews/review-3'),
    text: 'Оживление портрета бабушки — это что-то невероятное! Все родственники были тронуты до слёз.',
    rating: 5
  }
];
