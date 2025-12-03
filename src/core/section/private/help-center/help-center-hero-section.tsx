import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import View from '@/components/ui/view';
import { HelpCenterIcons } from '@/configs/icons.config';
import { HelpCenterType } from '@/types/components';

interface HelpSectionProps {
  helpCenterData: HelpCenterType[];
}
const HelpCenterHeroSection: React.FC<HelpSectionProps> = ({ helpCenterData }) => {
  return (
    <View>
      <div className="w-full flex justify-center items-center flex-col overflow-x-hidden relative p-2">
        <Card className="w-full ">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-extrabold">Help-Center Velora</CardTitle>
          </CardHeader>
          <CardContent className="w-full grid lg:grid-cols-3 lgkan:grid-rows-1 gap-4">
            {helpCenterData.map((item, key) => {
              const Icon = HelpCenterIcons[item.icon];
              return (
                <div
                  key={key}
                  className="w-full items-center justify-center flex flex-col border p-2 rounded-lg space-y-3"
                >
                  {Icon && <Icon className="h-6 w-6 lg:h-10 lg:w-10" />}
                  <CardTitle className="font-medium text-lg">{item.title}</CardTitle>
                  <CardDescription className="font-light text-center">{item.desc}</CardDescription>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </View>
  );
};

export default HelpCenterHeroSection;
