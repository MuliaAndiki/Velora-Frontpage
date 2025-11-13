import {
  BudgetCardType,
  CardDashboardCardType,
  GoalType,
  RecentCardType,
} from '@/types/components';

export const DashboardCardData: CardDashboardCardType[] = [
  {
    label: '1000',
    price: 1000000,
    image: '',
  },
  {
    label: '1000',
    price: 1000000,
    image: '',
  },
  {
    label: '1000',
    price: 1000000,
    image: '',
  },
  {
    label: '1000',
    price: 1000000,
    image: '',
  },
];

export const RecentCardData: RecentCardType[] = [
  {
    image: '',
    category: 'Food',
    date: '20-10-2020',
    price: 10000,
  },
  {
    image: '',
    category: 'Food',
    date: '20-10-2020',
    price: 10000,
  },
];

export const BudgetCardData: BudgetCardType[] = [
  {
    category: 'Food',
    price: 20000,
    used: 20,
  },
  {
    category: 'Food',
    price: 20000,
    used: 20,
  },
];
