import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BudgetCardData } from '@/configs/components.config';
import { BudgetCardType } from '@/types/components';

import BudgetPartial from '../partial/budget-partial';

interface BudgerChartProps {
  BudgetData: BudgetCardType[];
}

const BudgerChart: React.FC<BudgerChartProps> = ({ BudgetData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Budget Progress</CardTitle>
        <CardDescription>test</CardDescription>
        {BudgetData.map((items, key) => (
          <BudgetPartial key={key} data={items} />
        ))}
      </CardHeader>
    </Card>
  );
};

export default BudgerChart;
