import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { IAuth } from '@/types/schema';

interface UserPartialProps {
  data: IAuth;
  handleOpenPopUp: (data: any) => void;
}
const UserPartial: React.FC<UserPartialProps> = ({ data, handleOpenPopUp }) => {
  return (
    <div className="w-full border rounded-lg flex justify-between items-center p-4 bg-muted">
      <div className="flex justify-center items-center gap-4">
        <Image
          alt="logo"
          src={data.photoUrl ? data.photoUrl : '/images/logo.png'}
          width={70}
          height={70}
          className="aspect-square rounded-full object-cover"
        />
        <div className="w-full flex tart items-start flex-col">
          <h1 className="text-2xl font-semibold">{data?.fullName}</h1>
          <p className="text-lg font-medium">{data?.role}</p>
        </div>
      </div>
      <ChevronRight onClick={() => handleOpenPopUp(data)} className="cursor-pointer" />
    </div>
  );
};

export default UserPartial;
