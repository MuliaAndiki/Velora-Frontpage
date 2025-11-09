import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { InconeChartType, InconeType } from '@/types/partial';
import { camelCaseToWords } from '@/utils/string.format';

import { Button } from '../ui/button';

interface IncomeChartProps {
  ButtonIncome: InconeType[];
  BarchartIncomeConfig: any;
  IncomeChartData: InconeChartType[];
}

const IncomeChart: React.FC<IncomeChartProps> = ({
  ButtonIncome,
  IncomeChartData,
  BarchartIncomeConfig,
}) => {
  return (
    <div className=" flex justify-center items-center ">
      <div className="w-full flex justify-center items-center flex-col  rounded-lg  ">
        <Card className="w-full">
          <CardHeader className="flex justify-between items-center">
            <div className="w-full">
              <CardTitle className="text-2xl">Income Vs Expense</CardTitle>
              <CardDescription>Showing total visitors for the last 6 months</CardDescription>
            </div>
            {ButtonIncome.map((items, key) => (
              <Button key={key} onClick={() => items.query} className="">
                {camelCaseToWords(items.title)}
              </Button>
            ))}
          </CardHeader>
          <CardContent>
            <ChartContainer config={BarchartIncomeConfig}>
              <AreaChart
                accessibilityLayer
                data={IncomeChartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-Expense)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-Expense)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-Income)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-Income)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="Income"
                  type="natural"
                  fill="url(#fillIncome)"
                  fillOpacity={0.4}
                  stroke="var(--color-Income)"
                  stackId="a"
                />
                <Area
                  dataKey="Expense"
                  type="natural"
                  fill="url(#fillExpense)"
                  fillOpacity={0.4}
                  stroke="var(--color-Expense)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default IncomeChart;
