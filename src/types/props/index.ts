import { FormBudgetType } from '../form/budget.form';
import { FormCategoryType } from '../form/category.form';
import { FormGoalType } from '../form/goal.form';
import { FormTransactionType } from '../form/transaction.form';

// Auth Page Props
export interface LoginCardProps {
  formLogin: {
    email: string;
    password: string;
  };
  setFormLogin: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  onLogin: () => void;
  isPending: boolean;
}

export interface RegisterCardProps {
  formRegister: {
    email: string;
    password: string;
    fullName: string;
  };
  setFormRegister: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      fullName: string;
    }>
  >;
  onRegister: () => void;
  isPending: boolean;
}

export interface BudgetFormProps {
  formBudget: FormBudgetType;
  setFormBudget: React.Dispatch<React.SetStateAction<FormBudgetType>>;
  onSubmit: () => void;
  isPending: boolean;
  categories: any[];
}

export interface CategoryFormProps {
  formCategory: FormCategoryType;
  setFormCategory: React.Dispatch<React.SetStateAction<FormCategoryType>>;
  onSubmit: () => void;
  isPending: boolean;
}

// Transaction Page Props
export interface TransactionFormProps {
  formTransaction: FormTransactionType;
  setFormTransaction: React.Dispatch<React.SetStateAction<FormTransactionType>>;
  onSubmit: () => void;
  isPending: boolean;
  categories: any[];
}

// Goal Page Props
export interface GoalFormProps {
  formGoal: FormGoalType;
  setFormGoal: React.Dispatch<React.SetStateAction<FormGoalType>>;
  onSubmit: () => void;
  isPending: boolean;
}
