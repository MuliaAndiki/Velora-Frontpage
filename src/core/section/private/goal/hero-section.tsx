import { Goal, X } from 'lucide-react';

import GoalHeader from '@/components/goal-header';
import GoalPartial from '@/components/partial/goal-partial';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldContent, FieldSeparator, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import PopUp from '@/components/ui/pop-up';
import View from '@/components/ui/view';
import { GoalOverlayType, GoalType } from '@/types/components';
import { FormCreateGoal } from '@/types/form/goal.form';
import { AlertContexType, PopupInterface } from '@/types/ui';
import { formatCurrency } from '@/utils/number.format';

interface GoalProps {
  goalOverlayData: GoalOverlayType;
  goalData: GoalType[];
  isPending: boolean;
  popUp: PopupInterface;
  setPopUp: React.Dispatch<React.SetStateAction<PopupInterface>>;
  formCreateGoal: FormCreateGoal;
  setFormCreateGoal: React.Dispatch<React.SetStateAction<FormCreateGoal>>;
  formEditGoal: FormCreateGoal;
  setFormEditGoal: React.Dispatch<React.SetStateAction<FormCreateGoal>>;
  onCreate: () => void;
  onDeleteAll: () => void;
  alert: AlertContexType;
  onDeleteByID: (id: string) => void;
  handleOpenPopUp: (data: any) => void;
  onEdit: () => void;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  trashhole: any;
}

