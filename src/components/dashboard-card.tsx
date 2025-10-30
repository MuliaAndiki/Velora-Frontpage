import { Label } from '@radix-ui/react-label';
import Box from './ui/box';
import View from './ui/view';
import { CardDashboardCardProps } from '@/types/props';

const DashboardCard: React.FC<CardDashboardCardProps> = ({ data }) => {
  return (
    <View className="w-full flex h-full flex-col border p-4 rounded-lg ">
      <Box className="justify-between items-center flex space-y-2 ">
        <Box className="w-15 h-15 bg-white rounded-lg" />
        <Label className="text-lg font-semibold">{data.label}</Label>
      </Box>
      <Box className="w-full flex justify-center items-start flex-col">
        <Label className="text-lg font-semibold">Total Balance :</Label>
        <Label className="text-3xl text-bold">{data.price}</Label>
      </Box>
    </View>
  );
};

export default DashboardCard;
