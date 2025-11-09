export interface CardDashboardCardType {
  image?: string;
  label: string;
  price: number;
}

export interface RecentCardType {
  image?: string;
  category: string;
  price: number;
  date: any;
}

export interface BudgetCardType {
  category: string;
  price: number;
  persentase?: number;
  used: number;
}

export interface CategoryType {
  id: string;
  name: string;
  avaUrl: string;
  createdAt: string;
  updatedAt: string;
}
