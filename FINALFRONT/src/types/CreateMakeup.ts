import { CategoryMakeUp } from './category'; 

export interface CreateMakeupDto {
  name: string;
  category: CategoryMakeUp;
  stock: number;
  ware_house_location: string;
  durability_score: number;
}

export interface Makeup extends CreateMakeupDto {
  id: string;
}