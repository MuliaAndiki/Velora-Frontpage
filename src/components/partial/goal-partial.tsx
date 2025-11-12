import { goalProps } from '@/types/props';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '@/utils/number.format';
const GoalPartial: React.FC<goalProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 aspect-square border bg-red-500" />
          <div className="flex flex-col justify-items-start">
            <CardTitle className="font-semibold">{data.title}</CardTitle>
            <CardDescription className="text-slate-400">{data.desc}</CardDescription>
          </div>
        </div>
        <div className=" border rounded-lg p-1 bg-destructive">
          <h1 className="text-sm ">{data.label}</h1>
        </div>
      </CardHeader>
      <CardContent className="flex items-center flex-col ">
        <div className="flex justify-between w-full">
          <p className="text-slate-400">Curent</p>
          <p className="text-slate-400">Target</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold text-xl">{formatCurrency(data.startValue)}</p>
          <p className="font-bold text-xl">{formatCurrency(data.endValue)}</p>
        </div>
        <div
          className="w-full h-3 bg-red-500 rounded-lg my-2"
          style={{ width: `${Math.min(data.percent, 100)}%` }}
        />
        <div className="flex justify-between w-full">
          <p className="text-slate-400">achieve</p>
          <p className="text-slate-400">{data.remainingValue}</p>
        </div>
        <div className="w-full flex items-center flex-col">
          <div className="flex justify-between items-center w-full">
            <CardDescription>{data.dateNow}</CardDescription>
            <CardDescription>{data.dateLine}</CardDescription>
          </div>
        </div>
        <div className="flex justify-between  w-full gap-3">
          <Button className="flex-1" variant={'destructive'}>
            add
          </Button>
          <Button>edit</Button>
          <Button>delete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalPartial;
