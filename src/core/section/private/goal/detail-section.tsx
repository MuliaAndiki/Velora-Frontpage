import View from '@/components/ui/view';
import { goalProps } from '@/types/props';

const GoalDetailHeroSection: React.FC<goalProps> = ({ data }) => {
  if (!data) {
    <p>loading</p>;
  }
  return (
    <View>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-full flex justify-center items-center flex-col">
          <p>{data.id}</p>
        </div>
      </div>
    </View>
  );
};

export default GoalDetailHeroSection;