const GoalHeroSection: React.FC<GoalProps> = ({
  goalData,
  isPending,
  popUp,
  setPopUp,
  formCreateGoal,
  setFormCreateGoal,
  onCreate,
  onDeleteAll,
  alert,
  onDeleteByID,
  formEditGoal,
  setFormEditGoal,
  handleOpenPopUp,
  onEdit,
  setId,
  goalOverlayData,
  trashhole,
}) => {
  return (
    <View>
      <div className="w-full min-h-screen flex justify-start items-start overflow-hidden flex-col relative p-4">
        <div className="flex items-start flex-col mb-3">
          <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3">
            Financial Goals
          </h1>
          <p className="text-slate-400 text-lg">Set,track, and achieve your financial dreams</p>
        </div>
        <div className="grid grid-cols-4 grid-rows-1 gap-4  w-full">
          <GoalHeader data={goalData ?? []} title="Total Goals" filter="" />
          <GoalHeader data={goalData ?? []} title="Complate" filter="COMPLATE" />
          <GoalHeader data={goalData ?? []} title="In Progress" filter="INPROGRESS" />
          <GoalHeader data={goalData ?? []} title="Total Saved" filter="" />
        </div>
        <div className="w-full my-2">
          <Card>
            <CardHeader>
              <CardTitle>Overlay Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className=" w-full rounded-lg border bg-red-500 h-7"
                style={{
                  width: `${Math.min(goalOverlayData.percent!, 100)}%`,
                }}
              />
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full ">
                <CardDescription>
                  {formatCurrency(goalOverlayData.saveAmount)} saved
                </CardDescription>
                <CardDescription>
                  {formatCurrency(goalOverlayData.targetAmount)} target
                </CardDescription>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full my-2 ">
          <div className="grid grid-cols-3 grid-row-1 gap-4">
            {goalData.map((items, key) => (
              <GoalPartial
                key={key}
                data={items}
                alert={alert}
                onDeleteByID={onDeleteByID}
                handleOpenPopUp={handleOpenPopUp}
                setId={setId}
                trashole={trashhole}
              />
            ))}
          </div>
        </div>
        <div className="fixed bottom-8 right-8 z-50   px-6 py-4 rounded-full shadow-2xl  ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-auto h-auto">
                <Goal size={100} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel className="text-lg font-bold">Goal</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-md text-accent-foreground font-semibold"
                  onClick={() => setPopUp('goal')}
                >
                  Create
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-md text-destructive font-semibold"
                  onClick={() => onDeleteAll()}
                >
                  Delete All
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <PopUp isOpen={popUp === 'goal'} onClose={() => setPopUp(null)}>
        <View className="w-full h-full">
          <Field className="flex justify-center items-center w-full flex-col">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onCreate();
              }}
            >
              <div className="w-full flex justify-between items-center">
                <FieldTitle className="text-2xl font-semibold">Create Goal</FieldTitle>
                <X size={16} onClick={() => setPopUp(null)} className="cursor-pointer" />
              </div>
              <div>
                <div>
                  <FieldContent>
                    <FieldTitle className="text-lg font-semibold">Name :</FieldTitle>
                    <Input
                      value={formCreateGoal.name}
                      onChange={(e) =>
                        setFormCreateGoal((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </FieldContent>
                </div>
                <div>
                  <FieldContent>
                    <FieldTitle className="text-lg font-semibold">TargetAmount :</FieldTitle>
                    <Input
                      value={formCreateGoal.targetAmount}
                      type="number"
                      inputMode="numeric"
                      onChange={(e) =>
                        setFormCreateGoal((prev) => ({
                          ...prev,
                          targetAmount: Number(e.target.value),
                        }))
                      }
                    />
                  </FieldContent>
                </div>
                <div>
                  <FieldContent>
                    <FieldTitle className="text-lg font-semibold">savedAmount :</FieldTitle>
                    <Input
                      value={formCreateGoal.savedAmount}
                      type="number"
                      inputMode="numeric"
                      onChange={(e) =>
                        setFormCreateGoal((prev) => ({
                          ...prev,
                          savedAmount: Number(e.target.value),
                        }))
                      }
                    />
                  </FieldContent>
                </div>
                <div>
                  <FieldContent>
                    <FieldTitle className="text-lg font-semibold">Start :</FieldTitle>
                    <Input
                      value={formCreateGoal.startAt!}
                      type="date"
                      onChange={(e) =>
                        setFormCreateGoal((prev) => ({
                          ...prev,
                          startAt: e.target.value,
                        }))
                      }
                    />
                  </FieldContent>
                </div>
                <div>
                  <div>
                    <h1 className="text-lg font-semibold">Deadline :</h1>
                    <Input
                      value={formCreateGoal.endAt!}
                      type="date"
                      onChange={(e) =>
                        setFormCreateGoal((prev) => ({
                          ...prev,
                          endAt: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="w-full  mt-2">
                  <Button
                    variant={'destructive'}
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                  >
                    {isPending ? 'load' : 'Create'}
                  </Button>
                </div>
              </div>
            </form>
          </Field>
        </View>
      </PopUp>

      <PopUp isOpen={popUp === 'edit-goal'} onClose={() => setPopUp(null)}>
        <View className="w-full h-full">
          <Field>
            <div className="flex w-full justify-between">
              <FieldTitle className="text-lg font-semibold">Edit Goal</FieldTitle>
              <X onClick={() => setPopUp(null)} className="cursor-pointer" />
            </div>
            <FieldSeparator />
            <div>
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  onEdit();
                }}
              >
                <div>
                  <FieldContent>
                    <FieldTitle className="text-lg font-semibold">Name :</FieldTitle>
                    <Input
                      defaultValue={formEditGoal.name}
                      onChange={(e) =>
                        setFormEditGoal((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </FieldContent>
                </div>
                <div>
                  <FieldContent>
                    <FieldTitle className="text-lg font-semibold">TargetAmount :</FieldTitle>
                    <Input
                      defaultValue={formEditGoal.targetAmount}
                      type="number"
                      inputMode="numeric"
                      onChange={(e) =>
                        setFormEditGoal((prev) => ({
                          ...prev,
                          targetAmount: Number(e.target.value),
                        }))
                      }
                    />
                  </FieldContent>
                </div>
                <div>
                  <FieldContent>
                    <FieldTitle className="text-lg font-semibold">savedAmount :</FieldTitle>
                    <Input
                      defaultValue={formEditGoal.savedAmount}
                      type="number"
                      inputMode="numeric"
                      onChange={(e) =>
                        setFormEditGoal((prev) => ({
                          ...prev,
                          savedAmount: Number(e.target.value),
                        }))
                      }
                    />
                  </FieldContent>
                </div>
                <div>
                  <FieldContent>
                    <FieldTitle className="text-lg font-semibold">Start :</FieldTitle>
                    <Input
                      defaultValue={formEditGoal.startAt!}
                      type="date"
                      onChange={(e) =>
                        setFormEditGoal((prev) => ({
                          ...prev,
                          startAt: e.target.value,
                        }))
                      }
                    />
                  </FieldContent>
                </div>
                <div>
                  <div>
                    <h1 className="text-lg font-semibold">Deadline :</h1>
                    <Input
                      defaultValue={formEditGoal.endAt!}
                      type="date"
                      onChange={(e) =>
                        setFormEditGoal((prev) => ({
                          ...prev,
                          endAt: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="w-full  mt-2">
                  <Button
                    variant={'destructive'}
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                  >
                    {isPending ? 'load' : 'update'}
                  </Button>
                </div>
              </form>
            </div>
          </Field>
        </View>
      </PopUp>
    </View>
  );
};

export default GoalHeroSection;
