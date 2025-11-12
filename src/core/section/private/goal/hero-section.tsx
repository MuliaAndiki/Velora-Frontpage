import { Goal } from 'lucide-react';

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
import PopUp from '@/components/ui/pop-up';
import View from '@/components/ui/view';
import { GoalType } from '@/types/components';
import { PopupInterface } from '@/types/ui';

interface GoalProps {
  goalData: GoalType[];
  isPending: boolean;
  popUp: PopupInterface;
  setPopUp: React.Dispatch<React.SetStateAction<PopupInterface>>;
}

const GoalHeroSection: React.FC<GoalProps> = ({ goalData, isPending, popUp, setPopUp }) => {
  return (
    <View>
      <div className="w-full min-h-screen flex justify-start items-start overflow-hidden flex-col relative p-4">
        <div className="flex items-start flex-col mb-3">
          <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3">
            Financial Goals
          </h1>
          <p className="text-slate-400 text-lg">set,track, and achieve your financial dreams</p>
        </div>
        <div className="grid grid-cols-4 grid-rows-1 gap-4  w-full">
          <Card className="flex  items-start border rounded-lg">
            <CardContent className="flex  justify-items-start flex-col">
              <div className="flex items-center gap-3 ">
                <p>icon</p>
                <CardTitle className="font-semibold text-lg">Total Goals</CardTitle>
              </div>
              <p>content</p>
            </CardContent>
          </Card>
          <Card className="flex  justify-items-start border rounded-lg">
            <CardContent className="flex justify-items-start gap-3 flex-col">
              <div className="w-full flex items-center gap-4">
                <p>icon</p>
                <CardTitle className="font-semibold text-lg">Completed</CardTitle>
              </div>
              <p>content</p>
            </CardContent>
          </Card>
          <Card className="flex  justify-items-start border rounded-lg">
            <CardContent className="flex justify-items-start flex-col">
              <div className="w-full flex items-center gap-3">
                <h1>icon</h1>
                <CardTitle className="font-semibold text-lg">In Progress</CardTitle>
              </div>
              <h1>Content</h1>
            </CardContent>
          </Card>
          <Card className="flex  justify-items-start border rounded-lg">
            <CardContent className="flex justify-items-start flex-col">
              <div className="w-full flex items-center gap-3">
                <h1>icon</h1>
                <CardTitle className="font-semibold text-lg">Total Save</CardTitle>
              </div>
              <h1>Content</h1>
            </CardContent>
          </Card>
        </div>
        <div className="w-full my-2">
          <Card>
            <CardHeader>
              <CardTitle>Overlay Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className=" w-full rounded-lg border bg-red-500 h-7"></div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full ">
                <CardDescription>Rp.100.000.00</CardDescription>
                <CardDescription>Rp.100.000.00</CardDescription>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full my-2 ">
          <div className="grid grid-cols-3 grid-row-1 gap-4">
            {goalData.map((items, key) => (
              <GoalPartial key={key} data={items} />
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
                <DropdownMenuItem className="text-md text-destructive font-semibold">
                  Delete All
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <PopUp isOpen={popUp === 'goal'} onClose={() => setPopUp(null)}>
        <View className="w-full h-full">
          <div className="flex justify-center items-center w-full">
            <p>setup</p>
          </div>
        </View>
      </PopUp>
    </View>
  );
};

export default GoalHeroSection;
