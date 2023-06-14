import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { type CategoryModel } from '@shared/models';

export const categories: CategoryModel[] = [
  { label: 'Beach', description: 'This property is close to the beach!', Icon: TbBeach },
  { label: 'Windmills', description: 'This property has windmills!', Icon: GiWindmill },
  { label: 'Modern', description: 'This property is modern!', Icon: MdOutlineVilla }
];
