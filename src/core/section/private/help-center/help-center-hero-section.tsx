import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import View from '@/components/ui/view';
const HelpCenterHeroSection = () => {
  return (
    <View>
      <div className="w-full flex justify-center items-center flex-col overflow-x-hidden relative p-2">
        <Card className="w-full ">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-medium">Help Center Velora</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>setup</CardDescription>
          </CardContent>
        </Card>
      </div>
    </View>
  );
};

export default HelpCenterHeroSection;
