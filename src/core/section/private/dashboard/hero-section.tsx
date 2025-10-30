import React from 'react';
import View from '@/components/ui/view';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard-card';
import { DashboardCardData } from '@/configs/components.config';
import { Label } from '@/components/ui/label';
import { ButtonIncome } from '@/configs/partial.config';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, PieChart, Pie } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { IncomeChartData, ExpenseChartData } from '@/configs/partial.config';

const BarchartIncome = {
  Income: {
    label: 'Income',
    color: 'var(--chart-1)',
  },
  Expense: {
    label: 'Expense',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const PiechartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const DashboardHeroSection = () => {
  return (
    <View className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden  ">
      <Box className="flex-1 w-full  mx-auto relative z-10 p-6 lg:p-8">
        <Box className="mb-8 text-center">
          <Box className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm border  rounded-full mb-4">
            <span className=" text-lg font-bold text-orange-400">Velora</span>
            <span className=" text-sm">Your Financial Dashboard</span>
          </Box>
          <h1 className="text-4xl font-bold  mb-2">Financial Dashboard</h1>
          <p className="">Overview of your financial activities</p>
        </Box>
        <Box className="w-full h-full flex justify-between items-center gap-4 ">
          {DashboardCardData.map((items, key) => (
            <DashboardCard key={key} data={items} />
          ))}
        </Box>
        <Box className="grid grid-cols-2 grid-rows-1 gap-2 ">
          <Box className=" flex justify-center items-center ">
            <Box className="w-full flex justify-center items-center flex-col  rounded-lg  p-2 my-2">
              <Card className="w-full">
                <CardHeader className="flex justify-between items-center">
                  <Box className="w-full">
                    <CardTitle>Area Chart - Gradient</CardTitle>
                    <CardDescription>Showing total visitors for the last 6 months</CardDescription>
                  </Box>
                  {ButtonIncome.map((items, key) => (
                    <Button key={key} onClick={() => items.query} className="">
                      {items.title}
                    </Button>
                  ))}
                </CardHeader>
                <CardContent>
                  <ChartContainer config={BarchartIncome}>
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
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter>
                  <Box className="flex w-full items-start gap-2 text-sm">
                    <Box className="grid gap-2">
                      <Box className="flex items-center gap-2 leading-none font-medium">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                      </Box>
                      <Box className="text-muted-foreground flex items-center gap-2 leading-none">
                        January - June 2024
                      </Box>
                    </Box>
                  </Box>
                </CardFooter>
              </Card>
            </Box>
          </Box>
          <Box className="flex justify-center items-center h-full flex-col ">
            <Box className="flex justify-center items-center w-full h-full my-2 p-2">
              <Box className="w-full h-full ">
                <Card className="flex flex-col  justify-center items-stretch h-full">
                  <CardHeader className="items-center ">
                    <CardTitle>Pie Chart - Label</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={PiechartConfig}
                      className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[300px] pb-0"
                    >
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                          data={ExpenseChartData as any}
                          dataKey="visitors"
                          label
                          nameKey="category"
                        />
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
        </Box>
      </Box>

      <Button className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-600 to-purple-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-2 group">
        <span className="text-2xl group-hover:rotate-90 transition-transform duration-300">+</span>
        <span className="font-semibold">Add Transaction</span>
      </Button>
    </View>
  );
};

export default DashboardHeroSection;
