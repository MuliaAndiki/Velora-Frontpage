import { ICategory } from '../schema';

export type FormCreateCategory = Pick<ICategory, 'name' | 'cate_avaUrl' | 'type'>;
export type FormEditCategory = Pick<ICategory, 'name' | 'id' | 'type'>;
export type PickID = Pick<ICategory, 'id'>;
