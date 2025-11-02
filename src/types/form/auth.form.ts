import { Auth } from '../schema';

export type FormRegister = Pick<Auth, 'email' | 'password' | 'fullName'>;
export type FormLogin = Pick<Auth, 'email' | 'password'>;
export type FormForgotPassword = Pick<Auth, 'email'>;
export type FormSendOtp = Pick<Auth, 'email'>;
export type FormVerifyOtp = Pick<Auth, 'email' | 'otp'>;
