import { TrendingUp } from 'lucide-react';
import { Pie,PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ButtonIncome } from '@/configs/partial.config';
import { ExpenseChartType, InconeType } from '@/types/partial';
import { camelCaseToWords } from '@/utils/string.format';

import Box from '../ui/box';
import { Button } from '../ui/button';

interface CategoryProps {
  ExpenseChartData: ExpenseChartType[];
  PiechartConfig: any;
  ButtonIncome: InconeType[];
}

const CategoryChart: React.FC<CategoryProps> = ({ ExpenseChartData, PiechartConfig }) => {
  return (
    <Box className="flex justify-center items-center h-full flex-col ">
      <Box className="flex justify-center items-center w-full h-full ">
        <Box className="w-full h-full ">
          <Card className="flex flex-col  justify-center items-stretch h-full">
            <CardHeader className="items-center  flex justify-between">
              <Box className="w-full">
                <CardTitle className="text-2xl">Expense By Category</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </Box>
              {ButtonIncome.map((items, key) => (
                <Button key={key} onClick={() => items.query}>
                  {camelCaseToWords(items.title)}
                </Button>
              ))}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={PiechartConfig}
                className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[300px] pb-0"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={ExpenseChartData as any} dataKey="visitors" label nameKey="category" />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <Box className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </Box>
              <Box className="text-muted-foreground leading-none">
                Showing total visitors for the last 6 months
              </Box>
            </CardFooter>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryChart;
