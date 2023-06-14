import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn
} from 'react-icons/gi';
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { type CategoryModel } from '@shared/models';

export const categories: CategoryModel[] = [
  { label: 'Beach', description: 'This property is close to the beach!', Icon: TbBeach },
  { label: 'Windmills', description: 'This property has windmills!', Icon: GiWindmill },
  { label: 'Modern', description: 'This property is modern!', Icon: MdOutlineVilla },
  { label: 'Countryside', description: 'This property is in the countryside!', Icon: TbMountain },
  { label: 'Pools', description: 'This property has a pool!', Icon: TbPool },
  { label: 'Islands', description: 'This property is on an island!', Icon: GiIsland },
  { label: 'Lake', description: 'This property is close to a lake!', Icon: GiBoatFishing },
  { label: 'Skiing', description: 'This property has skiing activities!', Icon: FaSkiing },
  { label: 'Castles', description: 'This property is in a castle!', Icon: GiCastle },
  { label: 'Camping', description: 'This property has camping activities!', Icon: GiForestCamp },
  { label: 'Arctic', description: 'This property is in the arctic!', Icon: BsSnow },
  { label: 'Cave', description: 'This property is in a cave!', Icon: GiCaveEntrance },
  { label: 'Desert', description: 'This property is in the desert!', Icon: GiCactus },
  { label: 'Barns', description: 'This property is in the barn!', Icon: GiBarn },
  { label: 'Lux', description: 'This property is luxurious!', Icon: IoDiamond }
];
