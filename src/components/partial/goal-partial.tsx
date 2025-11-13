import { goalProps } from '@/types/props';
import { AlertContexType } from '@/types/ui';
import { formatCurrency } from '@/utils/number.format';
import { camelCaseToWords, getDate } from '@/utils/string.format';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface GoalPartialProps {
  onDeleteByID: (id: string) => void;
  alert: AlertContexType;
  handleOpenPopUp: (data: any) => void;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
}

const GoalPartial: React.FC<goalProps & GoalPartialProps> = ({
  data,
  onDeleteByID,
  alert,
  handleOpenPopUp,
  setId,
}) => {
  return (
    <Card>
      <CardHeader className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 aspect-square border bg-red-500" />
          <div className="flex flex-col justify-items-start">
            <CardTitle className="font-semibold text-2xl">{data.name}</CardTitle>
            {/* <CardDescription className="text-slate-400">{data.desc}</CardDescription> */}
          </div>
        </div>
        <div className=" border rounded-lg p-1 bg-destructive">
          {/* <h1 className="text-sm ">{data.label}</h1> */}
        </div>
      </CardHeader>
      <CardContent className="flex items-center flex-col ">
        <div className="flex justify-between w-full">
          <p className="text-slate-400">Curent</p>
          <p className="text-slate-400">Target</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="font-bold text-xl">{formatCurrency(data.savedAmount)}</p>
          <p className="font-bold text-xl">{formatCurrency(data.targetAmount)}</p>
        </div>
        <div className="w-full">
          <div
            className="w-full h-3 bg-red-500 rounded-lg my-2 "
            style={{ width: `${Math.min(data.percent!, 100)}%` }}
          />
        </div>

        <div className="flex justify-between w-full">
          <p className="text-slate-400">achieve</p>
          <p className="text-slate-400">{data.remainingValue}</p>
        </div>
        <div className="w-full flex items-center flex-col">
          <div className="flex justify-between items-center w-full">
            <CardDescription>StartAt: {getDate(data.startAt)}</CardDescription>
            <div className="flex flex-col justify-start">
              <CardDescription>Deadline: {getDate(data.endAt)}</CardDescription>
              <CardDescription>sisa hari</CardDescription>
            </div>
          </div>
        </div>
        <div className="flex justify-between  w-full gap-2">
          <Button className="flex-1" variant={'destructive'}>
            insert
          </Button>
          <Button
            onClick={() => {
              handleOpenPopUp(data);
              setId(data.id);
            }}
          >
            {camelCaseToWords('edit')}
          </Button>
          <Button
            onClick={() =>
              alert.confirm({
                title: 'Warning',
                deskripsi: 'apakah kamu yakin menghapus goal tabungan ini?',
                icon: 'warning',
                onConfirm: () => {
                  onDeleteByID(data.id);
                },
                onClose: () => {},
              })
            }
          >
            {camelCaseToWords('delete')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalPartial;
