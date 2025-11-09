import { ICategory } from '../schema';

export type FormCreateCategory = Pick<ICategory, 'name' | 'cate_avaUrl'>;
export type FormEditCategory = Pick<ICategory, 'name' | 'id'>;
export type PickID = Pick<ICategory, 'id'>;
