import { FormHTMLAttributes } from 'react';
import { cn } from '@/utils/classname';

export const Form = ({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  return <form className={cn('', className)} {...props} />;
};
