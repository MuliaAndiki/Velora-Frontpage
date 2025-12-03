import {
  BudgetCardType,
  CardDashboardCardType,
  CategoryType,
  GoalType,
  HelpCenterType,
  RecentCardType,
  TransactionPartialType,
} from './components';

export interface CardDashboardCardProps {
  data: CardDashboardCardType;
}

export interface RecentCardProps {
  data: RecentCardType;
}

export interface BudgetCardDataProps {
  data: BudgetCardType;
}
export interface CategoryProps {
  data: CategoryType;
}

export interface goalProps {
  data: GoalType;
}

export interface TransactionProps {
  data: TransactionPartialType;
}

export interface HelpCenterProps {
  data: HelpCenterType;
}
