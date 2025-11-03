export interface Auth {
  id: string;
  email: string;
  fullName: string;
  password: string;
  token: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  otp: string;
  expOtp: Date;
  photoUrl: string;
  isVerify: boolean;
}

export interface Category {
  id: string;
  name: string;
  userID: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline: Date;
  UserID: string;
  createdAt: Date;
  updatedAt: Date;
}
