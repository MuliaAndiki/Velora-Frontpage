import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { GoalType } from '@/types/components';
interface GoalHeaderProps {
  data: GoalType[];
  title: string;
  filter: string;
}
const GoalHeader: React.FC<GoalHeaderProps> = ({ data, title, filter }) => {
  const inProgressCount = data.filter((g) => g.status === filter).length;
  return (
    <Card className="flex  items-start border rounded-lg">
      <CardContent className="flex  justify-items-start flex-col">
        <div className="flex items-center gap-3 ">
          <p>icon</p>
          <CardTitle className="font-semibold text-lg">{title}</CardTitle>
        </div>
        <p>{inProgressCount}</p>
      </CardContent>
    </Card>
  );
};

export default GoalHeader;
