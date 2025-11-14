import Image from 'next/image';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import View from '@/components/ui/view';

const AboutHeroSection = () => {
  return (
    <View>
      <div className="w-full flex justify-center items-center flex-col overflow-x-hidden relative p-2">
        <Card className="w-full ">
          <CardHeader>
            <CardTitle className="text-2xl">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>setup</CardDescription>
          </CardContent>
        </Card>
      </div>
    </View>
  );
};

export default AboutHeroSection;
