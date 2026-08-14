import { RegionInfo } from '../types';

export const REGIONS_DATA: RegionInfo[] = [
  { id: 'orel', name: 'Орловская область', capital: 'Орёл', deliveryDays: '1 день (курьер / мастерская)', highlighted: true },
  { id: 'bryansk', name: 'Брянская область', capital: 'Брянск', deliveryDays: '1-2 дня', highlighted: true },
  { id: 'kursk', name: 'Курская область', capital: 'Курск', deliveryDays: '1-2 дня', highlighted: true },
  { id: 'belgorod', name: 'Белгородская область', capital: 'Белгород', deliveryDays: '1-2 дня', highlighted: true },
  { id: 'tula', name: 'Тульская область', capital: 'Тула', deliveryDays: '1-2 дня', highlighted: true },
];

export const CONTACTS_DATA = {
  phone: '+7 (900) 000-00-00',
  email: 'info@masterskaya.ru',
  messengers: {
    vk: 'https://vk.me/savinkl',
    max: 'https://max.ru/u/f9LHodD0cOJDrWIUZMR6bdn9Y72qtC2JycHUPiCBgCX7inoYyVE0U0pqqX8',
    telegram: 'https://t.me/savinaek'
  },
  address: 'Центральный офис мастерской «Хранители памяти»: г. Орёл, прием онлайн-заказов по всей России'
};
