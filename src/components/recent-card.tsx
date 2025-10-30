import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentCardType } from '@/types/components';

import RecentCardPartial from './partial/recent-partial';

interface RecentCardProps {
  RecentCardData: RecentCardType[];
}

const RecentCard: React.FC<RecentCardProps> = ({ RecentCardData }) => {
  return (
    <Card className="w-full px-4">
      <CardHeader>
        <CardTitle className="text-2xl">Resend Transaction</CardTitle>
        <CardDescription>Test</CardDescription>
      </CardHeader>
      {RecentCardData.map((items, key) => (
        <RecentCardPartial key={key} data={items} />
      ))}
    </Card>
  );
};

export default RecentCard;
