import { Category } from '../schema';

export type FormCreateCategory = Pick<Category, 'name'>;
export type FormEditCategory = Pick<Category, 'name' | 'id'>;
export type PickID = Pick<Category, 'id'>;
