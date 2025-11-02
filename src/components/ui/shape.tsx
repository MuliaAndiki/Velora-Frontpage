import { defaultLanguage } from '@/configs/i18n.config';
import { DivProps } from '@/types/ui';

const Shape: React.FC<DivProps> = ({ as: Tag = 'div', children, className }) => {
  return <Tag className={`absolute ${className}`}>{children}</Tag>;
};

export default Shape;
