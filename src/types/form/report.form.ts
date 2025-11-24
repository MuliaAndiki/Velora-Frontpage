import { IReport } from '../schema';

export type FormCreateReport = Pick<IReport, 'title' | 'type' | 'startDate' | 'endDate' | 'format'>;
export type PickGetID = Pick<IReport, 'id'>;
